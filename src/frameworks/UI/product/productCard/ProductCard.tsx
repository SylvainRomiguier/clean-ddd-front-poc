import { ProductPresenterDto } from "../../../../adapters/ProductDto";
import { Card } from "../../components/card/Card";

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
    <Card onClick={onClick} selected={selected}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>Quantity in stock : {product.qtyInStock}</div>
    </Card>
);
