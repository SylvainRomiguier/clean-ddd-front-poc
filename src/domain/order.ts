import { Product } from "./product";
import { UniqueId, Quantity } from "./ValueObjects";

export class Order {
    id: UniqueId;
    product: Product;
    qty: Quantity;

    constructor(id?: string, product?: Product, qty?: number) {
        if (!product!)
            throw new Error(
                "Unable to create order without an explicit product"
            );
        if (!qty!) throw new Error("Unable to create order without a quantity");
        this.id = new UniqueId(id);
        this.product = product;
        this.qty = new Quantity(qty);
    }

    isEqualTo(objectToCheck: Order): boolean {
        return objectToCheck.id.isEqualTo(this.id)
    }
}
