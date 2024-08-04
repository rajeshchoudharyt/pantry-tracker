"use client";

import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    display: "swap",
});

const theme = createTheme({
    palette: {
        primary: {
            main: "hsl(240, 6%, 10%)",
        },
        secondary: {
            main: "hsl(240, 5%, 96%)",
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
});

export { theme };
