import {
    IUserRepository,
    UserResult,
    UsersResult,
} from "../../adapters/IUserRepository";
import { IUniqueIdGenerator } from "../../adapters/IUniqueIdGenerator";
import { UserControllerDto, UserPresenterDto } from "../../adapters/UserDto";
import { CartPresenterDto } from "../../adapters/CartDto";
import { OrderPresenterDto } from "../../adapters/OrderDto";
import { ProductPresenterDto } from "../../adapters/ProductDto";

const users: Record<string, UserControllerDto> = {};

const userControllerDtoToUserPresenterDto = (
    user: UserControllerDto
) =>
    new UserPresenterDto(
        user.id || "User id error in repository",
        user.userName || "User name error in repository",
        user.firstName,
        user.lastName,
        user.carts?.map(
            (cart) =>
                new CartPresenterDto(
                    cart.id,
                    cart.creationDate,
                    cart.orders?.map(
                        (order) =>
                            new OrderPresenterDto(
                                order.id || "Order id error in repository",
                                new ProductPresenterDto(
                                    order.product.name,
                                    order.product.qtyInStock,
                                    order.product.id
                                ),
                                order.qty
                            )
                    )
                )
        )
    );

const inMemoryUsersToUsersPresenterDto = (
    _users: Record<string, UserControllerDto>
) => {
    const usersPresenterDto: UserPresenterDto[] = [];
    for (const id in _users) {
        const _user = userControllerDtoToUserPresenterDto(_users[id]);
        usersPresenterDto.push(_user);
    }
    return usersPresenterDto;
};

export const makeInMemoryUserRepository = (
    uniqueIdGenerator: IUniqueIdGenerator
): IUserRepository => ({
    createUser: (user: UserControllerDto) => {
        const id = uniqueIdGenerator();
        user.id = id;
        users[id] = user;
        const _user = userControllerDtoToUserPresenterDto(users[id]);
        return new Promise<UserResult>((resolve) => resolve({ result: _user }));
    },
    updateUser: (user: UserControllerDto) => {
        if (!user.id) throw new Error(`Repository : user id is undefined !`);
        users[user.id] = user;
        const _user = userControllerDtoToUserPresenterDto(users[user.id]);
        return new Promise<UserResult>((resolve) => resolve({ result: _user }));
    },
    deleteUser: (user: UserControllerDto) => {
        throw Error("Not implemented");
    },
    getUserById: (id: string) => {
        return new Promise<UserResult>((resolve) => {
            if (users[id]) {
                const _user = userControllerDtoToUserPresenterDto(users[id]);
                resolve({ result: _user });
            } else resolve({ reason: `Unknown user with id ${id}` });
        });
    },
    getAllUsers: () => {
        return new Promise<UsersResult>((resolve) =>
            resolve({
                result: inMemoryUsersToUsersPresenterDto(users),
            })
        );
    },
});
