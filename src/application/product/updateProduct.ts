import {
    IProductRepository,
    IsErrorProductResult,
} from "../../adapters/IProductRepository";
import { ProductControllerDto } from "../../adapters/ProductDto";

export const makeUpdateProduct =
    (repository: IProductRepository) =>
    async (productController:ProductControllerDto) => {
        const product = productController.toDomain();
        if(!product.id?.value!) throw new Error("Unable to update a product without explicit id");
        const response = await repository.updateProduct(
            new ProductControllerDto(
                product.name.value,
                product.qtyInStock.value,
                product.id?.value
            )
        );
        if (!IsErrorProductResult(response)) {
            return response.result;
        }
        throw new Error(response.reason);
    };
