import { Product } from "./product";
import {
    UniqueId,
    UserName,
    Password,
    FirstName,
    LastName,
    Quantity,
} from "./ValueObjects";

export class User {
    id?: UniqueId;
    userName: UserName;
    password?: Password;
    firstName?: FirstName;
    lastName?: LastName;
    carts: Cart[];

    constructor(
        userName?: string,
        id?: string,
        password?: string,
        firstName?: string,
        lastName?: string,
        carts?: Cart[]
    ) {
        this.id = new UniqueId(id);
        this.userName = new UserName(userName);
        this.password = new Password(password);
        this.firstName = new FirstName(firstName);
        this.lastName = new LastName(lastName);
        this.carts = carts || [];
    }

    addCart = (cart: Cart) => {
        if (this.carts.find((c) => c.id === cart.id) === undefined) {
            this.carts.push(cart);
        } else {
            throw new Error("This cart has already been added");
        }
    };

    removeCart = (cart: Cart) => {
        this.carts = this.carts.filter((c) => c.id !== cart.id);
    };
}

export class Order {
    id?: UniqueId;
    product: Product;
    qty: Quantity;

    constructor(product: Product, qty: number, id?: string) {
        product.removeQty(qty);
        this.id = new UniqueId(id);
        this.product = product;
        this.qty = new Quantity(qty);
    }
}

export class Cart {
    id?: UniqueId;
    creationDate?: Date;
    orders: Order[] = [];
    constructor(id?: string, creationDate?: Date, orders?: Order[]) {
        this.id = new UniqueId(id);
        this.creationDate = creationDate;
        this.orders = orders || [];
    }

    addOrder = (order: Order) => {
        if (this.orders.find((o) => o.id === order.id) === undefined) {
            this.orders.push(order);
        } else {
            throw new Error("This order has already been added");
        }
    };
    updateOrder = (order: Order) => {
        const _orders = this.orders.filter((c) => c.id !== order.id);
        _orders.push(order);
        this.orders = _orders;
    };
    removeOrder = (order: Order) => {
        this.orders = this.orders.filter((c) => c.id !== order.id);
    };
}
