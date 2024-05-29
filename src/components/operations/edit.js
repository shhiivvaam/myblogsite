import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Editor } from '@tinymce/tinymce-react';

import fb from '../../config/firebase';
import useAuthState from '../../hooks/hooks';
import '../../styles/BlogEdit.css';
import Loader from '../loader/Loader';

const DB = fb.firestore();
const storageRef = fb.storage().ref();
const Blogslist = DB.collection('blogs');

const BlogEdit = () => {
    const { id } = useParams();
    const { user, initializing } = useAuthState(fb.auth());
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [cover, setCover] = useState(null);

    useEffect(() => {
        Blogslist.doc(id).get().then(snapshot => {
            const data = snapshot.data();
            setTitle(data.Title);
            setBody(data.Body);
        });
    }, [id]);

    // const submit = (e) => {
    //     e.preventDefault();
    //     toast('Please wait!', { icon: '🙏😶‍🌫️' });
    //     Blogslist.doc(id).update({
    //         Title: title,
    //         Body: body,
    //     })
    //         .then(() => {
    //             toast.success("Blog Edited Successfully ✅");
    //             navigate('/blogs');
    //         })
    //         .catch(error => {
    //             console.log('Error while editing the Blog', error);
    //             toast.error("Something went wrong while editing the Blog 🫠🤷");
    //         });
    // };
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

    const handleCoverImgChange = (e) => {
        if (e.target.files[0]) {
            setCover(e.target.files[0]);
        }
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
                <input
                    type='file'
                    name='coverimg'
                    accept='image/*'
                    onChange={handleCoverImgChange}
                    className="input-file"
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
