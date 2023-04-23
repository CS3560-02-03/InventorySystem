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

const InventoryManagerPage = () => {
    const { account } = useContext(AccountContext);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState<boolean>(false);
    
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [thumbnailURL, setThumbnailURL] = useState<string>("");

    const { productTypes, loading: loadingProdTypes, error: errProdTypes, refreshProductTypes } = useFetchAllProductTypes();
    const [categories, setCategories] = useState<ProductTypeDetails[]>([]);

    const { findProductType } = useFindProductType();
    const { createProductType } = useCreateProductType();

    useEffect(() => {
        if (!account) {
            toast.error(`You need to log in.`)
            navigate("/login");
        } else {
            setCategories(productTypes);
        }
    }, [account, navigate]);

    const handleAddCategory = async () => {
        if (name === '') {
            console.log(`Invalid category name: ${name}`);
            toast.error(`Invalid category name: ${name}`);
            return;
        }
        const exist = await findProductType(name);

        if (exist === undefined) {
            toast.error(`Error`);
            return;
        }

        if (exist) {
            toast.error(`Category already exists: ${name}`);
            return;
        }

        let details: ProductTypeDetails = {
            name: name,
            description: description,
        }

        if (thumbnailURL !== ``) {
            details.thumbnailURL = thumbnailURL;
        }
        const productType = await createProductType(details);
        if (!productType) {
            toast.error(`Failed to create product type with name: ${name}`);
            return;
        }
        console.log(productType)
        setShowForm(false);
        setName("");
        setDescription("");
        setThumbnailURL("");
        toast.success(`Category created: ${name}`);
        // update the list of categories
        setCategories([...categories, productType]);
        refreshProductTypes();
    };    

    return (
        <div>
            <PageHeader />
            <div className="product-types-page-wrapper">
                <div className="product-types-header">
                    <h3>Product Categories {productTypes.length === 0 && ` (Mock Data)`}</h3> 
                    <a className="button is-green" onClick={() => setShowForm(!showForm)}>
                        {showForm ? (<FaArrowDown />) : (<FaPlus />)}
                        New Category
                    </a>
                </div>
                {showForm && (
                    <Box
                        className="product-type-details-form"
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%'},
                        }}
                        noValidate
                        autoComplete="off"
                    > 
                        <div className="column name-field">
                            <TextField
                                className="item"
                                id="filled-text"
                                label="Name"
                                variant="filled"
                                required
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
                        </div>
                        <div className="column description-field">
                            <TextField
                                className="item"
                                id="filled-textarea"
                                label="Description"
                                placeholder="Enter the description for the Product category"
                                multiline
                                variant="filled"
                                required
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
                        <div className="column name-field">
                            <TextField
                                className="item"
                                id="filled-textarea"
                                label="Thumbnail"
                                // placeholder="Enter the description for the Product category"
                                multiline
                                variant="filled"
                                required
                                onChange={(event) => setThumbnailURL(event.target.value)}
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
                            className="button is-green" 
                            style={{margin: '10px'}}
                            onClick={handleAddCategory}>
                            <FaPlus />
                            Add
                        </a>
                    </Box>
                    
                )}
                <div className="product-types-container">
                    {
                    loadingProdTypes ?
                        <div style={{"display": "flex", "marginTop": "100px"}}>
                            <Spinner children={
                                <MoonLoader color='white'/>
                            }/>
                        </div> 
                    :
                        (productTypes.length > 0 ? productTypes : mockProductTypes).map((category) => (
                            <ProductCategories
                                key={category.name}
                                icon={<FaBox />}
                                productTypeDetails={category}
                            />
                        ))
                    }
                </div>  
            </div>
            <ToastContainer/>
        </div>
    );
};

export default InventoryManagerPage;
