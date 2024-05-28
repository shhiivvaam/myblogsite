import fb from "./firebase";
import useAuthState from "./hooks";

export default function Signin() {

    const { user, initializing } = useAuthState(fb.auth());

    const signinwithGoogle = async () => {
        const provider = new fb.auth.GoogleAuthProvider();
        fb.auth().useDeviceLanguage();

        try {
            // we have not ued here -> ( signInWithPopUp ) because is sometimes misbehaves while using in mobile applications
            await fb.auth().signInWithRedirect(provider);
        } catch (error) {
            console.log('Something occured while SignInWithGoogle : ', error.message);
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
                        Sign in with Google
                    </button>
                </div>
            }
        </div>
    );
}