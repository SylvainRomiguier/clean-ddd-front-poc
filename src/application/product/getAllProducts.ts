import {
    IProductRepository,
    IsErrorProductResult,
} from "../../adapters/IProductRepository";
import { productPresenterDtoToDomain } from "../../adapters/ProductDto";
import { Product } from "../../domain/product";

export const makeGetAllProducts =
    (repository: IProductRepository) => async () => {
        const response = await repository.getAllProducts();
        if (!IsErrorProductResult(response))
            return response.result.map((repositoryProduct) =>
                productPresenterDtoToDomain(repositoryProduct)
            );
        return [] as Product[];
    };
