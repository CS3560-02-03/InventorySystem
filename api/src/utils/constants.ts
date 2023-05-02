export enum ROUTES {
    ACCOUNT = 'accounts',
    PRODUCT = 'products',
    ORDER = 'orders',
    MANUFACTURER = 'manufacturers',
    NOTIFICATION = 'notifications'
}
  
export enum SERVICES {
    ACCOUNT = 'ACCOUNT_SERVICE',
    PRODUCT = 'PRODUCT_SERVICE',
    ORDER = 'ORDER_SERVICE',
    MANUFACTURER = 'MANUFACTURER_SERVICE',
    NOTIFICATION = 'NOTIFICATION_SERVICE',
}

export enum BASIC_SERVICE_ACTIONS {
    FIND = `find`,
    CREATE = `create`,
    DELETE = `delete`,
    UPDATE = `update`
}

export enum SecurityLevel {
    EMPLOYEE = 'employee',
    MANAGER = 'manager',
}