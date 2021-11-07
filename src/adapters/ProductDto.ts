import { Product } from "../domain/product";

export class ProductControllerDto {
    id?: string;
    name: string;
    qtyInStock: number;
    picture?: string;

    constructor(_name: string, _qtyInStock: number, _id?: string, _picture?:string) {
        this.id = _id;
        this.name = _name;
        this.qtyInStock = _qtyInStock;
        this.picture = _picture;
    }
    toDomain = () => new Product(this.name, this.qtyInStock, this.id, this.picture);
    toProductPresenterDto = () => new ProductPresenterDto(this.name, this.qtyInStock, this.id, this.picture);
}

export class ProductPresenterDto {
    id?: string;
    name: string;
    qtyInStock: number;
    picture?: string;
    constructor(_name: string, _qtyInStock: number, _id?: string, _picture?: string) {
        this.id = _id;
        this.name = _name;
        this.qtyInStock = _qtyInStock;
        this.picture = _picture;
    }
    toDomain = () => new Product(this.name, this.qtyInStock, this.id, this.picture);
    toProductControllerDto = () => new ProductControllerDto(this.name, this.qtyInStock, this.id, this.picture);
}