import { Order } from "../domain/user";
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

    toDomain = () => new Order(this.product.toDomain(), this.qty, this.id);
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

    toDomain = () => new Order(this.product.toDomain(), this.qty, this.id);

    toOrderControllerDto = () => new OrderControllerDto(this.product.toProductControllerDto(),this.qty, this.id);
}
