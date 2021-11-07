import { OrderPresenterDto } from "../../../../../adapters/OrderDto";

export const Order:React.FC<{order:OrderPresenterDto}> = ({order})=> {
    return (
        <div style={{display: "flex", padding: "5px", border: "1px solid white", borderRadius: "5px", margin: "2px"}}>
            <div style={{margin: "2px"}}>{order.product.name}</div>
            <div style={{margin: "2px"}}>x</div>
            <div style={{margin: "2px"}}>{order.qty}</div>
        </div>
    );
}