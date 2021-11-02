import { UniqueId, ProductName, Quantity } from "./ValueObjects";

export class Product {
    id?: UniqueId;
    name: ProductName;
    qtyInStock: Quantity;

    constructor(name: string, qtyInStock: number, id?: string) {
        this.id = new UniqueId(id);
        this.name = new ProductName(name);
        this.qtyInStock = new Quantity(qtyInStock);
    }

    addQty = (qty: number) =>
        (this.qtyInStock = new Quantity(this.qtyInStock.value || 0 + qty));

    removeQty = (qty: number) =>
        (this.qtyInStock = new Quantity(this.qtyInStock.value || 0 - qty));
}
