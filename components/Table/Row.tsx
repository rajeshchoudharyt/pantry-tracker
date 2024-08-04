import {
    Box,
    Button,
    IconButton,
    MenuItem,
    Select,
    SelectChangeEvent,
    TableCell,
    TableRow,
    TextField,
} from "@mui/material";

import { DeleteIcon } from "@/utils/icon";
import { Doc } from "@/utils/types";
import { ChangeEvent, useEffect, useState } from "react";

type OnChangeEvent =
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    | SelectChangeEvent;

export default function Row({
    item,
    editable = false,
    isAddItemRow = false,
    stateActions,
}: {
    item: Doc;
    editable?: boolean;
    isAddItemRow?: boolean;
    stateActions?: any;
}) {
    const [data, setData] = useState(item);
    const [error, setError] = useState(false);
    let newData: any = {};
    let setNewData: any = {};

    if (editable) [newData, setNewData] = stateActions;

    useEffect(() => {
        if (data.name === "") setError(true);

        if (editable && !isAddItemRow && !error) {
            const temp = { ...data, name: data.name.trim() };
            setNewData({ ...newData, [data.id]: temp });
        }
    }, [data]);

    const handleChange = (e: OnChangeEvent) => {
        let { value, name } = e.target;
        if (!isAddItemRow && value.trim() == "") return handleDelete();

        const newData = { ...data, [name]: value };
        setError(false);
        setData(newData);
    };

    const handleDelete = () => {
        const temp = { ...newData };
        delete temp[data.id];
        setNewData(temp);
    };

    const handleDecrement = () => {
        if (data.quantity === 1) return;
        const quantity = data.quantity - 1;
        setData({ ...data, quantity });
    };
    const handleIncrement = () => {
        const quantity = data.quantity + 1;
        setData({ ...data, quantity });
    };

    const addItem = () => {
        if (error) return;

        const temp = { ...data, name: data.name.trim() };
        setNewData({ ...newData, [data.id]: temp });
    };

    //
    const CustomButton = ({
        label,
        onClick,
    }: {
        label: "-" | "+";
        onClick: () => void;
    }) => (
        <Button
            variant="contained"
            size="small"
            onClick={onClick}
            sx={{
                color: "secondary.main",
                bgcolor: "primary.main",
                maxWidth: "1lh",
                minWidth: "1lh",
                maxHeight: "1lh",
                minHeight: "1lh",
                ":hover": {
                    opacity: 0.85,
                },
            }}>
            {label}
        </Button>
    );

    return (
        <TableRow>
            {!editable ? (
                <>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.quantity}</TableCell>
                    <TableCell>{data.unit}</TableCell>
                </>
            ) : (
                <>
                    <TableCell sx={{ height: "3.2rem" }}>
                        <TextField
                            size="small"
                            name="name"
                            sx={{ minWidth: "6rem" }}
                            value={data.name}
                            onChange={handleChange}
                            error={error}
                        />
                    </TableCell>
                    <TableCell sx={{ height: "3.2rem" }}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="5rem">
                            <CustomButton label="-" onClick={handleDecrement} />
                            {data.quantity}
                            <CustomButton label="+" onClick={handleIncrement} />
                        </Box>
                    </TableCell>
                    <TableCell sx={{ height: "3.2rem" }}>
                        <Select
                            size="small"
                            name="unit"
                            sx={{ width: "5.5rem" }}
                            value={data.unit}
                            onChange={handleChange}>
                            <MenuItem value="g" defaultChecked>
                                g
                            </MenuItem>
                            <MenuItem value="kg">kg</MenuItem>
                            <MenuItem value="pcs">pcs</MenuItem>
                            <MenuItem value="pack">pack</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell
                        sx={{
                            height: "3.2rem",
                        }}>
                        {isAddItemRow ? (
                            <Button
                                variant="contained"
                                size="small"
                                onClick={addItem}
                                sx={{
                                    color: "secondary.main",
                                    bgcolor: "primary.main",
                                    ":hover": {
                                        opacity: 0.85,
                                    },
                                }}>
                                Add
                            </Button>
                        ) : (
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </TableCell>
                </>
            )}
        </TableRow>
    );
}
