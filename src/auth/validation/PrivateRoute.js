import React from "react";
import { Navigate } from "react-router-dom";
import fb from '../../database/firebase';
import useAuthState from '../../hooks/hooks';
import { toast } from "react-hot-toast";
import Loader from "../../utils/loader/Loader";

export default function PrivateRoute({ children }) {
    const { user, initializing } = useAuthState(fb.auth());

    if (initializing) {
        // return <div>Loading...</div>;
        return <Loader />
    }

    if (user) {
        return children;
    } else {
        toast('Your are Not Logged In !! Please Login First 😶‍🌫️🤷',
            {
                icon: '🧐',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
        return <Navigate to="/" />;
    }
}
