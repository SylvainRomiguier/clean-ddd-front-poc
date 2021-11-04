import { ProductPresenterDto } from "../../../../adapters/ProductDto";
import {
    ProductForm,
    ProductFormOutput,
} from "../organisms/productForm/ProductForm";
import { ProductListOfCards } from "../organisms/productListOfCards/ProductListOfCards";

interface ProductsTemplateProps {
    selectedProduct?: ProductPresenterDto;
    onProductAdd: (product: ProductFormOutput) => void;
    onProductUpdate: (product: ProductFormOutput) => void;
    onSelectProductId: (productId?: string) => void;
    productsList: ProductPresenterDto[];
}

export const ProductsTemplate: React.FC<ProductsTemplateProps> = ({
    productsList,
    selectedProduct,
    onProductAdd,
    onProductUpdate,
    onSelectProductId,
}) => (
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
                onSelectProductId={onSelectProductId}
                selectedProduct={selectedProduct}
                productsList={productsList}
            />
        </div>
    </div>
);
