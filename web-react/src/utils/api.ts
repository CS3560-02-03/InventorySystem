import axios, { AxiosRequestConfig } from 'axios';
import { AccountDetails, ManufacturerDetails, NotificationDetails, OrderDetails, ProductDetails, ProductTypeDetails, UpdateOrderDetails, UpdateProductDetails, UpdateProductTypeDetails } from '../../../api/dist/utils/types';

const CONFIG: AxiosRequestConfig = { withCredentials: true };

const API_URL = 'http://localhost:3001/api'

enum ROUTES {
    ACCOUNT = 'accounts',
    PRODUCT = 'products',
    ORDER = 'orders',
    MANUFACTURER = 'manufacturers',
    NOTIFICATION = 'notifications'
}

enum BASIC_SERVICES {
    FIND = `find`,
    CREATE = `create`,
    DELETE = `delete`,
    UPDATE = `update`
}

// accounts
export const getFindAccount = (username: string) => 
    axios.get<AccountDetails>(`${API_URL}/${ROUTES.ACCOUNT}/${username}/${BASIC_SERVICES.FIND}`, CONFIG)

export const postCreateAccount = (accountDetails: AccountDetails) =>
    axios.post<AccountDetails>(`${API_URL}/${ROUTES.ACCOUNT}/${BASIC_SERVICES.CREATE}`, accountDetails, CONFIG);

// product types
export const getFetchAllProductTypes = () =>
    axios.get<ProductTypeDetails[]>(`${API_URL}/${ROUTES.PRODUCT}/type/all`, CONFIG);

export const getFindProductType = (productTypeName: string) => 
    axios.get<ProductTypeDetails>(`${API_URL}/${ROUTES.PRODUCT}/type/${productTypeName}/${BASIC_SERVICES.FIND}`, CONFIG)

export const getDeleteProductType = (productTypeName: string) => 
    axios.get<{deleted: boolean}>(`${API_URL}/${ROUTES.PRODUCT}/type/${productTypeName}/${BASIC_SERVICES.DELETE}`, CONFIG)

export const postCreateProductType  = (productTypeDetails: ProductTypeDetails) =>
    axios.post<ProductTypeDetails>(`${API_URL}/${ROUTES.PRODUCT}/type/${BASIC_SERVICES.CREATE}`, productTypeDetails, CONFIG);

export const putUpdateProductType = (productTypeName: string, updateDetails: UpdateProductTypeDetails) =>
    axios.put<ProductTypeDetails>(`${API_URL}/${ROUTES.PRODUCT}/type/${productTypeName}/${BASIC_SERVICES.UPDATE}`, updateDetails, CONFIG);
    
export const getFetchProductsWithTypeName = (productTypeName: string) => 
    axios.get<ProductDetails[]>(`${API_URL}/${ROUTES.PRODUCT}/type/${productTypeName}/all`, CONFIG)

// products
export const getFetchAllProducts = () =>
    axios.get<ProductDetails[]>(`${API_URL}/${ROUTES.PRODUCT}/all`, CONFIG)

export const getFindProduct = (productID: string) =>
    axios.get<ProductDetails>(`${API_URL}/${ROUTES.PRODUCT}/${productID}/${BASIC_SERVICES.FIND}`, CONFIG)

export const postCreateProduct = (newProductDetails: ProductDetails) =>
    axios.post<ProductDetails>(`${API_URL}/${ROUTES.PRODUCT}/${BASIC_SERVICES.CREATE}`, newProductDetails, CONFIG);

export const getDeleteProduct = (productID: string) => 
    axios.get<{deleted: boolean}>(`${API_URL}/${ROUTES.PRODUCT}/${productID}/${BASIC_SERVICES.DELETE}`, CONFIG)

export const putUpdateProduct = (productID: string, details: UpdateProductDetails) =>
    axios.put<ProductDetails>(`${API_URL}/${ROUTES.PRODUCT}/${productID}/${BASIC_SERVICES.UPDATE}`, details, CONFIG);
    
// orders
export const getFindOrder = (orderID: string) =>
    axios.get<OrderDetails>(`${API_URL}/${ROUTES.ORDER}/${orderID}/${BASIC_SERVICES.FIND}`, CONFIG);

export const postCreateOrder = (newOrderDetails: OrderDetails) =>
    axios.post<OrderDetails>(`${API_URL}/${ROUTES.ORDER}/${BASIC_SERVICES.CREATE}`, newOrderDetails, CONFIG);

export const getDeleteOrder = (orderID: string) =>
    axios.get<{ deleted: boolean }>(`${API_URL}/${ROUTES.ORDER}/${orderID}/${BASIC_SERVICES.DELETE}`, CONFIG);

export const putUpdateOrder = (orderID: string, details: UpdateOrderDetails) =>
    axios.put<OrderDetails>(`${API_URL}/${ROUTES.ORDER}/${orderID}/${BASIC_SERVICES.UPDATE}`, details, CONFIG);

export const getFetchAllOrders = () =>
    axios.get<OrderDetails[]>(`${API_URL}/${ROUTES.ORDER}/all`, CONFIG);

// manufacturers
export const postCreateDummyManufacturers = () =>
    axios.post<{ message: string }>(
        `${API_URL}/${ROUTES.MANUFACTURER}/create/dummies`,
        CONFIG
    );

export const getFetchAllManufacturers = () =>
    axios.get<ManufacturerDetails[]>(
        `${API_URL}/${ROUTES.MANUFACTURER}/all`,
        CONFIG
    );

// notifications
export const getFetchAllNotifications = () =>
    axios.get<NotificationDetails[]>(`${API_URL}/${ROUTES.NOTIFICATION}/all`, CONFIG);

export const postCreateNotification = (newNotificationDetails: NotificationDetails) =>
    axios.post<NotificationDetails>(`${API_URL}/${ROUTES.NOTIFICATION}/${BASIC_SERVICES.CREATE}`, newNotificationDetails, CONFIG);

export const getFetchNewNotifications = () =>
    axios.get<NotificationDetails[]>(`${API_URL}/${ROUTES.NOTIFICATION}/new`, CONFIG);

export const putMarkNotified = (notificationId: number) =>
    axios.put<{ success: boolean }>(`${API_URL}/${ROUTES.NOTIFICATION}/${notificationId}/mark-notified`, CONFIG);