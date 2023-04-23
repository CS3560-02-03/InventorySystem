import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../src/css_styles/page.css";
import "../../../src/css_styles/dashboard.css";
import "../../../src/css_styles/ProductTypes.css";
import { FaArrowDown, FaBox, FaPlus, FaTrashAlt } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import { AccountContext } from "../../utils/contexts/AccountContext";
import { ProductTypeDetails } from '../../../../api/dist/utils/types';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useFindProductType } from "../../utils/hooks/products/ProductType/useCheckProductType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateProductType } from '../../utils/hooks/products/ProductType/useCreateProductType';
import { useFetchAllProductTypes } from "../../utils/hooks/products/ProductType/useFetchAllTypes";
import { MoonLoader } from "react-spinners";
import { Spinner } from "../../components/Spinner";
import { mockProductTypes } from "../../_mocks_/productTypes";
import { useDeleteProductType } from "../../utils/hooks/products/ProductType/useDeleteProductType";
import { ProductCategories } from "../../components/ProductCategory";
import React from "react";
import { Tabs, Tab } from "@mui/material";
import { useFetchAllOrders } from "../../utils/hooks/orders/useFetchAllOrders";
import { OrderDetailsTable } from "../../components/OrderDetailsTable";
import { GridRowSelectionModel } from "@mui/x-data-grid";

const OrderManagerPage = () => {
    const { account } = useContext(AccountContext);
    const navigate = useNavigate();

    const {orders, loading: loadingOrders, refreshAllOrders} = useFetchAllOrders()

    useEffect(() => {
        if (!account) {
            toast.error(`You need to log in.`)
            navigate("/login");
        } else {
            refreshAllOrders();
        }
    }, [account, navigate]);   

    // tabs
    const [value, setValue] = React.useState('All');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

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
                    <h3>Orders</h3> 
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
                                color: 'white', // Change the color of the selected tab to white
                            },
                        }}
                    >
                        <Tab value="All" label={`All (${orders.length})` }/>
                        <Tab value="Pending" label={`Pending (${orders.filter(order => order.status.toLowerCase() === `pending`).length})`}/>
                        <Tab value="Completed" label={`Completed (${orders.filter(order => order.status.toLowerCase() === `completed`).length})`}/>
                    </Tabs>
                </Box>
                {loadingOrders == true ? 
                <div style={{"display": "flex"}}>
                    <Spinner children={
                        <MoonLoader color='white'/>
                    }/>
                </div>
                :
                <OrderDetailsTable orderDetails={value === `All` ? orders : orders.filter(order => order.status.toLowerCase() === value.toLowerCase()) } onDelete={handleDeleteOrders}/>
                }
            </div>
            <ToastContainer/>
        </div>
    );
};

export default OrderManagerPage;
