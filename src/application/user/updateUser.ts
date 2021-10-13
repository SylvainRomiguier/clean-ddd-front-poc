import { makeUser } from "../../domain/user";
import { IUserRepository } from "../../adapters/IUserRepository";
import { userControllerDtoFromDomain } from "../../adapters/UserDto";
import {
    FirstName,
    LastName,
    Password,
    UniqueId,
    UserName,
} from "../../domain/types";
import { Cart } from "../../domain/user";

export const makeUpdateUser =
    (repository: IUserRepository) =>
    async (
        id: UniqueId,
        userName: UserName,
        password?: Password,
        firstName?: FirstName,
        lastName?: LastName,
        carts?: Cart[]
    ) => {
        if (userName.length < 1) throw new Error("UserName is mandatory.");
        if (password && password.length < 1)
            throw new Error("Password is mandatory.");
        return repository.updateUser(
            userControllerDtoFromDomain(
                makeUser(userName, id, password, firstName, lastName, carts)
            )
        );
    };
