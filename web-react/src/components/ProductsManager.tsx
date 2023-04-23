import { Container, Grid, Box, List, ListItem, ButtonBase, ListItemText, IconButton, ListItemButton, ListItemIcon, Avatar, ListItemAvatar, Typography } from "@mui/material";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AccountContext } from "../utils/contexts/AccountContext";
import { useFindProductType } from "../utils/hooks/products/ProductType/useCheckProductType";
import { useFetchAllProductTypes } from "../utils/hooks/products/ProductType/useFetchAllTypes";
import { useFetchAllProducts } from "../utils/hooks/products/Product/useFetchAllProducts";
import { ProductTypeDetails, ProductDetails } from "../../../api/dist/utils/types";
import { useProductAPI } from "../utils/hooks/products/Product/useProductWithID";

export const ProductsManager: React.FC = () => {
    const { account } = useContext(AccountContext);
    const navigate = useNavigate();

    const { productTypes, refreshProductTypes } = useFetchAllProductTypes();
    const [categories, setCategories] = useState<ProductTypeDetails[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState('All')

    const [ products, setProducts] = useState<ProductDetails[]>([]);
    const { products: allProducts, refreshAllProducts} = useFetchAllProducts();

    const { findProductType } = useFindProductType();

    useEffect(() => {
        if (!account) {
            toast.error(`You need to log in.`)
            navigate("/login");
        } else {
            setCategories(productTypes);
            refreshAllProducts();
            setProducts(allProducts);
        }
    }, [account, navigate]);

    const filteredProducts = allProducts.filter((product) => {
        // console.log(product.productType);
        return selectedCategory === 'All' ? true : product.productType.name === selectedCategory
        return true;
    });    

    const { findProduct, createProduct, deleteProduct: deleteProductWithProductID } = useProductAPI();

    const handleClick = (productID: string) => {
        navigate(`/modules/products/edit/${productID}`);
    };
    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} md={3} >
                    <Box 
                        sx={{ 
                            width: '100%', 
                            maxWidth: 360, 
                            bgcolor: 'grey',
                        }}
                        // sx={{ bgcolor: 'grey'}}
                        style={{
                            borderRadius: '4px',
                           
                        }}
                    >
                        <List>
                        {productTypes.map((category) => (
                            <ListItem
                                key={category.name}
                                // selected={selectedCategory === category.name}
                                onClick={() => setSelectedCategory(category.name)}
                                disableGutters
                                disablePadding
                                sx={{
                                    padding: 0,
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        width: '100%',
                                        textAlign: 'left',
                                        py: 1,
                                        px: 2,
                                        borderRadius: 0,
                                    }}
                                >
                                    <ListItemText primary={category.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        </List>
                    </Box>
                </Grid>
                <Grid 
                    item xs={12} sm={8} md={9} 
                    style={{
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        alignContent: 'flex-start',
                        gap: '10px'
                    }}
                >
                    {filteredProducts.concat().map(product => (
                    <ListItem 
                        alignItems="flex-start" 
                        sx={{
                            width: '31%',
                            backgroundColor: 'grey',
                            borderRadius: '4px',
                            transition: 'all 0.3s ease-in-out',
                            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                backgroundColor: 'lightgrey', // change the background color on hover
                                cursor: 'pointer',
                                transform: 'translateY(-0.2rem)'
                            },
                        }}
                        onClick={()=> handleClick(product.id)}
                    >
                        <ListItemAvatar>
                            <Avatar src={product.productType.thumbnailURL} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={product.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                    Color: {product.color}, Size: {product.size}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    ))}
                </Grid>
            </Grid>
        </Container>  
    );
}