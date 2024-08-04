"use client";

import AuthForm from "../AuthForm";

import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default function SignUp() {
    const router = useRouter();

    const handleSubmit = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        let error = "";
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                if (userCredential.user) router.replace("/signin");
                else error = "Something went wrong.";
            })
            .catch((err) => {
                if (err.message.includes("email-already-in-use"))
                    error = "Email already taken.";
                else error = err.message;
            });

        return error;
    };

    return <AuthForm name="Sign Up" onSubmit={handleSubmit} />;
}
