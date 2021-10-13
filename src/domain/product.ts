import { UniqueId, Name, Quantity } from "./types";

export interface Product {
    id?: UniqueId;
    name: Name;
    qtyInStock: Quantity;
}

export const makeProduct = (
    name: Name,
    qtyInStock: Quantity,
    id?: UniqueId
): Product => {
    return Object.freeze({
        id,
        name,
        qtyInStock,
    });
};
