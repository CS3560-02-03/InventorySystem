import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../src/css_styles/page.css";
import "../../../src/css_styles/dashboard.css";
import "../../../src/css_styles/ProductTypes.css";
import PageHeader from "../../components/PageHeader";
import { AccountContext } from "../../utils/contexts/AccountContext";
import { ProductTypeDetails } from '../../../../api/dist/utils/types';
import { useFindProductType } from "../../utils/hooks/products/ProductType/useCheckProductType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateProductType } from '../../utils/hooks/products/ProductType/useCreateProductType';
import { useFetchAllProductTypes } from "../../utils/hooks/products/ProductType/useFetchAllTypes";
import { ProductsManager } from "../../components/ProductsManager";

const ProductsManagerPage = () => {
    return (
        <div>
            <PageHeader />
            <div className="product-types-page-wrapper">
                <ProductsManager />
            </div>
            <ToastContainer/>
        </div>
    );
};

export default ProductsManagerPage;
