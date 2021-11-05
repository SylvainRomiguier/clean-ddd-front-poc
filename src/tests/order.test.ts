import { Order } from "../domain/order";
import { Product } from "../domain/product";

describe("test Order", () => {
    const product = new Product("produit A", 25, "12345");
    const order = new Order("12345", product, 10);
    it("test equality between 2 domain orders", async () => {
        const otherOrder = new Order("12345", product, 54);
        return expect(order.isEqualTo(otherOrder)).toBe(true);
    });
    it("test inequality between 2 domain orders", async () => {
        const otherOrder = new Order("12346", product, 54);
        return expect(order.isEqualTo(otherOrder)).toBe(false);
    });
});
