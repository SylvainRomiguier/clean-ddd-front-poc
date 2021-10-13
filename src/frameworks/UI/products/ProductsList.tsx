import { ProductPresenterDto } from "../../../adapters/ProductDto";
import { ProductCard } from "../product/Product";
import "./ProductsList.css";

export interface ProductsListProps {
    productsList: ProductPresenterDto[];
}

export const ProductsList: React.FC<ProductsListProps> = ({ productsList }) => {
    return (
        <div className="usersList">
            {productsList.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
