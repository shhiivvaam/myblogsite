import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Editor } from '@tinymce/tinymce-react';

import fb from '../../database/firebase';
import '../../styles/BlogEdit.css';

const DB = fb.firestore();
const Blogslist = DB.collection('blogs');

const BlogEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        Blogslist.doc(id).get().then(snapshot => {
            const data = snapshot.data();
            setTitle(data.Title);
            setBody(data.Body);
        });
    }, [id]);

    const submit = (e) => {
        e.preventDefault();
        toast('Please wait!', { icon: '🙏😶‍🌫️' });
        Blogslist.doc(id).update({
            Title: title,
            Body: body,
        })
            .then(() => {
                toast.success("Blog Edited Successfully ✅");
                navigate('/blogs');
            })
            .catch(error => {
                console.log('Error while editing the Blog', error);
                toast.error("Something went wrong while editing the Blog 🫠🤷");
            });
    };

    return (
        <div className="edit-blog-container">
            <form onSubmit={submit} className="edit-blog-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-title"
                // required
                />
                <textarea
                    name="content"
                    type="text"
                    placeholder="..loading"
                    value={body}
                    rows="10"
                    cols="150"
                    onChange={(e) => setBody(e.target.value)}
                    className="input-body"
                // required
                />
                <h2>Preview</h2>
                <Editor
                    textareaName='content'
                    initialValue={body}
                    apiKey='3lw2lgintfata5t8twmzvfp2fy1ln1odn4ueweqhg5xqhhog'
                    init={{
                        menubar: false,
                        toolbar: false,
                        readonly: true,
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        // Optional: Disable the resizing handle at the bottom right corner
                        resize: false,
                        height: 300  // Adjust height as needed
                    }}
                    className="editor"
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default BlogEdit;
