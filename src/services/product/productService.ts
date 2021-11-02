import {
    ProductControllerDto,
    ProductPresenterDto,
} from "../../adapters/ProductDto";
import { createObserver, Listener } from "../observer/Observer";

export interface ProductUseCases {
    addProduct: (product: ProductControllerDto) => Promise<ProductPresenterDto>;
    updateProduct: (product: ProductControllerDto) => Promise<ProductPresenterDto>;
    getAllProducts: () => Promise<ProductPresenterDto[]>;
}

export interface ProductService extends ProductUseCases {
    subscribe: (listener: Listener<ProductEvent>) => () => void;
}

export type ProductEvent =
    | "CREATE_PRODUCT"
    | "UPDATE_PRODUCT"
    | "REMOVE_PRODUCT";

const productObserver = createObserver<ProductEvent>();

export const makeProductService = (
    productUseCases: ProductUseCases
): ProductService => ({
    addProduct: (product: ProductControllerDto) => {
        const response = productUseCases.addProduct(product);
        productObserver.publish("CREATE_PRODUCT");
        return response;
    },
    updateProduct: (product: ProductControllerDto) => {
        const response = productUseCases.updateProduct(product);
        productObserver.publish("UPDATE_PRODUCT");
        return response;
    },
    getAllProducts: productUseCases.getAllProducts,
    subscribe: (listener: Listener<ProductEvent>) => productObserver.subscribe(listener)
});
