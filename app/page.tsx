"use client";

import {
	Box,
	Button,
	CircularProgress,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import Row from "@/components/Table/Row";

import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase";
import { Doc } from "@/utils/types";

export default function Home() {
	const [items, setItems] = useState<Doc[]>([]);
	const [searchItems, setSearchItems] = useState<Doc[]>([]);
	const [progress, setProgress] = useState(true);
	const [value, setValue] = useState("");
	const router = useRouter();

	useEffect(() => {
		const user = auth.currentUser;
		if (user) {
			setProgress(true);
			fetchData();
		} else router.push("/signin");
	}, []);

	const fetchData = async () => {
		const user = auth.currentUser;
		if (user) {
			const docRef = doc(firestore, "pantry", user.uid);
			const docSnap = await getDoc(docRef);
			const data = docSnap.data();
			setItems(data?.items);
			setSearchItems(data?.items);

			setProgress(false);
		}
	};

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);

		if (e.target.value === "") {
			setSearchItems([...items]);
			return;
		}

		setSearchItems(
			items.filter(item => item.name.toLowerCase().startsWith(value))
		);
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
				textAlign: "center",
				px: 2,
				py: 6,
			}}>
			<Typography variant="h4" color="primary" fontWeight="800" mb={4}>
				Pantry Items
			</Typography>
			<Box
				my={2}
				columnGap={2}
				display="flex"
				justifyContent="space-between">
				<TextField
					size="small"
					name="search"
					placeholder="Search..."
					value={value}
					onChange={handleSearch}
					sx={{ minWidth: "6rem", width: "80%" }}
				/>
				<Button
					variant="contained"
					onClick={() => router.push("/update")}
					sx={{
						color: "secondary.main",
						bgcolor: "primary.main",
						float: "right",
						":hover": {
							opacity: 0.85,
						},
					}}>
					Update
				</Button>
			</Box>
			{searchItems && searchItems.length > 0 ? (
				<TableContainer component={Paper}>
					<Table aria-label="table">
						<TableHead
							sx={{
								color: "secondary.main",
								bgcolor: "primary.main",
							}}>
							<TableRow>
								<TableCell sx={{ color: "inherit" }}>
									Name
								</TableCell>
								<TableCell sx={{ color: "inherit" }}>
									Quantity
								</TableCell>
								<TableCell sx={{ color: "inherit" }}>
									Unit
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{searchItems
								? Object.values(searchItems).map(item => (
										<Row key={item.id} item={item} />
								  ))
								: ""}
						</TableBody>
					</Table>
				</TableContainer>
			) : progress ? (
				<CircularProgress color="inherit" size="1lh" />
			) : (
				<Typography variant="h6" color="primary" mt={4}>
					No data
				</Typography>
			)}
		</Container>
	);
}
