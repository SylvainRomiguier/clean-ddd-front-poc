import { CartPresenterDto } from "../../../../../adapters/CartDto";
import { Card } from "../../../components/atoms/card/Card";
import { DateFormat } from "../../../components/atoms/dateFormat/DateFormat";
import { Title } from "../../../components/atoms/title/Title";

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
        <Title>Cart</Title>
        <DateFormat date={cart.creationDate} />
        <div>{cart.id}</div>
    </Card>
);
