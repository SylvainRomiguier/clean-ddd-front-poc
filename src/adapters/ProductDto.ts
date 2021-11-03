import { Product } from "../domain/product";

export class ProductControllerDto {
    id?: string;
    name: string;
    qtyInStock: number;

    constructor(_name: string, _qtyInStock: number, _id?: string) {
        this.id = _id;
        this.name = _name;
        this.qtyInStock = _qtyInStock;
    }
    toDomain = () => new Product(this.name, this.qtyInStock, this.id);
}

export class ProductPresenterDto {
    id?: string;
    name: string;
    qtyInStock: number;
    constructor(_name: string, _qtyInStock: number, _id?: string) {
        this.id = _id;
        this.name = _name;
        this.qtyInStock = _qtyInStock;
    }
    toDomain = () => new Product(this.name, this.qtyInStock, this.id);
    toProductControllerDto = () => new ProductControllerDto(this.name, this.qtyInStock, this.id);
}