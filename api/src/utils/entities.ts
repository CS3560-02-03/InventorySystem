import { Account } from "./typeorm/entities/Account";
import { Manufacturer } from "./typeorm/entities/Manufacturer/Manufacturer";
import { CustomNotification } from "./typeorm/entities/Notifications/Notification";
import { Order } from "./typeorm/entities/Orders/Order";
import { OrderProduct } from "./typeorm/entities/Orders/OrderProduct";
import { Product } from "./typeorm/entities/Product/Product";
import { ProductType } from "./typeorm/entities/Product/ProductType";

export const entities = [   
    Account,
    Product,
    ProductType,
    Order,
    OrderProduct,
    Manufacturer,
    CustomNotification
];
