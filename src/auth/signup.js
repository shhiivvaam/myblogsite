import fb from "../database/firebase";
import useAuthState from "../hooks/hooks";

import { toast } from 'react-hot-toast';

export default function Signin() {

    const { user, initializing } = useAuthState(fb.auth());
    const signinwithGoogle = async () => {
        const provider = new fb.auth.GoogleAuthProvider();
        fb.auth().useDeviceLanguage();
        try {
            await fb.auth().signInWithRedirect(provider);
            toast.success("Logged in Succcessfully 👍");
        } catch (error) {
            console.log('Something occured while SignInWithGoogle : ', error.message);
            toast.error("Something went wrong!! 👀")
        }
    };

    if (initializing) {
        return 'loading...'
    }
    return (
        <div>
            {user
                ?
                <div className="mt-20 text-center">
                    <img src={user.photoURL} alt="user" className="w-12 h-12 mx-auto" />
                    <p>{user.displayName}</p>
                </div>
                :
                <div className="mt-20 text-center">
                    <button
                        className="border-2 border-black"
                        onClick={signinwithGoogle}>
                        Sign In With GOOGLE
                    </button>
                </div>
            }
        </div>
    );
}