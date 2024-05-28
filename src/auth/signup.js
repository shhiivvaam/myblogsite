import React from 'react';
import fb from "../database/firebase";
import useAuthState from "../hooks/hooks";
import { toast } from 'react-hot-toast';
import '../styles/Signin.css';

export default function Signin() {
    const { user, initializing } = useAuthState(fb.auth());

    const signinwithGoogle = async () => {
        const provider = new fb.auth.GoogleAuthProvider();
        fb.auth().useDeviceLanguage();
        try {
            await fb.auth().signInWithRedirect(provider);
            toast.success("Logged in Successfully 👍");
        } catch (error) {
            console.log('Something occurred while SignInWithGoogle : ', error.message);
            toast.error("Something went wrong!! 👀")
        }
    };

    if (initializing) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="signin-container">
            {user
                ? <div className="user-info">
                    <img src={user.photoURL} alt="user" className="user-photo" />
                    <p className="user-name">{user.displayName}</p>
                </div>
                : <div className="signin-button-container">
                    Please Sign In First !!
                    <button
                        className="signin-button"
                        onClick={signinwithGoogle}>
                        Sign In With Google
                    </button>
                </div>
            }
        </div>
    );
}
