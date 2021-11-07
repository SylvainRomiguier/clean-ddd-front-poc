import { CartControllerDto } from "../../adapters/CartDto";
import { IUniqueIdGenerator } from "../../adapters/IUniqueIdGenerator";
import { OrderControllerDto } from "../../adapters/OrderDto";
import {
    ProductControllerDto,
    ProductPresenterDto,
} from "../../adapters/ProductDto";
import { UserControllerDto, UserPresenterDto } from "../../adapters/UserDto";
import { Order } from "../../domain/order";

export const makeAddOrder =
    (
        uniqueIdGenerator: IUniqueIdGenerator,
        getProductById: (id: string) => Promise<ProductPresenterDto>,
        getUserById: (id: string) => Promise<UserPresenterDto>,
        updateProduct: (
            product: ProductControllerDto
        ) => Promise<ProductPresenterDto>,
        updateUser: (user: UserControllerDto) => Promise<UserPresenterDto>
    ) =>
    async (
        userId: string,
        cartId: string,
        productId: string,
        quantity: number
    ) => {
        const user = (await getUserById(userId)).toDomain();
        const cart = user.carts.find((c) => c.id.value === cartId);
        const product = (await getProductById(productId)).toDomain();
        product.removeQty(quantity);
        await updateProduct(
            new ProductControllerDto(
                product.name.value,
                product.qtyInStock.value,
                product.id?.value,
                product.picture?.value
            )
        );

        // create order, find the right cart and add new order to it
        // then update user
        if (!cart!)
            throw new Error(`This cart does not exist : id = ${cartId}`);
        const existingProductOrder = cart.orders?.find((order) =>
            order.product.isEqualTo(product)
        );
        if (existingProductOrder) {
            const updatedOrder = new Order(
                existingProductOrder.id?.value,
                product,
                quantity + existingProductOrder.qty.value
            );
            cart.updateOrder(updatedOrder);
        } else {
            const newOrder = new Order(uniqueIdGenerator(), product, quantity);
            cart.addOrder(newOrder);
        }
        user.updateCart(cart);

        try {
            const updatedUser = await updateUser(
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
            return updatedUser;
        } catch (e) {
            // reapply quantity to stock if order can not be saved
            product.addQty(quantity);
            await updateProduct(
                new ProductControllerDto(
                    product.name.value,
                    product.qtyInStock.value,
                    product.id?.value,
                    product.picture?.value
                )
            );
            throw e;
        }
    };
