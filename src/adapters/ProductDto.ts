import { Product, makeProduct } from "../domain/product";
import { Quantity, UniqueId, Name } from "../domain/types";

export interface ProductControllerDto {
    id?: UniqueId;
    name: Name;
    qtyInStock: Quantity;
}

export interface ProductPresenterDto {
    id?: UniqueId;
    name: Name;
    qtyInStock: Quantity;
}

export const makeProductPresenterDto = (
    id: UniqueId,
    name: Name,
    qtyInStock: Quantity
) =>
    Object.freeze({
        id,
        name,
        qtyInStock,
    });

export const productControllerDtoFromDomain = (
    product: Product
): ProductControllerDto =>
    Object.freeze({
        id: product.id,
        qtyInStock: product.qtyInStock,
        name: product.name,
    });

export const productPresenterDtoFromDomain = (
    product: Product
): ProductPresenterDto =>
    Object.freeze({
        id: product.id,
        qtyInStock: product.qtyInStock,
        name: product.name,
    });

export const productPresenterDtoToDomain = (
    product: ProductPresenterDto
): Product => makeProduct(product.name, product.qtyInStock, product.id);
