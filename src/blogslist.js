import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import fb from './firebase'
const DB = fb.firestore();
const Blogslist = DB.collection('blogs');

const BlogslistView = () => {

    const [blogs, Setblogs] = useState([]);

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

    return (
        <div>
            {blogs.map(blog => (
                <div key={blog.id}>
                    <h2>Title : {blog.Title}</h2>
                    <p>Body : {blog.Body}</p>
                    <Link to={"/show/" + blog.id}>View</Link>
                </div>
            ))}
        </div>
    );
}

export default BlogslistView;