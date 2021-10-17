import {
    IsErrorProductResult,
    ProductResult,
} from "../../adapters/IProductRepository";
import { ProductPresenterDto } from "../../adapters/ProductDto";
import { Product } from "../../domain/product";
import { Name, Quantity, UniqueId } from "../../domain/types";
import { ProductFormOutput } from "../../frameworks/UI/product/productForm/ProductForm";
import { createObserver, Listener } from "../observer/Observer";

export interface ProductUseCases {
    addProduct: (name: Name, qtyInStock: Quantity) => Promise<ProductResult>;
    updateProduct: (
        id: UniqueId,
        name: Name,
        qtyInStock: Quantity
    ) => Promise<ProductResult>;
    getAllProducts: () => Promise<Product[]>;
}

export interface ProductService {
    handleProduct: (
        event: ProductEvent,
        listener: Listener<ProductEvent>
    ) => (product: ProductFormOutput) => Promise<ProductPresenterDto>;
    getAllProducts: () => Promise<Product[]>;
}

export type ProductEvent = "CREATE_PRODUCT" | "UPDATE_PRODUCT" | "REMOVE_PRODUCT";

const productObserver = createObserver<ProductEvent>();

export const makeProductService = (productUseCases: ProductUseCases):ProductService => ({
    handleProduct:
        (event: ProductEvent, listener: Listener<ProductEvent>) =>
        async (product: ProductFormOutput): Promise<ProductPresenterDto> => {
            const unsubscribe = productObserver.subscribe(listener);
            let response;
            switch (event) {
                case "CREATE_PRODUCT":
                    response = await productUseCases.addProduct(
                        product.name,
                        product.qtyInStock
                    );
                    break;
                case "UPDATE_PRODUCT":
                    if (!product.id)
                        throw new Error(
                            `Can not update a product without id : ${product.name}`
                        );
                    response = await productUseCases.updateProduct(
                        product.id,
                        product.name,
                        product.qtyInStock
                    );
                    break;
                default:
                    throw new Error(`Unknown product event: ${event}`);
            }
            if (!IsErrorProductResult(response)) {
                productObserver.publish(event);
                unsubscribe();
                return response.result;
            }
            unsubscribe();
            throw new Error(response.reason);
        },
    getAllProducts: productUseCases.getAllProducts,
});
