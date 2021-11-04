import { ProductPresenterDto } from "../../../../../adapters/ProductDto";
import { Card } from "../../../components/atoms/card/Card";
import { Title } from "../../../components/atoms/title/Title";

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
        <div>Quantity in stock : {product.qtyInStock}</div>
    </Card>
);
