import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LogIn';
import SignupPage from './pages/SignUp';
import HomePage from './pages/Home';
import { AccountContext } from './utils/contexts/AccountContext';
import DashboardPage from './pages/Dashboard';
import InventoryManagerPage from './pages/modules/Categories';
import ProductTypeManager from './pages/modules/ProductTypeManager';
import { ProductTypeContext } from './utils/contexts/CategoryContext';
import { AccountDetails, ProductTypeDetails } from '../../api/dist/utils/types';
import ProductsPage from './pages/modules/Products';
import EditProductInfoPage from './pages/modules/EditProduct';
import OrderManagerPage from './pages/modules/Orders';
import AboutPage from './pages/About';

function App() {
  const [account, setAccount] = useState<AccountDetails>();
  const updateAccount = (account: AccountDetails | undefined) => setAccount(account);
  const [ productType , setProductType] = useState<ProductTypeDetails>();
  const updateProductType = (productTypeDetails: ProductTypeDetails | undefined) => setProductType(productTypeDetails)
  // const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AccountContext.Provider value={{ account, updateAccount }}>
      <ProductTypeContext.Provider value={{productType, updateProductType}}>
        <Routes>
          <Route path="/"  element={<HomePage />}/>
          <Route path="/login"  element={<LoginPage />}/>
          <Route path="/signup"  element={<SignupPage />}/>
          <Route path="/about"  element={<AboutPage />}/>
          <Route path="/dashboard"  element={<DashboardPage />}/>
          <Route path="/modules/categories/"  element={<InventoryManagerPage />}/>
          <Route path="/modules/products/"  element={<ProductsPage />}/>
          <Route path="/modules/orders/"  element={<OrderManagerPage />}/>
          <Route path="/modules/category/edit"  element={<ProductTypeManager />}/>
          <Route path="/modules/products/edit/:productId" element={<EditProductInfoPage />} />
        </Routes>
      </ProductTypeContext.Provider>
    </AccountContext.Provider>
  );
}

export default App;
