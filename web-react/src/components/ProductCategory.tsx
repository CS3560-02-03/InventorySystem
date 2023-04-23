import { hover } from "@testing-library/user-event/dist/hover";
import { useContext, useState } from "react";
import { ProductTypeContext } from "../utils/contexts/CategoryContext";
import { ProductTypeDetails } from "../../../api/dist/utils/types";
import { FaBoxes, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type Props = {
    icon: any,
    productTypeDetails: ProductTypeDetails,
}
export const ProductCategories = ({icon, productTypeDetails}: Props) => {
    const navigate = useNavigate();
    const { updateProductType } = useContext(ProductTypeContext);

    const handleProductsClick = () => {
        updateProductType(productTypeDetails);
        navigate('/modules/products');
    };

    const handleEditClick = () => {
        updateProductType(productTypeDetails);
        navigate('/modules/category/edit');
    };
    
    return (
        <div className="product-type">  
            <div className="product-type-icon">
                {/* {icon} */}
                <img src={productTypeDetails.thumbnailURL || `https://www.postcardsrus.com/userfiles/images/paper.jpg`} alt={productTypeDetails.name} />
            </div>
            <div className="product-type-name">
                {productTypeDetails.name}
            </div>
            <div className="product-type-actions">
                <div className="action" onClick={handleProductsClick}>
                    <FaBoxes/> Products
                </div>
                <div className="action" onClick={handleEditClick}>
                    <FaEdit/> Edit
                </div>
            </div>
        </div>
    )
};