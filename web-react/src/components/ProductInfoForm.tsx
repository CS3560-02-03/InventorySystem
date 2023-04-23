import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import "../../src/css_styles/components/ProductInfoForm.css";
import { FaPlus } from 'react-icons/fa';
import { ProductTypeContext } from '../utils/contexts/CategoryContext';
import { useContext } from 'react';
import { useFindProductType } from '../utils/hooks/products/ProductType/useCheckProductType';
import { ProductDetails } from '../../../api/dist/utils/types';

interface Props {
    onAddProduct: (newProduct: ProductDetails) => Promise<boolean>;
}

export const ProductInfoForm: React.FC<Props> = ({ onAddProduct }) => {
    const { productType } = useContext(ProductTypeContext);
    
    const [productID, setProductID] = React.useState("");
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [size, setSize] = React.useState("");
    const [color, setColor] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [stock, setStock] = React.useState("");
    const [alertStockNumber, setAlertStockNumber] = React.useState("");
    const [description, setDescription] = React.useState("");

    const { findProductType } = useFindProductType();
    const handleAddButton = async () => {
        const productTypeDetails = await findProductType(productType?.name ?? ``);
        if (!productTypeDetails) {
            return;
        }

        // You should validate the form data here
        const productPrice = Number(price);
        const productWeight = Number(weight);
        const productStock = Number(stock);
        const productAlertThreshHold = Number(alertStockNumber);

        const newProduct = {
            id: productID,
            name: name,
            description: description,
            price: productPrice,
            productType: productTypeDetails,
            size: size,
            color: color,
            weight: productWeight,
            stock: productStock,
            alertStockNumber: productAlertThreshHold
        };

        const addResult = await onAddProduct(newProduct);
        if (addResult) {
            setProductID('');
            setName('');
            setDescription('');
            setPrice('');
            setColor('');
            setWeight('');
            setStock('');
            setAlertStockNumber('');
        }
    }

    return (
        <Box
        className='product-form-box'
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div className=''>
                <TextField
                    required
                    id="filled-name"
                    label="Product ID"
                    variant="filled"
                    onChange={(event) => setProductID(event.target.value)}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                    }}
                />
                <TextField
                    required
                    id="filled-name"
                    label="Name"
                    variant="filled"
                    onChange={(event) => setName(event.target.value)}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                    }}
                />
                <TextField
                    required
                    id="filled-price"
                    label="Price"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    variant="filled"
                    onChange={(event) => setPrice(event.target.value)}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                    }}
                />
                <TextField
                    required
                    id="filled-size"
                    label="Size"
                    variant="filled"
                    onChange={(event) => setSize(event.target.value)}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                    }}
                />
                <TextField
                    required
                    id="filled-color"
                    label="Color"
                    variant="filled"
                    onChange={(event) => setColor(event.target.value)}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                    }}
                />
                <TextField
                    required
                    id="filled-weight"
                    label="Weight"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
                    }}
                    variant="filled"
                    onChange={(event) => setWeight(event.target.value)}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                    }}
                />
                <TextField
                    required
                    id="filled-stock"
                    label="Stock"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    onChange={(event) => setStock(event.target.value)}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                    }}
                />
                <TextField
                    required
                    id="filled-alertStockNumb"
                    label="Alert Stock Number"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    onChange={(event) => setAlertStockNumber(event.target.value)}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                    }}
                />
                <TextField
                    required
                    id="filled-description"
                    multiline
                    label="Description"
                    variant="filled"
                    onChange={(event) => setDescription(event.target.value)}
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        },
                    }}
                />
                
            </div>
            <div 
                className='product-form-save-button' 
                onClick={handleAddButton}
            >
                <a className="button is-green" >
                    <FaPlus /> Add
                </a>
            </div>
        </Box>
    );
}
