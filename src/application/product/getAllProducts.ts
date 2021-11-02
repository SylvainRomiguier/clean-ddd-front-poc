import {
    IProductRepository,
    IsErrorProductResult,
} from "../../adapters/IProductRepository";

export const makeGetAllProducts =
    (repository: IProductRepository) => async () => {
        const response = await repository.getAllProducts();
        if (!IsErrorProductResult(response)) {
            return response.result;
        }
        throw new Error(response.reason);
    };
