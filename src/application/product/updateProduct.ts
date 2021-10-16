import { makeProduct } from "../../domain/product";
import { IProductRepository } from "../../adapters/IProductRepository";
import { productControllerDtoFromDomain } from "../../adapters/ProductDto";
import {
    Name,
    UniqueId,
    Quantity
} from "../../domain/types";

export const makeUpdateProduct =
    (repository: IProductRepository) =>
    async (
        id: UniqueId,
        name: Name,
       qtyInStock: Quantity
    ) => {
        if (qtyInStock < 0) throw new Error("Stock can not be below zero.");
        if (name.length < 4)
            throw new Error("name is mandatory and at least 4 characters.");
        return repository.updateProduct(
            productControllerDtoFromDomain(
                makeProduct(name, qtyInStock, id)
            )
        );
    };
