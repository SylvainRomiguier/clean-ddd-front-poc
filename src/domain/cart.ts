import { Order } from "./order";
import { UniqueId } from "./ValueObjects";

export class Cart {
    id: UniqueId;
    creationDate: Date;
    orders: Order[];

    constructor(id?: string, creationDate?: Date, orders?: Order[]) {
        this.id = new UniqueId(id);
        this.creationDate = creationDate || new Date();
        this.orders = orders || [];
    }

    isEqualTo(objectToCheck: Cart): boolean {
        return objectToCheck.id.value === this.id.value;
    }

    addOrder = (order: Order) => {
        if (this.orders.find((o) => o.isEqualTo(order)) === undefined) {
            this.orders.push(order);
        } else {
            throw new Error("This order has already been added");
        }
    };
    updateOrder = (order: Order) => {
        const _orders = this.orders.filter((o) => !o.isEqualTo(order));
        _orders.push(order);
        this.orders = _orders;
    };
    removeOrder = (order: Order) => {
        this.orders = this.orders.filter((o) => !o.isEqualTo(order));
    };
}
