import { ProductPresenterDto } from "../../../../adapters/ProductDto";
import { ListOfCards } from "../../components/listOfCards/ListOfCards";
import { ProductCard } from "../productCard/ProductCard";

export interface ProductListOfCardsProps {
    productsList: ProductPresenterDto[];
    selectProduct: (product: ProductPresenterDto) => void;
    selectedProduct: ProductPresenterDto | undefined;
}

export const ProductListOfCards: React.FC<ProductListOfCardsProps> = ({
    productsList,
    selectProduct,
    selectedProduct,
}) => (
    <ListOfCards>
        {productsList.map((product) => (
            <ProductCard
                key={product.id}
                onClick={() => selectProduct(product)}
                selected={
                    selectedProduct && selectedProduct.id === product.id
                        ? true
                        : false
                }
                product={product}
            />
        ))}
    </ListOfCards>
);
