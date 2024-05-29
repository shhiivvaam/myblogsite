import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-hot-toast';

import fb from '../../config/firebase';
import useAuthState from '../../hooks/hooks';
import '../../styles/CreateBlog.css';
import Loader from '../loader/Loader';

const DB = fb.firestore();
const storageRef = fb.storage().ref();
const Blogslist = DB.collection('blogs');

const CreateBlog = () => {
    const { user, initializing } = useAuthState(fb.auth());
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [cover, setCover] = useState(null);

    const handleCoverImgChange = (e) => {
        if (e.target.files[0]) {
            setCover(e.target.files[0]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        toast('Please wait!', { icon: '🙏😶‍🌫️' });
        if (cover !== null) {
            const uploadTask = storageRef.child('images/' + cover.name).put(cover);
            uploadTask.on(
                'state_changed',
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storageRef.child('images/' + cover.name).getDownloadURL().then(url => {
                        Blogslist.add({
                            Title: title,
                            Body: body,
                            CoverImg: url,
                            author: user.uid,
                        })
                            .then(() => {
                                toast.success("Blog Added Successfully 😎✅");
                                navigate("/blogs");
                            })
                            .catch(error => {
                                console.log('Error while creating the Blog', error);
                                toast.error("Error while creating the Blog ❌");
                            });
                    });
                }
            );
        } else {
            Blogslist.add({
                Title: title,
                Body: body,
                author: user.uid,
            })
                .then(() => {
                    toast.success("Blog Added Successfully 😎✅");
                    navigate("/blogs");
                })
                .catch(error => {
                    console.log('Error while creating the Blog', error);
                    toast.error("Error while creating the Blog ❌");
                });
        };
    }

    if (initializing) {
        // return 'loading...';
        return <Loader />
    }

    return (
        <div className="create-blog-container">
            <form onSubmit={submit} className="create-blog-form">
                <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="input-title"
                />
                <input
                    type='file'
                    name='coverimg'
                    accept='image/*'
                    onChange={handleCoverImgChange}
                    className="input-file"
                />
                <Editor
                    textareaName='content'
                    initialValue='write your content here'
                    onEditorChange={setBody}
                    // apiKey={process.env.TINYMCE_EDITOR_API_KEY}
                    apiKey='3lw2lgintfata5t8twmzvfp2fy1ln1odn4ueweqhg5xqhhog'
                    className="editor"
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default CreateBlog;
