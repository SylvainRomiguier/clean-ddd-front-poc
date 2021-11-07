import { ProductPresenterDto } from "../../../../../adapters/ProductDto";
import { Card } from "../../../components/atoms/card/Card";
import { RoundImage } from "../../../components/atoms/image/RoundImage";
import { Label } from "../../../components/atoms/label/Label";
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
        <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{marginRight: "10px"}}>
               <RoundImage urlString={product.picture || "/assets/new-product.jpg"} />
            </div>
            <div>
                <Title>Product</Title>
                <div>{product.id}</div>
                <Label color="coral" size={16}>{product.name}</Label>
                <div
                    className={
                        product.qtyInStock > 0
                            ? " quantity-in-stock quantity-in-stock-ok"
                            : "quantity-in-stock quantity-in-stock-ko"
                    }
                >
                    Quantity in stock : {product.qtyInStock}
                </div>
            </div>
        </div>
    </Card>
);
