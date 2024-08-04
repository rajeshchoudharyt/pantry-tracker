"use client";

import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Row from "./Row";

import { DocObject } from "@/utils/types";

export default function CustomTable({
    data,
    editable = false,
    stateActions,
}: {
    data: DocObject;
    editable?: boolean;
    stateActions?: any;
}) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="table">
                <TableHead
                    sx={{
                        color: "secondary.main",
                        bgcolor: "primary.main",
                    }}>
                    <TableRow>
                        <TableCell sx={{ color: "inherit" }}>Name</TableCell>
                        <TableCell sx={{ color: "inherit" }}>
                            Quantity
                        </TableCell>
                        <TableCell sx={{ color: "inherit" }}>Unit</TableCell>
                        {editable ? <TableCell /> : ""}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                        ? Object.values(data).map((item) => (
                              <Row
                                  key={item.id}
                                  editable={editable}
                                  item={item}
                                  stateActions={stateActions}
                              />
                          ))
                        : ""}
                </TableBody>
                {editable ? (
                    <TableFooter
                        sx={{
                            bgcolor: "secondary.main",
                            "&:last-child td, &:last-child tr": {
                                border: 0,
                            },
                        }}>
                        <Row
                            key={Object.keys(data).length + 1}
                            editable
                            item={{
                                id: Object.keys(data).length + 1,
                                name: "",
                                quantity: 1,
                                unit: "g",
                            }}
                            stateActions={stateActions}
                            isAddItemRow
                        />
                    </TableFooter>
                ) : (
                    ""
                )}
            </Table>
        </TableContainer>
    );
}
