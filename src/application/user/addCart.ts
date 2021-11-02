import { CartControllerDto } from "../../adapters/CartDto";
import { IUniqueIdGenerator } from "../../adapters/IUniqueIdGenerator";
import { IsErrorUserResult, IUserRepository } from "../../adapters/IUserRepository";
import { OrderControllerDto } from "../../adapters/OrderDto";
import { ProductControllerDto } from "../../adapters/ProductDto";
import { UserControllerDto } from "../../adapters/UserDto";
import { Cart } from "../../domain/user";

export const makeAddCart = (uniqueIdGenerator: IUniqueIdGenerator, repository:IUserRepository) => async (user: UserControllerDto) => {
    var newCart = new Cart(uniqueIdGenerator(), new Date(), []);
    const userUpdated = user.toDomain();
    userUpdated.addCart(newCart);
    const response = await repository.updateUser(
        new UserControllerDto(
            userUpdated.id?.value,
            userUpdated.userName.value,
            userUpdated.password?.value,
            userUpdated.firstName?.value,
            userUpdated.lastName?.value,
            userUpdated.carts.map(
                (cart) =>
                    new CartControllerDto(
                        cart.id?.value,
                        cart.creationDate,
                        cart.orders.map(
                            (order) =>
                                new OrderControllerDto(
                                    new ProductControllerDto(
                                        order.product.name.value,
                                        order.product.qtyInStock.value,
                                        order.product.id?.value
                                    ),
                                    order.qty.value,
                                    order.id?.value
                                )
                        )
                    )
            )
        ) 
    );
    if (!IsErrorUserResult(response)) {
        return response.result;
     }
     throw new Error(response.reason);
}