import { IsErrorUserResult, IUserRepository } from "../../adapters/IUserRepository";
import { UserControllerDto } from "../../adapters/UserDto";
import { CartControllerDto } from "../../adapters/CartDto";
import { OrderControllerDto } from "../../adapters/OrderDto";
import { ProductControllerDto } from "../../adapters/ProductDto";

export const makeAddUser =
    (repository: IUserRepository) =>
    async (
        userController: UserControllerDto
    ) => {
        const user = userController.toDomain();
        const response = await repository.createUser(
            new UserControllerDto(
                user.id?.value,
                user.userName.value,
                user.password?.value,
                user.firstName?.value,
                user.lastName?.value,
                user.carts.map(
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
    };
