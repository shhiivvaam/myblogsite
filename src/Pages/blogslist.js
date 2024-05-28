import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import fb from '../database/firebase'
import { toast } from 'react-hot-toast';
const DB = fb.firestore();
const Blogslist = DB.collection('blogs');

const BlogslistView = () => {

    const [blogs, Setblogs] = useState([]);
    const [search, SetSearch] = useState("");

    useEffect(() => {
        const unsubscribe = Blogslist.limit(100).onSnapshot(querySnapshot => {
            // Get all documents from collection - with IDs
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            // Update state
            Setblogs(data);
        });
        return unsubscribe;
    }, []);

    const DeleteBlog = (id) => {
        toast('Please wait!', {
            icon: '🙏😶‍🌫️',
        });
        Blogslist.doc(id).delete().then(() => {
            // alert("Document successfully deleted!");
            toast.success("Blog Removed 💀");
        }).catch((error) => {
            console.log("Error removing document: ", error);
            toast.error("Something went wrong!! 👀")
        });
    }

    const SearchBlog = (e) => {
        e.preventDefault();
        Setblogs(blogs.filter((blogs) =>
            blogs.Title.toLowerCase().includes(search.toLowerCase())
            ||
            blogs.Body.toLowerCase().includes(search.toLowerCase())
        ));
    }

    const body = blogs.Body;
    return (
        <div>
            {/* Sign in With Gogle Link */}
            {/* <div>
                <Link to={"/signin"} >Signin</Link>
            </div> */}
            <form onSubmit={(e) => { SearchBlog(e) }}>
                <input onChange={(e) => { SetSearch(e.target.value) }} />
                <button type='submit'> Search </button>
            </form>
            {blogs.map(blog => (
                <div key={blog.id}>
                    <h2>Title : {blog.Title}</h2>
                    {/* <p>Body : {blog.Body}</p> */}
                    <div dangerouslySetInnerHTML={{ __html: body }}></div>
                    {
                        blog.CoverImg
                            ?
                            <>
                                <img alt='user blog' src={blog.CoverImg} />
                            </>
                            :
                            null
                    }


                    <Link to={"/show/" + blog.id}>View</Link>
                    <Link to={"/EditBlog/" + blog.id}>Edit</Link>
                    <button onClick={() => { DeleteBlog(blog.id) }}>delete</button>
                </div>
            ))
            }
        </div >
    );
}

export default BlogslistView;