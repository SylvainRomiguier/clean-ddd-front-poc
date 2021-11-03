import { CartPresenterDto } from "../../../../../adapters/CartDto";
import { ProductPresenterDto } from "../../../../../adapters/ProductDto";
import { DateFormat } from "../../../components/atoms/dateFormat/DateFormat";
import { Title } from "../../../components/atoms/title/Title";
import { NumberField } from "../../../components/molecules/numberField/NumberField";
import { Order } from "../../molecules/order/Order";
import { ProductsDropdown } from "../../molecules/productsDropdown/ProductsDropdown";
import { OrdersList } from "../ordersList/OrdersList";

interface CartDetailsProps {
    cart: CartPresenterDto;
    productsList: ProductPresenterDto[];
    onSelectProductToOrder: (product: ProductPresenterDto) => void;
    selectedProductToOrder?: ProductPresenterDto;
}

export const CartDetails: React.FC<CartDetailsProps> = ({
    cart,
    productsList,
    onSelectProductToOrder,
    selectedProductToOrder,
}) => (
    <div>
        <Title>Cart : {cart.id}</Title>
        <DateFormat date={cart.creationDate} />
        <ProductsDropdown>
            {productsList.map((product) => (
                <div
                    key={product.id}
                    onClick={() => onSelectProductToOrder(product)}
                    style={{ cursor: "pointer" }}
                >
                    {product.name}
                </div>
            ))}
        </ProductsDropdown>
        {selectedProductToOrder! && (
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: 4 }}>{selectedProductToOrder.name}</div>
                <div style={{ flex: 1 }}>
                    <NumberField
                        label="Quantity to order"
                        value={0}
                        onChange={() => {}}
                    />
                </div>
            </div>
        )}
        <OrdersList>
            {cart.orders?.map((order) => (
                <Order key={order.id} order={order} />
            ))}
        </OrdersList>
    </div>
);
