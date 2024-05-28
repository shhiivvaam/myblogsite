import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fb from './firebase'
const DB = fb.firestore();
const Blogslist = DB.collection('blogs');

const BlogEdit = () => {

    const { id } = useParams();
    // const [blogs, Setblogs] = useState([]);
    const [title, SetTitle] = useState("");
    const [body, SetBody] = useState("");

    useEffect(() => {
        Blogslist.doc(id).get().then((snapshot) => {
            const data = snapshot.data();
            // Setblogs(data);
            SetTitle(data.Title);
            SetBody(data.Body);
        })
    }, []);
    // }, [id]);


    const submit = (e) => {
        e.preventDefault();
        Blogslist.doc(id).update({
            Title: title,
            Body: body,
        })
            .then((docRef) => {
                alert("Blog Added Successfully.");
            })
            .catch((error) => {
                console.log('Error while creating the Blog', error);
            });
    }

    return (
        <div>
            {/* <p>Title: {title}</p> */}
            {/* <p>Body: {body}</p> */}

            {/* edit options */}
            {/* <div> */}
            <form onSubmit={(event) => { submit(event) }}>
                <input type="text" placeholder="Title" value={title}
                    onChange={(e) => { SetTitle(e.target.value) }} required />

                {/* <textarea name="content" type="text" placeholder={body} */}
                <textarea name="content" type="text" placeholder="write your content here" value={body}
                    rows="10" cols="150" onChange={(e) => { SetBody(e.target.value) }} required >
                </textarea>

                <button type="submit">Submit</button>
            </form>
            {/* </div> */}
        </div>
    );
}

export default BlogEdit;