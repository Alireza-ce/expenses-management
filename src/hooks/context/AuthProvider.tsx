import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User, UserCredential } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

interface ContextType {
    currentUser: User | null | undefined,
    signIn: (username: string, password: string) => Promise<UserCredential> | null
}

const AuthContext = React.createContext<ContextType>({
    currentUser: null,
    signIn: () => null
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
            console.log(user);
            changeUser(user);
        });
        return subscribe;
    }, [])

    function signIn(username: string, password: string) {
        return signInWithEmailAndPassword(auth, username, password);
    }

    const value: ContextType = {
        currentUser,
        signIn
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
