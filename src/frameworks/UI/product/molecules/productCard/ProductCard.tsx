import { ProductPresenterDto } from "../../../../../adapters/ProductDto";
import { Card } from "../../../components/atoms/card/Card";
import { Title } from "../../../components/atoms/title/Title";
import "./ProductCard.css";

export interface ProductCardProps {
    onClick: () => void;
    selected: boolean;
    product: ProductPresenterDto;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    selected,
    onClick,
    product,
}) => (
    <Card onClick={onClick} selected={selected} color="teal">
        <Title>Product</Title>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div className={product.qtyInStock > 0 ? " quantity-in-stock quantity-in-stock-ok" :  "quantity-in-stock quantity-in-stock-ko"}>Quantity in stock : {product.qtyInStock}</div>
    </Card>
);
