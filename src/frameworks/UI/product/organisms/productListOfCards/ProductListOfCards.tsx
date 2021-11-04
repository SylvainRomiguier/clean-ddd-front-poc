import { ProductPresenterDto } from "../../../../../adapters/ProductDto";
import { ListOfCards } from "../../../components/atoms/listOfCards/ListOfCards";
import { ProductCard } from "../../molecules/productCard/ProductCard";

export interface ProductListOfCardsProps {
    productsList: ProductPresenterDto[];
    onSelectProductId: (productId?: string) => void;
    selectedProduct: ProductPresenterDto | undefined;
}

export const ProductListOfCards: React.FC<ProductListOfCardsProps> = ({
    productsList,
    onSelectProductId,
    selectedProduct,
}) => (
    <ListOfCards>
        {productsList.map((product) => (
            <ProductCard
                key={product.id}
                onClick={() => onSelectProductId(product.id)}
                selected={
                    selectedProduct! && selectedProduct.id === product.id
                }
                product={product}
            />
        ))}
    </ListOfCards>
);
