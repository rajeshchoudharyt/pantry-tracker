"use client";

import CustomTable from "@/components/Table/CustomTable";

import { auth, firestore } from "@/firebase";
import { Box, Button, Container, Typography } from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const structureData = (data: any) => {
    let temp = {};
    for (let item of data) temp = { ...temp, [item.id]: item };
    return temp;
};

export default function Update() {
    const [newData, setNewData] = useState({});
    const router = useRouter();

    const fetchData = async () => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(firestore, "pantry", user.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            if (data) setNewData(structureData(data?.items));
        } else {
            router.push("/signin");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = async () => {
        if (newData && Object.keys(newData).length == 0) return;

        const user = auth.currentUser;
        if (user) {
            const data = { id: user.uid, items: Object.values(newData) };
            const docRef = doc(firestore, "pantry", user.uid);
            await setDoc(docRef, data);
            alert("Updated");
            router.replace("/");
        } else {
            router.push("/signin");
        }
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                maxHeight: "100lvh",
                py: 4,
            }}>
            <Typography
                variant="h4"
                color="primary"
                fontWeight="800"
                maxHeight="15lvh">
                Update Pantry
            </Typography>

            <Box minHeight="30rem" height="85lvh" mt={4}>
                <CustomTable
                    editable
                    data={newData}
                    stateActions={[newData, setNewData]}
                />
                <Button
                    variant="contained"
                    onClick={handleUpdate}
                    sx={{
                        color: "secondary.main",
                        bgcolor: "primary.main",
                        my: 4,
                        ":hover": {
                            opacity: 0.85,
                        },
                    }}>
                    Update
                </Button>
            </Box>
        </Container>
    );
}
