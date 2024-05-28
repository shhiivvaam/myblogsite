import React, { useState } from 'react';

// tinymce editor
import { Editor } from '@tinymce/tinymce-react';

import fb from './firebase'
const DB = fb.firestore();
const Blogslist = DB.collection('blogs');



const CreateBlog = () => {

    const [title, SetTitle] = useState("");
    const [body, SetBody] = useState("");

    const submit = (e) => {
        e.preventDefault();
        Blogslist.add({
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
            <form onSubmit={(event) => { submit(event) }}>
                <input type="text" placeholder="Title"
                    onChange={(e) => { SetTitle(e.target.value) }} required />

                <textarea name="content" type="text" placeholder="write your content here"
                    rows="10" cols="150" onChange={(e) => { SetBody(e.target.value) }} required >
                </textarea>

                {/* <Editor
                    textareaName='content'
                    initialValue='write your content here'
                    onEditorChange={(newText) => { SetBody(newText) }}
                    required
                    apiKey='3lw2lgintfata5t8twmzvfp2fy1ln1odn4ueweqhg5xqhhog'
                /> */}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateBlog;