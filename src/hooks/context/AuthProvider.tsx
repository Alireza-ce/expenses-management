import { signOut, signInWithEmailAndPassword, onAuthStateChanged, User, UserCredential, signInWithCustomToken } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

interface ContextType {
    currentUser: User | null | undefined,
    signIn: (username: string, password: string) => Promise<UserCredential> | null,
    logOut: () => Promise<void> | null
}

const AuthContext = React.createContext<ContextType>({
    currentUser: null,
    signIn: () => null,
    logOut:()=>null,
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

    function logOut(){
        return signOut(auth);
    }

    const value: ContextType = {
        currentUser,
        signIn,
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
