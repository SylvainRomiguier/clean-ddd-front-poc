import { UniqueId } from "../domain/types";
import { ProductControllerDto, ProductPresenterDto } from "./ProductDto";

interface ErrorResult {
    reason: string;
}

interface SuccessResult<T> {
    result: T;
}

export type ProductResult = SuccessResult<ProductPresenterDto> | ErrorResult;
export type ProductsResult = SuccessResult<ProductPresenterDto[]> | ErrorResult;

export type ProductRepositoryResult = ProductResult | ProductsResult;

export const IsErrorProductResult = (
    response: ProductRepositoryResult
): response is ErrorResult => {
    return (response as ErrorResult).reason !== undefined;
};

export interface IProductRepository {
    createProduct: (user: ProductControllerDto) => Promise<ProductResult>;
    updateProduct: (user: ProductControllerDto) => Promise<ProductResult>;
    deleteProduct: (
        user: ProductControllerDto
    ) => Promise<ErrorResult | SuccessResult<boolean>>;
    getProductById: (id: UniqueId) => Promise<ProductResult>;
    getAllProducts: () => Promise<ProductsResult>;
}
