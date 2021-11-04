import { CartControllerDto } from "../../adapters/CartDto";
import {
    IProductRepository,
    IsErrorProductResult,
} from "../../adapters/IProductRepository";
import { IUniqueIdGenerator } from "../../adapters/IUniqueIdGenerator";
import {
    IUserRepository,
    IsErrorUserResult,
} from "../../adapters/IUserRepository";
import { OrderControllerDto } from "../../adapters/OrderDto";
import {
    ProductControllerDto,
    ProductPresenterDto,
} from "../../adapters/ProductDto";
import { UserControllerDto, UserPresenterDto } from "../../adapters/UserDto";
import { Order } from "../../domain/user";

export const makeAddOrderToCart =
    (
        uniqueIdGenerator: IUniqueIdGenerator,
        userRepository: IUserRepository,
        productRepository: IProductRepository,
        getProductById: (id: string) => Promise<ProductPresenterDto>,
        getUserById: (id: string) => Promise<UserPresenterDto>
    ) =>
    async (
        userId: string,
        cartId: string,
        productId: string,
        quantity: number
    ) => {
        const user = (await getUserById(userId)).toDomain();

        const product = (await getProductById(productId)).toDomain();
        // remove quantity from stock
        product.removeQty(quantity);
        let productResponse = await productRepository.updateProduct(
            new ProductControllerDto(
                product.name.value,
                product.qtyInStock.value,
                product.id?.value
            )
        );
        if (IsErrorProductResult(productResponse))
            throw new Error(productResponse.reason);

        // create order, find the right cart and add new order to it
        // then update user
        const cart = user.carts.find((cart) => cart.id?.isEqualTo(cartId));
        if (!cart!)
            throw new Error(`This cart does not exist : id = ${cartId}`);
        const existingProductOrder = cart.orders?.find(
            (order) => order.product.id?.isEqualTo(product.id?.value)
        );
        if (existingProductOrder) {
            const updatedOrder = new Order(
                product,
                quantity + existingProductOrder.qty.value,
                existingProductOrder.id?.value
            );
            cart.updateOrder(updatedOrder);
        } else {
            const newOrder = new Order(product, quantity, uniqueIdGenerator());
            cart.addOrder(newOrder);
        }
        user.updateCart(cart);

        const response = await userRepository.updateUser(
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
        // reapply quantity to stock if order can not be saved
        product.addQty(quantity);
        productResponse = await productRepository.updateProduct(
            new ProductControllerDto(
                product.name.value,
                product.qtyInStock.value,
                product.id?.value
            )
        );
        if (IsErrorProductResult(productResponse))
            throw new Error(
                `Order error : ${response.reason}, unable to reapply quantity ${quantity} to product ${product.id}: ${product.name}, reason : ${productResponse.reason}`
            );
        throw new Error(response.reason);
    };
