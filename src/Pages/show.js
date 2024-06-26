import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import fb from '../config/firebase';
import useAuthState from '../hooks/hooks';
import '../styles/BlogView.css';
import Loader from '../components/loader/Loader';
import toast from 'react-hot-toast';

const DB = fb.firestore();
const Blogslist = DB.collection('blogs');

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
    };

    return (
        <div className="like-button-container">
            {likes?.includes(user.uid)
                ? <button className="like-button" onClick={handleLikes}>Unlike</button>
                : <button className="like-button" onClick={handleLikes}>Like</button>
            }
        </div>
    );
}

const BlogView = () => {
    const { user, initializing } = useAuthState(fb.auth());
    const { id } = useParams();
    const [blogs, setBlogs] = useState({});
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        const unsubscribe = Blogslist.doc(id).onSnapshot((snapshot) => {
            const data = snapshot.data();
            setBlogs({ ...data, id: id });
            setCommentList(data.comments);
        });

        return () => unsubscribe();
    }, [id]);

    if (initializing) {
        return <Loader />
    }

    const handleCommentDelete = (comment) => {
        toast('Please wait!', { icon: '🙏😶‍🌫️' });
        try {
            Blogslist.doc(id).update({
                comments: fb.firestore.FieldValue.arrayRemove(comment)
            });
            toast.success("Comment Removed 👍");
        } catch (error) {
            console.log("Something went wrong while deleting comment", error);
            toast.error("Something went wrong!! 👀");
        }
    };

    const submitComment = () => {
        if (comment.trim()) {
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
                setComment("");
                toast.success("Comment Posted 😂🫡");
            }).catch(error => {
                console.log("Something went wrong while adding comment", error);
                toast.error("Something went wrong!! 👀");
            });
        }
    };

    const handleCommentKeyUp = (e) => {
        if (e.key === "Enter") {
            submitComment();
        }
    };

    return (
        <div className="blog-view-container">
            <h1 className="blog-title">{blogs.Title}</h1>
            {blogs.CoverImg && <img className="blog-image" alt='user blog' src={blogs.CoverImg} />}
            <div className="blog-body" dangerouslySetInnerHTML={{ __html: blogs.Body }}></div>
            <div className="like-section">
                {user ? <LikeBlogButton id={blogs.id} likes={blogs.likes} /> : null}
                <p>{blogs.likes ? blogs.likes.length : "0"} Likes</p>
            </div>
            <div className="comment-section">
                {user ? (
                    <div className="comment-input">
                        <img className="user-photo" src={user.photoURL} alt="user" />
                        <input
                            type="text"
                            className="comment-box"
                            placeholder="Add Comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            onKeyUp={handleCommentKeyUp}
                        />
                        <button className="comment-submit-button" onClick={submitComment}>
                            Submit
                        </button>
                    </div>
                ) : null}
                <div className="comments-list">
                    {commentList && commentList.map((item) => (
                        <div className="comment" key={item.commentId}>
                            <div className="comment-profile">
                                <img src={item.userImg} alt="user" />
                            </div>
                            <div className="comment-content">
                                <p>{item.comment}</p>
                                <p className="comment-username">{item.username}</p>
                                {(user.uid === blogs.author || user.uid === item.userid) && (
                                    <button
                                        className="delete-button"
                                        onClick={() => handleCommentDelete(item)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BlogView;
