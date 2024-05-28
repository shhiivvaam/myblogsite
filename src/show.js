import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import fb from './firebase'
import { v4 as uuidv4 } from 'uuid';
import useAuthState from './hooks';
const DB = fb.firestore();
const Blogslist = DB.collection('blogs');

// blog like function
function LikeBlogButton({ id, likes }) {

    const blogRef = DB.collection("blogs").doc(id);
    const { user } = useAuthState(fb.auth());

    const handleLikes = () => {
        if (likes?.includes(user.uid)) {
            blogRef.update({
                likes: fb.firestore.FieldValue.arrayRemove(user.uid)
            });
        } else {
            blogRef.update({
                likes: fb.firestore.FieldValue.arrayUnion(user.uid)
            });
        }
    }

    return (
        <div>
            {
                likes?.includes(user.uid)
                    ?
                    <button onClick={handleLikes}>UnLike</button>
                    :
                    <button onClick={handleLikes}>Like</button>
            }
        </div>
    );
}

const BlogView = () => {

    const { user, initializing } = useAuthState(fb.auth());

    const { id } = useParams();
    const [blogs, Setblogs] = useState([]);
    const [comment, setcomment] = useState("");
    const [commentList, setCommentList] = useState([]);

    Blogslist.doc(id).get().then((snapshot) => {
        const data = snapshot.data();
        // Setblogs(data);
        const commentdata = snapshot.data().comments;
        Setblogs({ ...data, id: id, });
        setCommentList(commentdata);
    })

    if (initializing) {
        return 'loading...';
    }

    const handleComment = (e) => {
        if (e.key === "Enter") {
            Blogslist.doc(id).update({
                comments: fb.firestore.FieldValue.arrayUnion({
                    userid: user.uid,
                    username: user.displayName,
                    userImg: user.photoURL,
                    comment: comment,
                    createdAt: fb.firestore.Timestamp.fromDate(new Date()),
                    commentId: uuidv4(),
                })
            }).then(() => {
                setcomment("");
            });
        }
    }

    // const body = blogs.Body;
    return (
        <div>
            <p>Title: {blogs.Title}</p>

            <p>Body: {blogs.Body}</p>

            {/* below configurations are for the { tinymce -> Editor}   -> to make the fit with the added styling, and do not show the actual HTML tags */}
            {/* <div dangerouslySetInnerHTML={{ __html: body }}></div> */}

            <div className='mt-20'>
                {
                    user ?
                        <LikeBlogButton id={blogs.id} likes={blogs.likes} />
                        :
                        null
                }
                <p>
                    {
                        blogs.likes
                            ?
                            <span>{blogs.likes.length}</span>
                            :
                            "0"
                    }
                </p>
            </div>
            <div className='mt-20'>
                {
                    user
                        ?
                        <div className='flex'>
                            <img className='w-12 h-12' src={user.photoURL} alt='user' />
                            <input
                                type='text'
                                className='w-full h-16 py-12 pl-4 border'
                                placeholder='Add Comment'
                                value={comment}
                                onChange={(e) => setcomment(e.target.value)}
                                onKeyUp={(e) => handleComment(e)}
                            />
                        </div>
                        :
                        null
                }
                {/* list of all comments */}
                <div className='mt-10'>
                    {
                        commentList !== undefined && commentList.map((item) => (
                            <div
                                className='flex'
                                key={item.commentId}>
                                {/* profile */}
                                <div>
                                    <img src={item.userImg} alt='user' />
                                </div>
                                {/* comment */}
                                <div>
                                    <p>{item.comment}</p>
                                    <br />
                                    <p>{item.username}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default BlogView;