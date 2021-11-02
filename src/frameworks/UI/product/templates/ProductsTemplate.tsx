import { useState, useEffect } from "react";
import {
    ProductControllerDto,
    ProductPresenterDto,
} from "../../../../adapters/ProductDto";
import { services } from "../../../../services/ioc";
import {
    ProductFormOutput,
    ProductForm,
} from "../organisms/productForm/ProductForm";
import { ProductListOfCards } from "../organisms/productListOfCards/ProductListOfCards";

export const ProductsTemplate: React.FC = () => {
    const [productsList, setProductsList] = useState<ProductPresenterDto[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<
        ProductPresenterDto | undefined
    >(undefined);

    const updateProductsList = async () =>
        setProductsList(await services.productService.getAllProducts());

    const onProductAdd = (product: ProductFormOutput) => {
        const unsubscribe =
            services.productService.subscribe(updateProductsList);
        services.productService.addProduct(
            new ProductControllerDto(
                product.name,
                product.qtyInStock,
                undefined
            )
        );
        unsubscribe();
    };

    const onProductUpdate = async (product: ProductFormOutput) => {
        const unsubscribe =
            services.productService.subscribe(updateProductsList);
        const _product = await services.productService.updateProduct(
            new ProductControllerDto(
                product.name,
                product.qtyInStock,
                product.id
            )
        );
        if (_product.id) setSelectedProduct(undefined);
        unsubscribe();
    };

    // example data
    useEffect(() => {
        const unsubscribe =
            services.productService.subscribe(updateProductsList);
        services.productService.addProduct(
            new ProductControllerDto("Apple", 10)
        );
        services.productService.addProduct(
            new ProductControllerDto("Pear", 15)
        );
        services.productService.addProduct(
            new ProductControllerDto("Cherry", 10)
        );
        unsubscribe();
    }, []);

    // -----------------
    return (
        <div className="productContainer">
            <div style={{ width: "30%" }}>
                <ProductForm
                    id={selectedProduct?.id}
                    name={selectedProduct?.name}
                    qtyInStock={selectedProduct?.qtyInStock}
                    onSubmit={selectedProduct ? onProductUpdate : onProductAdd}
                />
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
