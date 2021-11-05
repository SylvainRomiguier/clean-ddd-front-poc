import { Order } from "../domain/order";
import {
    ProductControllerDto,
    ProductPresenterDto,
} from "./ProductDto";

export class OrderControllerDto {
    id?: string;
    product: ProductControllerDto;
    qty: number;
    constructor(product: ProductControllerDto, qty: number, id?: string) {
        this.id = id;
        this.product = product;
        this.qty = qty;
    }

    toDomain = () => new Order(this.id, this.product.toDomain(), this.qty);
}

export class OrderPresenterDto {
    id: string;
    product: ProductPresenterDto;
    qty: number;

    constructor(id: string, product: ProductPresenterDto, qty: number) {
        this.id = id;
        this.product = product;
        this.qty = qty;
    }

    toDomain = () => new Order(this.id, this.product.toDomain(), this.qty);

    toOrderControllerDto = () => new OrderControllerDto(this.product.toProductControllerDto(),this.qty, this.id);
}
