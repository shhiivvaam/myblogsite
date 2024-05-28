import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import fb from './firebase'
const DB = fb.firestore();
const Blogslist = DB.collection('blogs');

const BlogView = () => {

    const { id } = useParams();
    const [blogs, Setblogs] = useState([]);

    Blogslist.doc(id).get().then((snapshot) => {
        const data = snapshot.data();
        Setblogs(data);
    })

    // const body = blogs.Body;
    return (
        <div>
            <p>Title: {blogs.Title}</p>

            <p>Body: {blogs.Body}</p>
            {/* below configurations are for the { tinymce -> Editor}   -> to make the fit with the added styling, and do not show the actual HTML tags */}
            {/* <div dangerouslySetInnerHTML={{ __html: body }}></div> */}
        </div>
    );
}

export default BlogView;