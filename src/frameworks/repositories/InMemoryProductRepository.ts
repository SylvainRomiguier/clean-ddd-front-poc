import {
    IProductRepository,
    ProductResult,
    ProductsResult,
} from "../../adapters/IProductRepository";
import { IUniqueIdGenerator } from "../../adapters/IUniqueIdGenerator";
import {
    makeProductPresenterDto,
    ProductControllerDto,
    ProductPresenterDto,
} from "../../adapters/ProductDto";
import { UniqueId } from "../../domain/types";

const products: Record<UniqueId, ProductControllerDto> = {};

const inMemoryProductsToProductsPresenterDto = (
    _products: Record<UniqueId, ProductControllerDto>
) => {
    const productsPresenterDto: ProductPresenterDto[] = [];
    for (const id in _products) {
        const _product = makeProductPresenterDto(
            id,
            _products[id].name,
            _products[id].qtyInStock
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
        products[id] = product;
        const _product = makeProductPresenterDto(
            id,
            product.name,
            product.qtyInStock
        );
        return new Promise<ProductResult>((resolve) =>
            resolve({ result: _product })
        );
    },
    updateProduct: (product: ProductControllerDto) => {
        if (!product.id) throw new Error(`Repository : product id is undefined !`);
        products[product.id] = product;
        const _product = makeProductPresenterDto(
            product.id,
            product.name,
            product.qtyInStock
        );
        return new Promise<ProductResult>((resolve) => resolve({ result: _product }));
    },
    deleteProduct: (product: ProductControllerDto) => {
        throw Error("Not implemented");
    },
    getProductById: (id: UniqueId) => {
        return new Promise<ProductResult>((resolve) => {
            if (products[id]) {
                const _product = makeProductPresenterDto(
                    id,
                    products[id].name,
                    products[id].qtyInStock
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
});
