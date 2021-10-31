import { IUniqueIdGenerator } from "../../adapters/IUniqueIdGenerator";
import { IUserRepository, UserResult } from "../../adapters/IUserRepository";
import { userControllerDtoFromDomain } from "../../adapters/UserDto";
import { makeCart, makeUser, User } from "../../domain/user";

export const makeAddCart = (uniqueIdGenerator: IUniqueIdGenerator, repository:IUserRepository) => (user: User):Promise<UserResult> =>  {
    var newCart = makeCart(uniqueIdGenerator(), new Date(), []);
    user.addCart(newCart);
    return repository.updateUser(
        userControllerDtoFromDomain(
            makeUser(user.userName, user.id, user.password, user.firstName, user.lastName, user.carts)
        )
    );
}