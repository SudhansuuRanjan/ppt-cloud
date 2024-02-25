import { useContext, createContext, useState, useEffect, useRef } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "../firebase";
import { onAuthStateChanged } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const AuthContext = createContext({
    currentUser: null,
    signIn: () => { },
    signOut: () => { }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: any }) => {
    const isMounted = useRef(true);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const signInWithGoogle = async () => {
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                localStorage.setItem('token', token as string);
                // The signed-in user info.
                const user = result.user;
                setCurrentUser(user);
                // console.log({ user, token });
                // navigate('/dashboard');
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log({ errorCode, errorMessage, email, credential });
            });
    }

    const logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            setCurrentUser(null);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (isMounted) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setCurrentUser(user);
                } else {
                    setCurrentUser(null);
                }
                setLoading(false);
            });
        }

        return () => {
            isMounted.current = false;
        }
    }, [isMounted]);

    return (
        <AuthContext.Provider value={{
            currentUser,
            signIn: signInWithGoogle,
            signOut: logOut
        }}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;