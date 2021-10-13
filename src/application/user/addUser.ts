import { makeUser } from "../../domain/user";
import { IUserRepository } from "../../adapters/IUserRepository";
import { userControllerDtoFromDomain } from "../../adapters/UserDto";
import { FirstName, LastName, Password, UserName } from "../../domain/types";

export const makeAddUser =
    (repository: IUserRepository) =>
    async (
        userName: UserName,
        password: Password,
        firstName?: FirstName,
        lastName?: LastName
    ) => {
        if (userName.length < 1) throw new Error("UserName is mandatory.");
        if (password.length < 1) throw new Error("Password is mandatory.");
        return repository.createUser(
            userControllerDtoFromDomain(
                makeUser(userName, undefined, password, firstName, lastName)
            )
        );
    };
