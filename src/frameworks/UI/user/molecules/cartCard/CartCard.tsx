import { CartPresenterDto } from "../../../../../adapters/CartDto";
import { Card } from "../../../components/atoms/card/Card";

export interface CartCardProps {
    onClick: () => void;
    selected: boolean;
    cart: CartPresenterDto;
}

export const CartCard: React.FC<CartCardProps> = ({
    selected,
    onClick,
    cart,
}) => (
    <Card onClick={onClick} selected={selected}>
        <div>{cart.creationDate}</div>
        <div>{cart.id}</div>
    </Card>
);
