import { Cart, makeCart } from "../domain/user";
import { Order } from "../domain/user";
import { UniqueId } from "../domain/types";
import {
    orderControllerDtoFromDomain,
    orderControllerDtoToDomain,
    orderPresenterDtoFromDomain,
    orderPresenterDtoToDomain,
} from "./OrderDto";

export interface CartControllerDto {
    id?: UniqueId;
    creationDate?: Date;
    orders?: Order[];
}

export interface CartPresenterDto {
    id?: UniqueId;
    creationDate?: Date;
    orders?: Order[];
}

export const cartControllerDtoFromDomain = (cart: Cart): CartControllerDto =>
    Object.freeze({
        id: cart.id,
        creationDate: cart.creationDate,
        orders: cart.orders?.map((order) =>
            orderControllerDtoFromDomain(order)
        ),
    });

export const cartPresenterDtoFromDomain = (cart: Cart): CartPresenterDto =>
    Object.freeze({
        id: cart.id,
        creationDate: cart.creationDate,
        orders: cart.orders?.map((order) => orderPresenterDtoFromDomain(order)),
    });

export const cartPresenterDtoToDomain = (cart: CartPresenterDto): Cart =>
    makeCart(
        cart.id,
        cart.creationDate,
        cart.orders?.map((order) => orderPresenterDtoToDomain(order))
    );

    export const cartControllerDtoToDomain = (cart: CartControllerDto): Cart =>
    makeCart(
        cart.id,
        cart.creationDate,
        cart.orders?.map((order) => orderControllerDtoToDomain(order))
    );
