import { makeProduct } from "../../domain/product";
import { IProductRepository } from "../../adapters/IProductRepository";
import { productControllerDtoFromDomain } from "../../adapters/ProductDto";
import { Name, Quantity } from "../../domain/types";

export const makeAddProduct =
    (repository: IProductRepository) =>
    async (name: Name, qtyInStock: Quantity) => {
        if (qtyInStock < 0) throw new Error("Stock can not be below zero.");
        if (name.length < 4)
            throw new Error("name is mandatory and at least 4 characters.");
        return repository.createProduct(
            productControllerDtoFromDomain(makeProduct(name, qtyInStock))
        );
    };
