"use client";

import AuthForm from "../AuthForm";

import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default function SignIn() {
    const router = useRouter();

    const handleSubmit = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        let error = "";

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential.user) router.replace("/");
                else error = "Something went wrong.";
            })
            .catch((err) => {
                if (err.message.includes("invalid-credential"))
                    error = "Invalid credential.";
                else error = err.message;
            });

        return error;
    };

    return <AuthForm name="Sign In" onSubmit={handleSubmit} />;
}
