import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import fb from './firebase'
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

        // Detach listener
        return unsubscribe;
    }, []);

    const DeleteBlog = (id) => {
        Blogslist.doc(id).delete().then(() => {
            alert("Document successfully deleted!");
        }).catch((error) => {
            console.log("Error removing document: ", error);
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

    // const body = blogs.Body;
    return (
        <div>
            <form onSubmit={(e) => { SearchBlog(e) }}>
                <input onChange={(e) => { SetSearch(e.target.value) }} />
                <button type='submit'> Search </button>
            </form>
            {blogs.map(blog => (
                <div key={blog.id}>
                    <h2>Title : {blog.Title}</h2>
                    <p>Body : {blog.Body}</p>
                    {
                        blog.CoverImg
                            ?
                            <>
                                <img src={blog.CoverImg} />
                            </>
                            :
                            null
                    }

                    {/* below configurations are for the { tinymce -> Editor}   -> to make the fit with the added styling, and do not show the actual HTML tags*/}
                    {/* <div dangerouslySetInnerHTML={{ __html: body }}></div> */}

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