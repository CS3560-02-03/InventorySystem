import { useState, useEffect, useContext } from "react";
import PageHeader from "../../components/PageHeader";
import { GridColDef, GridRowSelectionModel, GridRowsProp } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../utils/contexts/AccountContext";
import { Box, TextField } from "@mui/material";
import { FaPlus, FaSave, FaTrashAlt } from "react-icons/fa";
import { useFetchProductsWithTypeName } from "../../utils/hooks/products/Product/useFetchProductsWithTypeName";
import { OrderDetails, ProductDetails, UpdateProductTypeDetails } from "../../../../api/dist/utils/types";
import { ProductTypeContext } from "../../utils/contexts/CategoryContext";
import { useDeleteProductType } from "../../utils/hooks/products/ProductType/useDeleteProductType";
import { toast, ToastContainer } from "react-toastify";
import { useFindProductType } from "../../utils/hooks/products/ProductType/useCheckProductType";
import { useUpdateProductType } from "../../utils/hooks/products/ProductType/useUpdateProductType";
import ProductDetailsTable from "../../components/ProductDetailsTable";
import { ProductInfoForm } from "../../components/ProductInfoForm";
import { useProductAPI } from "../../utils/hooks/products/Product/useProductWithID";
import { MoonLoader } from "react-spinners";
import { Spinner } from "../../components/Spinner";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import "../../../src/css_styles/inv.css";
import "../../../src/css_styles/ProductTypes.css";
import React from "react";
import { useFetchAllOrders } from "../../utils/hooks/orders/useFetchAllOrders";
import { OrderDetailsTable } from "../../components/OrderDetailsTable";

const ProductTypeManager = () => {
    const { account } = useContext(AccountContext);
    const { productType, updateProductType: updateProductTypeContext } = useContext(ProductTypeContext);
    
    const [ products, setProducts] = useState<ProductDetails[]>([]);
    const [ showForm, setShowForm ] = useState<boolean>(false);

    const [ dataChanged, setDataChanged ] = useState<boolean>(false);
    
    let savedName = productType?.name ?? ``;
    const [name, setName] = useState<string>(savedName);
    let savedDescription = productType?.description ?? ``
    const [description, setDescription] = useState<string>(savedDescription);
    let savedThumbnailURL = productType?.thumbnailURL ?? ``;
    const [thumbnailURL, setThumbnailURL] = useState<string>(savedThumbnailURL);

    const navigate = useNavigate();
    const { products: productsDetails, loading: loadingProductDetails, refreshProductsWithTypeName } = useFetchProductsWithTypeName(savedName);

    const {orders, loading: loadingOrders, refreshAllOrders} = useFetchAllOrders();

    useEffect(() => {
        if (!account) {
            navigate("/login");

        } else {
            refreshProductsWithTypeName(productType?.name ?? ``)
            setProducts(productsDetails);
            refreshAllOrders();
        }
    }, [account, navigate]);

    const { deleteProductType } = useDeleteProductType();

    const handleDelete = async () => {
        const deleted = await deleteProductType(savedName);
        console.log(deleted)
        if (!deleted) {
            toast.error(`Failed to delete Product Category ${savedName}`);
            return;
        }
        
        // You may also want to make an API call to delete the category from the server here
        toast.success(`Category deleted: ${savedName}`);
        navigate('/modules/categories')
    };
    
    const { findProductType } = useFindProductType();
    const { updateProductType } = useUpdateProductType()

    const handleUpdateProductType = async () => {
        if (!dataChanged) {
            toast.error(`No changes to save.`);
            return;
        }
        if (name === '') {
            toast.error(`Invalid category name: ${name}`);
            return;
        }
        const exist = await findProductType(name);
        if (exist === undefined) {
            toast.error(`Error, can't find this product category.`);
            return;
        }
        let details: UpdateProductTypeDetails = {
            name: name,
            description: description,
        };
        details.thumbnailURL = thumbnailURL;
        const productType = await updateProductType(savedName, details);
        if (!productType) {
            toast.error(`Failed to update product type with name: ${name}`);
            return;
        }
        updateProductTypeContext(productType);
        setDataChanged(false);
        savedName = productType.name;
        savedDescription = productType.description;
        toast.success(`Category updated: ${name}`);
    };  

    const { findProduct, createProduct, deleteProduct: deleteProductWithProductID } = useProductAPI();

    const handleAddProduct = async (newProduct: ProductDetails): Promise<boolean> => {
        // Make an API call to add the new product
        // You can replace this with your actual API call
        const existingProduct = await findProduct(newProduct.id);
        if (existingProduct) {
            toast.error(`Failed to add the product\n\nProduct with ID ${newProduct.id} already created before.`);
            return false;
        }
        const addedProduct = await createProduct(newProduct);
        
        if (!addedProduct) {
            toast.error('Failed to add the product');
            return false;
        }        
        toast.success('Product added successfully');
        
        // Refresh the product list
        await refreshProductsWithTypeName(productType?.name ?? ``);
        setProducts([...products])
        // setShowForm(false);
        return true;
    };

    const handleDeleteProducts = async (selectedIds: GridRowSelectionModel) => {
        selectedIds.forEach(async (selectedID) => {
            const selectProduct = await findProduct(selectedID.toString());
            if (!selectProduct) {
                toast.error(`Can't find product with ID ${selectedID.toString()}`)
                return;
            }
            
            const productDeleted = await deleteProductWithProductID(selectedID.toString())
            if (!productDeleted) {
                toast.error(`Can't delete product with ID ${selectedID.toString()}`)
                return;  
            } 
            toast.success(`Deleted product with ID ${selectedID.toString()}`)
            // Refresh the product list
            await refreshProductsWithTypeName(productType?.name ?? ``);
            setProducts([...products])
        })
    }

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

    // tabs
    const [value, setValue] = React.useState('details');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
    <div>
        <PageHeader />
        <div className="product-types-page-wrapper">
            <h3>Product Category</h3>
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
                    <Tab value="products" label={`Products (${productsDetails.length})`} />
                    {loadingOrders ? <div></div> : <Tab value="orders" label={`Orders (${orders.filter(order => order.orderProducts.some(orderProduct => orderProduct.product.productType.id === productType?.id)).length})`} />}
                    
                </Tabs>
            </Box>
            {value === `details` && (
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
                            className="item"
                            id="filled-text"
                            label="Name"
                            variant="filled"
                            defaultValue={savedName}
                            required
                            onChange={(event) => {
                                setDataChanged(
                                    savedName !== event.target.value || 
                                    savedDescription !== description ||
                                    savedThumbnailURL !== thumbnailURL
                                )
                                setName(event.target.value)
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
                            className="item"
                            id="filled-textarea"
                            label="Description"
                            placeholder="Enter the description for the Product category"
                            defaultValue={savedDescription}
                            multiline
                            variant="filled"
                            required
                            onChange={(event) => {
                                setDataChanged(savedName !== name || 
                                    savedDescription !== event.target.value ||
                                    savedThumbnailURL !== thumbnailURL
                                )
                                setDescription(event.target.value)
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
                            defaultValue={savedThumbnailURL}
                            // placeholder="Enter the description for the Product category"
                            // multiline
                            variant="filled"
                            // required
                            onChange={(event) => {
                                setDataChanged(
                                    savedName !== name || 
                                    savedDescription !== description || 
                                    savedThumbnailURL !== event.target.value
                                )
                                setThumbnailURL(event.target.value)

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
                    <div style={{
                        display: 'flex',
                        margin: '10px', 
                        gap: '10px'
                    }}>
                        <a className="button is-info" onClick={handleDelete}>
                            <FaTrashAlt />
                            Delete Category
                        </a>
                        <a 
                            className={`button is-green`} 
                            style={{opacity: `${dataChanged ? 1 : 0}`}}
                            onClick={handleUpdateProductType}
                        >
                            <FaSave />
                            Save
                        </a>
                    </div>
                    

                
                </div>
                <div className="column">
                    <div className="product-type-icon">
                        {/* {icon} */}
                        <img src={savedThumbnailURL !== `` ? savedThumbnailURL : `https://www.postcardsrus.com/userfiles/images/paper.jpg`} alt={savedName} />
                    </div>
                </div>
            </Box>)}
            {value === `products` && (
            <React.Fragment>
                {loadingProductDetails ? 
                    <div style={{"display": "flex", "marginTop": "100px"}}>
                        <Spinner children={
                            <MoonLoader color='white'/>
                        }/>
                    </div> 
                :
                    <ProductDetailsTable productDetails={productsDetails} onDelete={handleDeleteProducts} />
                }
                
                <div className="product-type-details-footer">
                    <a className={`button is-green`} style={{ }} onClick={() => setShowForm(!showForm)}>
                        <FaPlus />
                        Create Product
                    </a>

                    <a className="button is-info" onClick={handleDelete}>
                        <FaTrashAlt />
                        Delete Category
                    </a>
                </div>
                {/* Add the form JSX code inside the condition */}
                {showForm && (<ProductInfoForm onAddProduct={handleAddProduct} />)}
            </React.Fragment>)}
            {value === `orders` &&
            <React.Fragment>
            {loadingOrders == true ? 
            <div style={{"display": "flex"}}>
                <Spinner children={
                    <MoonLoader color='white'/>
                }/>
            </div>
            :
            <OrderDetailsTable orderDetails={orders.filter(order => order.orderProducts.some(orderProduct => orderProduct.product.productType.id === productType?.id))} onDelete={handleDeleteOrders}/>
            }
            </React.Fragment>
            
            }
            
            <ToastContainer/>
        </div>
    </div>
    );
};

export default ProductTypeManager;
