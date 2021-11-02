import {
    IProductRepository,
} from "../../adapters/IProductRepository";

export const makeRemoveAllProducts = (repository: IProductRepository) => async () => await repository.removeAllProducts();