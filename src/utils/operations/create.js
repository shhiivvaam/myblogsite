import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import { toast } from 'react-hot-toast';

import fb from '../../database/firebase'
import useAuthState from '../../hooks/hooks';
const DB = fb.firestore();
const storageRef = fb.storage().ref();
const Blogslist = DB.collection('blogs');


const CreateBlog = () => {

    const { user, initializing } = useAuthState(fb.auth());
    const navigate = useNavigate();
    const [title, SetTitle] = useState("");
    const [body, SetBody] = useState("");
    const [cover, SetCover] = useState(null);

    const handleCoverImgChange = (e) => {
        if (e.target.files[0]) {
            SetCover(e.target.files[0]);
        }
    }

    const submit = (e) => {
        e.preventDefault();
        toast('Please wait!', {
            icon: '🙏😶‍🌫️',
        });
        const uploadtask = storageRef.child('images/' + cover.name).put(cover);
        uploadtask.on(
            'state_changed',
            snapshot => { },
            error => {
                console.log(error);
            },
            () => {
                // uploadtask.snapshot.ref.getDownloadURL()
                storageRef.child('images/' + cover.name).getDownloadURL().then(url => {
                    console.log("image url : ", url);

                    Blogslist.add({
                        Title: title,
                        Body: body,
                        CoverImg: url,
                        author: user.uid,
                    })
                        .then((docRef) => {
                            // alert("Blog Added Successfully.");
                            toast.success("Blog Added Successfully 😎✅")
                            navigate("/blogs");
                        })
                        .catch((error) => {
                            console.log('Error while creating the Blog', error);
                            toast.error("Error while creating the Blog ❌")
                        });
                })
            }
        )
    }

    if (initializing) return 'loding...';

    return (
        <div>
            <form onSubmit={(event) => { submit(event) }}>
                <input type="text" placeholder="Title"
                    onChange={(e) => { SetTitle(e.target.value) }} required />

                {/* input for image -> cover */}
                <input type='file' name='coverimg' accept='image/*' onChange={(e) => handleCoverImgChange(e)} />

                {/* <textarea name="content" type="text" placeholder="write your content here"
                    rows="10" cols="150" onChange={(e) => { SetBody(e.target.value) }} required >
                </textarea> */}

                <Editor
                    textareaName='content'
                    initialValue='write your content here'
                    onEditorChange={(newText) => { SetBody(newText) }}
                    required
                    apiKey='3lw2lgintfata5t8twmzvfp2fy1ln1odn4ueweqhg5xqhhog'
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateBlog;