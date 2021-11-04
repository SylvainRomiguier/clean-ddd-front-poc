import { useEffect, useState } from "react";
import { CartPresenterDto } from "../../../../../adapters/CartDto";
import { OrderControllerDto } from "../../../../../adapters/OrderDto";
import { ProductPresenterDto } from "../../../../../adapters/ProductDto";
import { Button } from "../../../components/atoms/button/Button";
import { DateFormat } from "../../../components/atoms/dateFormat/DateFormat";
import { Title } from "../../../components/atoms/title/Title";
import { NumberField } from "../../../components/molecules/numberField/NumberField";
import { Order } from "../../molecules/order/Order";
import { ProductsDropdown } from "../../molecules/productsDropdown/ProductsDropdown";
import { OrdersList } from "../ordersList/OrdersList";

interface CartDetailsProps {
    cart: CartPresenterDto;
    productsList: ProductPresenterDto[];
    onSelectProductToOrderId: (productId?: string) => void;
    selectedProductToOrder?: ProductPresenterDto;
    onAddOrder: (order: OrderControllerDto) => void;
}

export const CartDetails: React.FC<CartDetailsProps> = ({
    cart,
    productsList,
    onSelectProductToOrderId,
    selectedProductToOrder,
    onAddOrder,
}) => {
    const [localOrder, setLocalOrder] = useState<
        OrderControllerDto | undefined
    >(undefined);
    useEffect(() => {
        if (selectedProductToOrder)
            setLocalOrder(new OrderControllerDto(selectedProductToOrder, 0));
    }, [selectedProductToOrder]);
    return (
        <div>
            <Title>Cart : {cart.id}</Title>
            <DateFormat date={cart.creationDate} />
            <ProductsDropdown>
                {productsList.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => onSelectProductToOrderId(product.id)}
                        style={{ cursor: "pointer" }}
                    >
                        {product.name}
                    </div>
                ))}
            </ProductsDropdown>
            {selectedProductToOrder! && (
                <div style={{ display: "flex", justifyContent: "space-evenly" ,alignItems: "center" }}>
                    <div>{selectedProductToOrder.name}</div>
                    <div>
                        <NumberField
                            label="Quantity to order"
                            value={localOrder?.qty || 0}
                            onChange={(value) => {
                                setLocalOrder(
                                    new OrderControllerDto(
                                        selectedProductToOrder,
                                        value
                                    )
                                );
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            onClick={() => {
                                if (localOrder!) onAddOrder(localOrder);
                            }}
                        >
                            +
                        </Button>
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
};
