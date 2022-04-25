import { signOut, signInWithEmailAndPassword, onAuthStateChanged, User, UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

interface ContextType {
    currentUser: User | null | undefined,
    signIn: (username: string, password: string) => Promise<UserCredential> | null,
    signUp: (username: string, password: string) => Promise<UserCredential> | null,
    logOut: () => Promise<void> | null
}

const AuthContext = React.createContext<ContextType>({
    currentUser: null,
    signIn: () => null,
    logOut:()=>null,
    signUp:()=>null
});

export function useAuth() {
    return useContext(AuthContext)
}

interface Props {
    children: any
}

export function AuthProvider({ children }: Props) {
    const [currentUser, changeUser] = useState<User | null>();

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            changeUser(user);
        });
        return subscribe;
    }, [])

    function signIn(username: string, password: string) {
        return signInWithEmailAndPassword(auth, username, password);
    }

    function signUp(username: string, password: string) {
        return createUserWithEmailAndPassword(auth, username, password);
    }

    function logOut(){
        return signOut(auth);
    }

    const value: ContextType = {
        currentUser,
        signIn,
        logOut,
        signUp
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
