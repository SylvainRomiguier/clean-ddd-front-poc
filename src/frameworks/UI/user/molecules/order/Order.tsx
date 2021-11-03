import { OrderPresenterDto } from "../../../../../adapters/OrderDto";

export const Order:React.FC<{order:OrderPresenterDto}> = ({order})=> {
    return (
        <div style={{display: "flex"}}>
            <div>{order.id}</div>
            <div>{order.product.name}</div>
            <div>{order.qty}</div>
        </div>
    );
}