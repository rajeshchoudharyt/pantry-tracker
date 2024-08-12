"use client";

import {
	Box,
	Button,
	CircularProgress,
	Container,
	Typography,
} from "@mui/material";
import CustomTable from "@/components/Table/CustomTable";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore, auth } from "@/firebase";
import { tree } from "next/dist/build/templates/app-page";

const structureData = (data: any) => {
	let temp = {};
	for (let item of data) temp = { ...temp, [item.id]: item };
	return temp;
};

export default function Update() {
	const [newData, setNewData] = useState({});
	const [progress, setProgress] = useState(true);
	const [updateProgress, setUpdateProgress] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const user = auth.currentUser;
		if (user) {
			setProgress(true);
			fetchData();
			setProgress(false);
		} else router.push("/signin");
	}, []);

	const fetchData = async () => {
		await auth;
		const user = auth.currentUser;
		if (user) {
			const docRef = doc(firestore, "pantry", user.uid);
			const docSnap = await getDoc(docRef);
			const data = docSnap.data();
			if (data) setNewData(structureData(data?.items));
		}
	};

	const handleUpdate = async () => {
		if (newData && Object.keys(newData).length == 0) return;
		setUpdateProgress(true);
		const user = auth.currentUser;
		if (user) {
			const data = { id: user.uid, items: Object.values(newData) };
			const docRef = doc(firestore, "pantry", user.uid);
			await setDoc(docRef, data);
			setUpdateProgress(false);
			router.replace("/");
		} else {
			router.push("/signin");
		}
	};

	if (progress) {
		return (
			<Box
				width="100%"
				height="100dvh"
				display="flex"
				justifyContent="center"
				alignItems="center">
				<CircularProgress color="inherit" size="1lh" />
			</Box>
		);
	}

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
					{updateProgress ? (
						<CircularProgress color="inherit" size="1lh" />
					) : (
						`Update`
					)}
				</Button>
			</Box>
		</Container>
	);
}
