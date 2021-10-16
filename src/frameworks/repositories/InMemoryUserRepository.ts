import {
    IUserRepository,
    UserResult,
    UsersResult,
} from "../../adapters/IUserRepository";
import { IUniqueIdGenerator } from "../../adapters/IUniqueIdGenerator";
import {
    makeUserPresenterDto,
    UserControllerDto,
    UserPresenterDto,
} from "../../adapters/UserDto";
import { UniqueId } from "../../domain/types";

const users: Record<UniqueId, UserControllerDto> = {};

const inMemoryUsersToUsersPresenterDto = (
    _users: Record<UniqueId, UserControllerDto>
) => {
    const usersPresenterDto: UserPresenterDto[] = [];
    for (const id in _users) {
        const _user = makeUserPresenterDto(
            id,
            users[id].userName,
            users[id].firstName,
            users[id].lastName,
            users[id].carts
        );
        usersPresenterDto.push(_user);
    }
    return usersPresenterDto;
};

export const makeInMemoryUserRepository = (
    uniqueIdGenerator: IUniqueIdGenerator
): IUserRepository => ({
    createUser: (user: UserControllerDto) => {
        const id = uniqueIdGenerator();
        users[id] = user;
        const _user = makeUserPresenterDto(
            id,
            user.userName,
            user.firstName,
            user.lastName,
            user.carts
        );
        return new Promise<UserResult>((resolve) => resolve({ result: _user }));
    },
    updateUser: (user: UserControllerDto) => {
        if (!user.id) throw new Error(`Repository : user id is undefined !`);
        users[user.id] = user;
        const _user = makeUserPresenterDto(
            user.id,
            user.userName,
            user.firstName,
            user.lastName,
            user.carts
        );
        return new Promise<UserResult>((resolve) => resolve({ result: _user }));
    },
    deleteUser: (user: UserControllerDto) => {
        throw Error("Not implemented");
    },
    getUserById: (id: UniqueId) => {
        return new Promise<UserResult>((resolve) => {
            if (users[id]) {
                const _user: UserPresenterDto = Object.freeze({
                    ...users[id],
                    id,
                });
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
