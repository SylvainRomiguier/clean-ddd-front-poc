import { Product } from "./product";
import {
    UniqueId,
    UserName,
    Password,
    FirstName,
    LastName,
    Quantity,
} from "./types";

export interface User {
    id?: UniqueId;
    userName: UserName;
    password?: Password;
    firstName?: FirstName;
    lastName?: LastName;
    carts?: Cart[];
    addCart: (cart: Cart) => void;
    removeCart: (cart: Cart) => void;
}

export const makeUser = (
    userName: UserName,
    id?: UniqueId,
    password?: Password,
    firstName?: FirstName,
    lastName?: LastName,
    carts?: Cart[]
): User => {
    if (userName.length < 5)
        throw new Error("Username should have at least 5 characters");
    if (password && password.length < 6)
        throw new Error("Password should have at least 6 characters");
    const addCart = (cart: Cart) => {
        if (carts && carts.find((c) => c.id === cart.id) === undefined) {
            carts.push(cart);
        } else {
            throw new Error("This cart has already been added");
        }
    };
    const removeCart = (cart: Cart) => {
        if (carts) {
            carts = carts.filter((c) => c.id !== cart.id);
        } else {
            throw new Error("No carts, unable to remove this cart");
        }
    };

    return Object.freeze({
        id,
        userName,
        password,
        firstName,
        lastName,
        carts,
        addCart,
        removeCart,
    });
};

export interface Order {
    id?: UniqueId;
    product: Product;
    qty: Quantity;
}

export const makeOrder = (
    product: Product,
    qty: Quantity,
    id?: UniqueId
): Order => {
    if (product.qtyInStock - qty < 0) qty = product.qtyInStock;
    return Object.freeze({
        id,
        product,
        qty,
    });
};

export interface Cart {
    id?: UniqueId;
    creationDate?: Date;
    orders?: Order[];
    addOrder: (order: Order) => void;
    updateOrder: (order: Order) => void;
    removeOrder: (order: Order) => void;
}

export const makeCart = (
    id?: UniqueId,
    creationDate?: Date,
    orders?: Order[]
): Cart => {
    const addOrder = (order: Order) => {
        if (orders && orders.find((o) => o.id === order.id) === undefined) {
            orders.push(order);
        } else {
            throw new Error("This order has already been added");
        }
    };
    const updateOrder = (order: Order) => {
        if (orders) {
            const _orders = orders.filter((c) => c.id !== order.id);
            _orders.push(order);
            orders = _orders;
        } else {
            throw new Error("No orders, unable to update this order");
        }
    };
    const removeOrder = (order: Order) => {
        if (orders) {
            orders = orders.filter((c) => c.id !== order.id);
        } else {
            throw new Error("No orders, unable to remove this order");
        }
    };
    return Object.freeze({
        id,
        creationDate,
        orders,
        addOrder,
        updateOrder,
        removeOrder,
    });
};
