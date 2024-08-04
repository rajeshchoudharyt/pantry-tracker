"use client";

import CustomTable from "@/components/Table/CustomTable";
import { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
    const [items, setItems] = useState<any>([]);
    const router = useRouter();

    const fetchData = async () => {
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(firestore, "pantry", user.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setItems(data?.items);
        } else {
            return router.push("/signin");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container
            maxWidth="md"
            sx={{
                textAlign: "center",
                px: 2,
                py: 6,
            }}>
            <Typography variant="h4" color="primary" fontWeight="800" mb={4}>
                Pantry Items
            </Typography>
            <Button
                variant="contained"
                onClick={() => router.push("/update")}
                sx={{
                    color: "secondary.main",
                    bgcolor: "primary.main",
                    my: 2,
                    float: "right",
                    ":hover": {
                        opacity: 0.85,
                    },
                }}>
                Update
            </Button>
            {items && items.length > 0 ? (
                <CustomTable data={items} />
            ) : (
                <Typography variant="h6" color="primary" mt={4}>
                    No data
                </Typography>
            )}
        </Container>
    );
}
