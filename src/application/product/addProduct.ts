import {
    IProductRepository,
    IsErrorProductResult,
} from "../../adapters/IProductRepository";
import { ProductControllerDto } from "../../adapters/ProductDto";

export const makeAddProduct =
    (repository: IProductRepository) =>
    async (productController: ProductControllerDto) => {
        const product = productController.toDomain();
        const response = await repository.createProduct(
            new ProductControllerDto(
                product.name.value,
                product.qtyInStock.value,
                undefined,
                product.picture.value
            )
        );
        if (!IsErrorProductResult(response)) {
            return response.result;
        }
        throw new Error(response.reason);
    };
