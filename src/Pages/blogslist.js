import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import fb from '../config/firebase';
import '../styles/BlogListView.css';
import useAuthState from '../hooks/hooks';
import Loader from '../components/loader/Loader';

const DB = fb.firestore();
const Blogslist = DB.collection('blogs');

const BlogslistView = () => {
    const [blogs, Setblogs] = useState([]);
    const [search, SetSearch] = useState("");
    const { user } = useAuthState(fb.auth());

    useEffect(() => {
        toast('Please wait!', { icon: '🙏😶‍🌫️' });
        const unsubscribe = Blogslist.limit(100).onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            Setblogs(data);
        });
        return unsubscribe;
    }, []);

    const DeleteBlog = (id) => {
        toast('Please wait!', {
            icon: '🙏😶‍🌫️',
        });
        Blogslist.doc(id).delete().then(() => {
            toast.success("Blog Removed 💀");
        }).catch((error) => {
            console.log("Error removing document: ", error);
            toast.error("Something went wrong!! 👀");
        });
    }

    const SearchBlog = (e) => {
        e.preventDefault();
        Setblogs(blogs.filter((blogs) =>
            blogs.Title.toLowerCase().includes(search.toLowerCase()) ||
            blogs.Body.toLowerCase().includes(search.toLowerCase())
        ));
    }

    return (
        <div className="container">
            <form className="search-form" onSubmit={SearchBlog}>
                <input
                    type="text"
                    placeholder="Search blogs..."
                    onChange={(e) => { SetSearch(e.target.value) }}
                />
                <button type="submit">Search</button>
            </form>
            <div className="blogs-list">
                {blogs === null && <Loader />}
                {blogs !== null &&
                    blogs.map(blog => (
                        <div className="blog-post" key={blog.id}>
                            <h2>{blog.Title}</h2>
                            <div dangerouslySetInnerHTML={{ __html: blog.Body }}></div>
                            {blog.CoverImg && <img className="blog-image" alt='user blog' src={blog.CoverImg} />}
                            <div className="actions">
                                <Link to={"/show/" + blog.id}>View</Link>

                                {(user.uid === blog.author) && (
                                    <Link to={"/EditBlog/" + blog.id}>Edit</Link>
                                )}
                                {/* <Link to={"/EditBlog/" + blog.id}>Edit</Link> */}
                                {(user.uid === blog.author) && (
                                    <button onClick={() => { DeleteBlog(blog.id) }}>Delete</button>
                                )}
                                {/* <button onClick={() => { DeleteBlog(blog.id) }}>Delete</button> */}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default BlogslistView;
