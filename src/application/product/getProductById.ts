import {
    IProductRepository,
    IsErrorProductResult,
} from "../../adapters/IProductRepository";

export const makeGetProductById =
    (repository: IProductRepository) => async (id: string) => {
        const response = await repository.getProductById(id);
        if (!IsErrorProductResult(response)) return response.result;
        throw Error(response.reason);
    };
