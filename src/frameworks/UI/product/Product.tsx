import { ProductPresenterDto } from "../../../adapters/ProductDto";
import "./Product.css";

export interface ProductCardProps {
    product: ProductPresenterDto;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="productCard">
            <div>{product.id}</div>
            <div>{product.name}</div>
            <div>stock : {product.qtyInStock}</div>
        </div>
    );
};
