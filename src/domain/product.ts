import { UniqueId, ProductName, Quantity, URLString } from "./ValueObjects";

export class Product {
    id?: UniqueId;
    name: ProductName;
    qtyInStock: Quantity;
    picture: URLString;

    constructor(name: string, qtyInStock: number, id?: string, picture?: string) {
        this.id = new UniqueId(id);
        this.name = new ProductName(name);
        this.qtyInStock = new Quantity(qtyInStock);
        this.picture = new URLString(picture);
    }

    isEqualTo(objectToCheck: Product): boolean {
        return objectToCheck.id?.value === this.id?.value;
    }

    addQty = (qty: number) =>
        (this.qtyInStock = new Quantity((this.qtyInStock.value || 0) + qty));

    removeQty = (qty: number) =>
        (this.qtyInStock = new Quantity((this.qtyInStock.value || 0) - qty));
}
