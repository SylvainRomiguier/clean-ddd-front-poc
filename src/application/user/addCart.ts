import { CartControllerDto } from "../../adapters/CartDto";
import { IUniqueIdGenerator } from "../../adapters/IUniqueIdGenerator";
import { IsErrorUserResult, IUserRepository } from "../../adapters/IUserRepository";
import { OrderControllerDto } from "../../adapters/OrderDto";
import { ProductControllerDto } from "../../adapters/ProductDto";
import { UserControllerDto, UserPresenterDto } from "../../adapters/UserDto";
import { Cart } from "../../domain/user";

export const makeAddCart = (uniqueIdGenerator: IUniqueIdGenerator, repository:IUserRepository, getUserById: (id:string) => Promise<UserPresenterDto>) => async (userId:string) => {
    const user = (await getUserById(userId)).toDomain();
    const newCart = new Cart(uniqueIdGenerator(), new Date(), []);
    user.addCart(newCart);
    const response = await repository.updateUser(
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
}