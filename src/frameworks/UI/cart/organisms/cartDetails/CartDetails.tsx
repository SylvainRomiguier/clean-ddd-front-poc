import { useEffect, useState } from "react";
import "./CartDetails.css";
import { CartPresenterDto } from "../../../../../adapters/CartDto";
import { OrderControllerDto } from "../../../../../adapters/OrderDto";
import { ProductPresenterDto } from "../../../../../adapters/ProductDto";
import { Button } from "../../../components/atoms/button/Button";
import { DateFormat } from "../../../components/atoms/dateFormat/DateFormat";
import { Label } from "../../../components/atoms/label/Label";
import { NumberField } from "../../../components/molecules/numberField/NumberField";
import { ProductsDropdown } from "../../../product/molecules/productsDropdown/ProductsDropdown";
import { Order } from "../../../order/molecules/order/Order";
import { OrdersList } from "../../../order/organisms/ordersList/OrdersList";
import { RoundImage } from "../../../components/atoms/image/RoundImage";

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
            setLocalOrder(new OrderControllerDto(selectedProductToOrder.toProductControllerDto(), 0));
    }, [selectedProductToOrder]);
    return (
        <div className="cart-details">
            <Label color="indigo" size={16}>
                Cart : {cart.id}
            </Label>
            <Label color="indigo" size={16}>
                <DateFormat date={cart.creationDate} />
            </Label>
            <div style={{ padding: "10px" }}>
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
            </div>
            {selectedProductToOrder! && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    <RoundImage urlString={selectedProductToOrder.picture ||  "/assets/new-product.jpg"} />
                    <Label size={24} color="teal">
                        {selectedProductToOrder.name}
                    </Label>
                    <div>
                        <NumberField
                            label="Quantity to order"
                            value={localOrder?.qty || 0}
                            onChange={(value) => {
                                setLocalOrder(
                                    new OrderControllerDto(
                                        selectedProductToOrder.toProductControllerDto(),
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
