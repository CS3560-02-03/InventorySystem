import { Box, TextField } from "@mui/material"
import { useContext, useState } from "react";
import { ProductTypeContext } from "../utils/contexts/CategoryContext";

export const ProductTypeDetails = () => {
    const { productType } = useContext(ProductTypeContext);
    return (
        <Box
            className="product-types-add-form"
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <form  >
                <TextField
                    // error
                    id="standard-text"
                    label="Name"
                    variant="standard"
                    defaultValue={productType?.name}
                    required

                />
                <TextField
                    id="standard-textarea"
                    label="Description"
                    placeholder="Enter the description for the Product category"
                    defaultValue={productType?.description}
                    multiline
                    variant="standard"
                    required
                />
            </form>
        </Box>
    )
}