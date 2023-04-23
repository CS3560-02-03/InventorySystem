import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../src/css_styles/page.css";
import "../../../src/css_styles/dashboard.css";
import "../../../src/css_styles/ProductTypes.css";
import PageHeader from "../../components/PageHeader";
import { AccountContext } from "../../utils/contexts/AccountContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Box, InputAdornment, Tab, Tabs, TextField } from "@mui/material";
import { FaSave, FaTrashAlt } from "react-icons/fa";
import { ProductDetails, UpdateProductDetails } from "../../../../api/dist/utils/types";
import { useFetchProductWithID } from "../../utils/hooks/products/Product/useFetchProductWithID";
import { MoonLoader } from "react-spinners";
import { Spinner } from "../../components/Spinner";
import { useProductAPI } from "../../utils/hooks/products/Product/useProductWithID";
import { useFetchAllOrders } from "../../utils/hooks/orders/useFetchAllOrders";
import { OrderDetailsTable } from "../../components/OrderDetailsTable";
import { GridRowSelectionModel } from "@mui/x-data-grid";

const EditProductInfoPage = () => {
    const { account } = useContext(AccountContext);
    const navigate = useNavigate();
    const { productId } = useParams();

    const [ dataChanged, setDataChanged ] = useState<boolean>(false);

    const [ productDetails, setProductDetails] = useState<ProductDetails>();
    const dummyProductUpdateDetails: UpdateProductDetails= {}
    let changedDetails: UpdateProductDetails = {

    }
    // const { findProduct, deleteProduct, updateProduct } = useProductAPI();
    const { product, loading, refreshProductWithID } = useFetchProductWithID(productId ?? ``);
    
    let savedName = product?.name ?? ``;
    const [name, setName] = useState<string>(savedName);
    let savedDescription = product?.description ?? ``
    const [description, setDescription] = useState<string>(savedDescription);
    const [thumbnailURL, setThumbnailURL] = useState(product?.thumbnailURL ?? ``);
    const [price, setPrice] = useState(String(product?.price) ?? ``);
    const [size, setSize] = useState(product?.size ?? ``);
    const [color, setColor] = useState(product?.color ?? ``);
    const [weight, setWeight] = useState(String(product?.weight) ?? ``);
    const [stock, setStock] = useState(String(product?.stock) ?? ``);
    const [alertStockNumber, setAlertStockNumber] = useState(String(product?.alertStockNumber) ?? ``);
    
    useEffect(() => {
        if (!account) {
            navigate("/login");
        } else {
            if (!productId) {
                navigate("/dashboard");
                return;
            }
            setProductDetails(product);
            refreshAllOrders();
        }
    }, [account, navigate]);
    // tabs
    const [value, setValue] = React.useState('details');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const { updateProduct} = useProductAPI();

    const handleUpdateProduct = async () => {
        if (!productId) return;
        if (!dataChanged) {
            toast.error(`No changes to save.`);
            return;
        }
        const newProduct = await updateProduct(productId, changedDetails);
        console.log(newProduct)
        if (!newProduct) {
            toast.error(`Failed to save changes.`);
            return;
        }
        toast.success(`Saved product information.`);
        refreshProductWithID(productId);
    }

    const {orders, loading: loadingOrders, refreshAllOrders} = useFetchAllOrders();

    const handleDeleteOrders = async (selectedIds: GridRowSelectionModel) => {
        selectedIds.forEach(async (selectedID) => {
            // const selectProduct = await findProduct(selectedID.toString());
            // if (!selectProduct) {
            //     toast.error(`Can't find product with ID ${selectedID.toString()}`)
            //     return;
            // }
            
            // const productDeleted = await deleteProductWithProductID(selectedID.toString())
            // if (!productDeleted) {
            //     toast.error(`Can't delete product with ID ${selectedID.toString()}`)
            //     return;  
            // } 
            // toast.success(`Deleted product with ID ${selectedID.toString()}`)
            // // Refresh the product list
            // await refreshProductsWithTypeName(productType?.name ?? ``);
            // setProducts([...products])
        })
    }
    return (
        <div>
            <PageHeader />
            <div className="product-types-page-wrapper">
                <div className="product-types-header">
                    <h3>Product ID: {product?.id}</h3> 
                </div>
                <Box sx={{ width: '100%' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                        sx={{
                            backgroundColor: 'grey', // Add the background color for dark theme
                            '& .Mui-selected': {
                                color: 'whitesmoke', // Change the color of the selected tab to white
                            },
                        }}
                    >
                        <Tab value="details" label="Details" />
                        {loadingOrders ? <div></div> : <Tab value="orders" label={`Orders (${orders.filter(order => order.orderProducts.some(orderProd => orderProd.product.id === productId)).length})`} />}
                    </Tabs>
                </Box>
                {loading == true ? 
                <div style={{"display": "flex"}}>
                    <Spinner children={
                        <MoonLoader color='white'/>
                    }/>
                </div>
                :
                <React.Fragment>
                {value === `details` && product  && (
                <Box
                    className="product-type-details-form"
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%'},
                    }}
                    style={{padding: '20px 10px'}}
                    noValidate
                    autoComplete="off"
                > 
                    <div className="column">
                        <div className="name-field"> 
                            <TextField
                                error={dataChanged && changedDetails.name !== undefined && changedDetails.name == `` }
                                className="item"
                                id="filled-text"
                                label="Name"
                                variant="filled"
                                defaultValue={product.name}
                                onChange={(event) => {
                                    // setDataChanged(
                                    //     product.name !== event.target.value || 
                                    //     String(product.price) !== price || 
                                    //     product.size !== size || 
                                    //     product.color !== color || 
                                    //     String(product.weight) !== weight || 
                                    //     String(product.stock) !== stock || 
                                    //     String(product.alertStockNumber) !== alertStockNumber || 
                                    //     String(product.description) !== description || 
                                    //     product.thumbnailURL !== thumbnailURL
                                    // )
                                    // setName(event.target.value)
                                    changedDetails.name = event.target.value;
                                    if (changedDetails.name === product.name) {
                                        // changedDetails.name == undefined;
                                    }
                                    setDataChanged(changedDetails !== dummyProductUpdateDetails)
                                }}
                                required
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
                                defaultValue={product.price}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                variant="filled"
                                onChange={(event) => {
                                    // setDataChanged(
                                    //     product.name !== name || 
                                    //     String(product.price) !== event.target.value || 
                                    //     product.size !== size || 
                                    //     product.color !== color || 
                                    //     String(product.weight) !== weight || 
                                    //     String(product.stock) !== stock || 
                                    //     String(product.alertStockNumber) !== alertStockNumber || 
                                    //     String(product.description) !== description || 
                                    //     product.thumbnailURL !== thumbnailURL
                                    // )
                                    // setPrice(event.target.value)
                                    changedDetails.price = parseFloat(event.target.value)
                                    setDataChanged(changedDetails !== dummyProductUpdateDetails)
                                }}
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
                                defaultValue={product.size}
                                onChange={(event) => {
                                    // setDataChanged(
                                    //     product.name !== name || 
                                    //     String(product.price) !== price || 
                                    //     product.size !== event.target.value || 
                                    //     product.color !== color || 
                                    //     String(product.weight) !== weight || 
                                    //     String(product.stock) !== stock || 
                                    //     String(product.alertStockNumber) !== alertStockNumber || 
                                    //     String(product.description) !== description || 
                                    //     product.thumbnailURL !== thumbnailURL
                                    // )
                                    // setSize(event.target.value)
                                    changedDetails.size = event.target.value
                                    setDataChanged(changedDetails !== dummyProductUpdateDetails)
                                }}
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
                                defaultValue={product.color}
                                onChange={(event) => {
                                    setDataChanged(
                                        product.name !== name || 
                                        String(product.price) !== price || 
                                        product.size !== size || 
                                        product.color !== event.target.value || 
                                        String(product.weight) !== weight || 
                                        String(product.stock) !== stock || 
                                        String(product.alertStockNumber) !== alertStockNumber || 
                                        String(product.description) !== description || 
                                        product.thumbnailURL !== thumbnailURL
                                    )
                                    setColor(event.target.value)
                                }}
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
                                defaultValue={product.weight}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">lbs</InputAdornment>,
                                }}
                                variant="filled"
                                onChange={(event) => {
                                    // setDataChanged(
                                    //     product.name !== name || 
                                    //     String(product.price) !== price || 
                                    //     product.size !== size || 
                                    //     product.color !== color || 
                                    //     String(product.weight) !== event.target.value || 
                                    //     String(product.stock) !== stock || 
                                    //     String(product.alertStockNumber) !== alertStockNumber || 
                                    //     String(product.description) !== description || 
                                    //     product.thumbnailURL !== thumbnailURL
                                    // )
                                    // setWeight(event.target.value)
                                    changedDetails.weight = parseFloat(event.target.value)
                                    setDataChanged(changedDetails !== dummyProductUpdateDetails)
                                }}
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
                                defaultValue={product.stock}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                                onChange={(event) => {
                                    // setDataChanged(
                                    //     product.name !== name || 
                                    //     String(product.price) !== price || 
                                    //     product.size !== size || 
                                    //     product.color !== color || 
                                    //     String(product.weight) !== weight || 
                                    //     String(product.stock) !== event.target.value || 
                                    //     String(product.alertStockNumber) !== alertStockNumber || 
                                    //     String(product.description) !== description || 
                                    //     product.thumbnailURL !== thumbnailURL
                                    // )
                                    // setStock(event.target.value)
                                    changedDetails.stock = parseInt(event.target.value)
                                    setDataChanged(changedDetails !== dummyProductUpdateDetails)
                                }}
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
                                defaultValue={product.alertStockNumber}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                                onChange={(event) => {
                                    // setDataChanged(
                                    //     product.name !== name || 
                                    //     String(product.price) !== price || 
                                    //     product.size !== size || 
                                    //     product.color !== color || 
                                    //     String(product.weight) !== weight || 
                                    //     String(product.stock) !== stock || 
                                    //     String(product.alertStockNumber) !== event.target.value || 
                                    //     String(product.description) !== description || 
                                    //     product.thumbnailURL !== thumbnailURL
                                    // )
                                    // setAlertStockNumber(event.target.value)
                                    changedDetails.alertStockNumber = parseInt(event.target.value)
                                    setDataChanged(changedDetails !== dummyProductUpdateDetails)
                                }}
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
                                defaultValue={product.description}
                                onChange={(event) =>{
                                    // setDataChanged(
                                    //     product.name !== name || 
                                    //     String(product.price) !== price || 
                                    //     product.size !== size || 
                                    //     product.color !== color || 
                                    //     String(product.weight) !== weight || 
                                    //     String(product.stock) !== stock || 
                                    //     String(product.alertStockNumber) !== alertStockNumber || 
                                    //     String(product.description) !== event.target.value || 
                                    //     product.thumbnailURL !== thumbnailURL
                                    // )
                                    // setDescription(event.target.value)
                                    changedDetails.description = event.target.value;
                                    setDataChanged(changedDetails !== dummyProductUpdateDetails)
                                }}
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
                        <div className="name-field">
                            <TextField
                                className="item"
                                id="filled-textarea"
                                label="Thumbnail"
                                defaultValue={product.thumbnailURL ||  product.productType.thumbnailURL || `https://www.postcardsrus.com/userfiles/images/paper.jpg`}
                                // placeholder="Enter the description for the Product category"
                                // multiline
                                variant="filled"
                                // required
                                onChange={(event) => {
                                    // setDataChanged(
                                    //     product.name !== name || 
                                    //     String(product.price) !== price || 
                                    //     product.size !== size || 
                                    //     product.color !== color || 
                                    //     String(product.weight) !== weight || 
                                    //     String(product.stock) !== stock || 
                                    //     String(product.alertStockNumber) !== alertStockNumber || 
                                    //     String(product.description) !== description || 
                                    //     product.thumbnailURL !== event.target.value
                                    // )
                                    // setThumbnailURL(event.target.value)
                                    changedDetails.thumbnailURL = event.target.value;
                                    setDataChanged(changedDetails !== dummyProductUpdateDetails)
                                }}
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
                        <a 
                            className="button is-info" 
                            style={{margin: '10px'}}
                            onClick={() => {}}>
                            <FaTrashAlt />
                            Delete
                        </a>

                        <a 
                            className={`button is-green`} 
                            style={{opacity: `${dataChanged ? 1 : 0}`, margin: '10px'}}
                            onClick={handleUpdateProduct}
                        >
                            <FaSave />
                            Save
                        </a>
                    </div>
                    <div className="column">
                        <div className="product-type-icon">
                            {/* {icon} */}
                            <img src={product.thumbnailURL ||  product.productType.thumbnailURL || `https://www.postcardsrus.com/userfiles/images/paper.jpg`} alt={product?.name ?? ``} />
                        </div>
                    </div>
                </Box>
                )}
                </React.Fragment>}
                {value === `orders` &&
                <React.Fragment>
                    {loadingOrders == true ? 
                    <div style={{"display": "flex"}}>
                        <Spinner children={
                            <MoonLoader color='white'/>
                        }/>
                    </div>
                    :
                    <OrderDetailsTable orderDetails={orders.filter(order => order.orderProducts.some(orderProd => orderProd.product.id === productId))} onDelete={handleDeleteOrders}/>
                    }
                </React.Fragment>
                
                }
                
            </div>
            <ToastContainer/>
        </div>
    );
};

export default EditProductInfoPage;
