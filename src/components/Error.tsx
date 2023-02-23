import React from "react"

import {
    Box, Alert, Button, Typography, AlertTitle
} from "@mui/material"
import type { BoxProps } from "@mui/material"

import elenaError from "../assets/elenaError.png"
import Link from "next/link"

export const Error: React.FC<{
    alertTitle: string,
    alertSubtitle: string,
    buttonLabel: string
} & BoxProps> = ({
    alertTitle,
    alertSubtitle,
    buttonLabel,
    ...props
}) => {
    return (
        <Box 
            width="100vw"
            display="flex"
            justifyContent="center"
            pt={"30vh"}
            px={4}
            {...props}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box
                    src={elenaError.src}
                    alt="Error"
                    component="img"
                    maxWidth={"90vw"}
                    position="relative"
                    top="2px"
                />
                <Alert 
                severity="error"
                >
                    <AlertTitle>
                        {alertTitle}
                    </AlertTitle>
                    {alertSubtitle}
                </Alert>
                <Link href="/">
                    <Button 
                        variant="contained"
                        sx={{ 
                            mt: 2 
                        }}
                    >
                        {buttonLabel}
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default Error