import {
    IProductRepository,
    ProductResult,
    ProductsResult,
} from "../../adapters/IProductRepository";
import { IUniqueIdGenerator } from "../../adapters/IUniqueIdGenerator";
import {
    ProductControllerDto,
    ProductPresenterDto,
} from "../../adapters/ProductDto";

let products: Record<string, ProductControllerDto> = {};

const inMemoryProductsToProductsPresenterDto = (
    _products: Record<string, ProductControllerDto>
) => {
    const productsPresenterDto: ProductPresenterDto[] = [];
    for (const id in _products) {
        const _product = new ProductPresenterDto(
            _products[id].name,
            _products[id].qtyInStock,
            id,
            _products[id].picture
        );
        productsPresenterDto.push(_product);
    }
    return productsPresenterDto;
};

export const makeInMemoryProductRepository = (
    uniqueIdGenerator: IUniqueIdGenerator
): IProductRepository => ({
    createProduct: (product: ProductControllerDto) => {
        const id = uniqueIdGenerator();
        product.id = id;
        products[id] = product;
        const _product = new ProductPresenterDto(
            product.name,
            product.qtyInStock,
            id,
            product.picture
        );
        return new Promise<ProductResult>((resolve) =>
            resolve({ result: _product })
        );
    },
    updateProduct: (product: ProductControllerDto) => {
        if (!product.id)
            throw new Error(`Repository : product id is undefined !`);
        products[product.id] = new ProductControllerDto(
            product.name,
            product.qtyInStock,
            product.id,
            products[product.id].picture
        );
        const _product = products[product.id].toProductPresenterDto();
        return new Promise<ProductResult>((resolve) =>
            resolve({ result: _product })
        );
    },
    deleteProduct: (product: ProductControllerDto) => {
        throw Error("Not implemented");
    },
    getProductById: (id: string) => {
        return new Promise<ProductResult>((resolve) => {
            if (products[id]) {
                const _product = new ProductPresenterDto(
                    products[id].name,
                    products[id].qtyInStock,
                    id,
                    products[id].picture
                );
                resolve({ result: _product });
            } else resolve({ reason: `Unknown product with id ${id}` });
        });
    },
    getAllProducts: () => {
        return new Promise<ProductsResult>((resolve) =>
            resolve({
                result: inMemoryProductsToProductsPresenterDto(products),
            })
        );
    },
    removeAllProducts: () => {
        return new Promise<void>((resolve) => {
            products = {};
            return resolve();
        });
    },
});
