import { useState, useEffect } from "react";
import {
    ProductPresenterDto,
    productPresenterDtoFromDomain,
} from "../../../../adapters/ProductDto";
import { services } from "../../../../services/ioc";
import { ProductEvent } from "../../../../services/product/productService";
import { ProductFormOutput, ProductForm } from "../organisms/productForm/ProductForm";
import { ProductListOfCards } from "../organisms/productListOfCards/ProductListOfCards";

export const ProductsTemplate: React.FC = () => {
    const [productsList, setProductsList] = useState<ProductPresenterDto[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<
        ProductPresenterDto | undefined
    >(undefined);

    const updateProductsList = async (event: ProductEvent) => {
        const productsListRead = await services.productService.getAllProducts();
        setProductsList(
            productsListRead.map((product) =>
                productPresenterDtoFromDomain(product)
            )
        );
    };

    const onProductUpdate = async (product: ProductFormOutput) => {
        const _product = await services.productService.handleProduct(
            "UPDATE_PRODUCT",
            updateProductsList
        )(product);
        if (_product.id) setSelectedProduct(undefined);
        return _product;
    };

    // example data
    useEffect(() => {
        const addExamples = async () => {
            await services.productService.handleProduct(
                "CREATE_PRODUCT",
                updateProductsList
            )({
                name: "Apple",
                qtyInStock: 10,
            });
            await services.productService.handleProduct(
                "CREATE_PRODUCT",
                updateProductsList
            )({
                name: "Pear",
                qtyInStock: 15,
            });
            await services.productService.handleProduct(
                "CREATE_PRODUCT",
                updateProductsList
            )({
                name: "Cherry",
                qtyInStock: 5,
            });
        };
        addExamples();
    }, []);

    // -----------------
    return (
        <div className="productContainer">
            <div style={{ width: "30%" }}>
                {selectedProduct ? (
                    <>
                        <ProductForm
                            id={selectedProduct.id}
                            name={selectedProduct.name}
                            qtyInStock={selectedProduct.qtyInStock}
                            onSubmit={onProductUpdate}
                        />
                    </>
                ) : (
                    <ProductForm
                        onSubmit={services.productService.handleProduct(
                            "CREATE_PRODUCT",
                            updateProductsList
                        )}
                    />
                )}
            </div>
            <div className="containerList">
                <ProductListOfCards
                    selectProduct={setSelectedProduct}
                    selectedProduct={selectedProduct}
                    productsList={productsList}
                />
            </div>
        </div>
    );
};
