import React from 'react';
import fb from "../database/firebase";
import useAuthState from "../hooks/hooks";
import { toast } from 'react-hot-toast';
import '../styles/Signin.css';
import logo from '../assets/googleImage.png';
import Loader from '../utils/loader/Loader';

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

    const logout = async () => {
        try {
            await fb.auth().signOut();
            toast.success("Logged out Successfully 👍");
        } catch (error) {
            toast.error("Something went wrong!! 👀")
            console.log('Something occurred while logging out: ', error.message);
        }
    };

    if (initializing) {
        // return <div className="loading">Loading...</div>
        return <Loader />
    }

    return (
        <div className="signin-container">
            {user
                ? <div className="user-info">
                    <img src={user.photoURL} alt="user" className="user-photo" />
                    <p className="user-name">{user.displayName}</p>
                    <button
                        className="logout-button"
                        onClick={logout}>
                        Logout
                    </button>
                </div>
                : <div className="signin-button-container">
                    <img src={logo} alt="logo" className="logo" />
                    <p>Please Sign In First !!</p>
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
