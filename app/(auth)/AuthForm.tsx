"use client";

import Link from "next/link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FormEvent, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";

export default function AuthForm({
    name,
    onSubmit,
}: {
    name: "Sign In" | "Sign Up";
    onSubmit: (data: { email: string; password: string }) => Promise<string>;
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = { email, password };

        // To validate email
        const regex = new RegExp(
            /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        );
        if (!regex.test(email)) {
            setError("Invalid email.");
            return;
        }

        setEmail("");
        setPassword("");

        setProgress(true);
        const err = await onSubmit(data);
        setProgress(false);

        setError(err);
    };

    return (
        <Box
            p={4}
            pt={16}
            display="flex"
            position="relative"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">
            {error ? (
                <Alert
                    severity="error"
                    variant="standard"
                    sx={{
                        position: "absolute",
                        top: "14%",
                        maxWidth: "26rem",
                        mx: 4,
                        maxHeight: "4lh",
                        width: "100%",
                    }}>
                    {error}
                </Alert>
            ) : (
                ""
            )}
            <Box
                component="form"
                py={4}
                maxWidth="26rem"
                textAlign="center"
                onSubmit={handleSubmit}>
                <Typography component="h1" variant="h5" mb={4}>
                    {name}
                </Typography>
                <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="normal"
                    size="small"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                    }}
                    inputProps={{ minLength: 6 }}
                    sx={{ mb: 2 }}
                />
                <Button
                    type="submit"
                    size="large"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}>
                    {progress ? (
                        <CircularProgress color="inherit" size="1lh" />
                    ) : (
                        name
                    )}
                </Button>
            </Box>
            <Box display="flex" gap={1} justifyContent="center">
                <Typography component="p" variant="body1">
                    {name === "Sign In"
                        ? "Don't have an account?"
                        : "Already have an account?"}
                </Typography>
                <Link href={name === "Sign In" ? "/signup" : "/signin"}>
                    {name === "Sign In" ? "Sign Up" : "Sign In"}
                </Link>
            </Box>
        </Box>
    );
}
