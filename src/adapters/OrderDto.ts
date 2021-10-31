import { Order, makeOrder } from "../domain/user";
import { Product } from "../domain/product";
import { Quantity, UniqueId } from "../domain/types";
import {
    productControllerDtoFromDomain,
    productControllerDtoToDomain,
    productPresenterDtoFromDomain,
    productPresenterDtoToDomain,
} from "./ProductDto";

export interface OrderControllerDto {
    id?: UniqueId;
    product: Product;
    qty: Quantity;
}

export interface OrderPresenterDto {
    id?: UniqueId;
    product: Product;
    qty: Quantity;
}

export const orderControllerDtoFromDomain = (
    order: Order
): OrderControllerDto =>
    Object.freeze({
        id: order.id,
        qty: order.qty,
        product: productControllerDtoFromDomain(order.product),
    });

export const orderPresenterDtoFromDomain = (order: Order): OrderPresenterDto =>
    Object.freeze({
        id: order.id,
        qty: order.qty,
        product: productPresenterDtoFromDomain(order.product),
    });

export const orderPresenterDtoToDomain = (order: OrderPresenterDto): Order =>
    makeOrder(productPresenterDtoToDomain(order.product), order.qty, order.id);

    export const orderControllerDtoToDomain = (order: OrderControllerDto): Order =>
    makeOrder(productControllerDtoToDomain(order.product), order.qty, order.id);
