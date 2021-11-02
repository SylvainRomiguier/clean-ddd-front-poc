import { Cart } from "../domain/user";
import { OrderControllerDto, OrderPresenterDto } from "./OrderDto";

export class CartControllerDto {
    id?: string;
    creationDate?: Date;
    orders?: OrderControllerDto[];
    constructor(
        id?: string,
        creationDate?: Date,
        orders?: OrderControllerDto[]
    ) {
        this.id = id;
        this.creationDate = creationDate;
        this.orders = orders;
    }

    toDomain = () =>
        new Cart(
            this.id,
            this.creationDate,
            this.orders?.map((order) => order.toDomain())
        );
}

export class CartPresenterDto {
    id?: string;
    creationDate?: Date;
    orders?: OrderPresenterDto[];
    constructor(
        id?: string,
        creationDate?: Date,
        orders?: OrderPresenterDto[]
    ) {
        this.id = id;
        this.creationDate = creationDate;
        this.orders = orders;
    }

    toDomain = () =>
        new Cart(
            this.id,
            this.creationDate,
            this.orders?.map((order) => order.toDomain())
        );
}
