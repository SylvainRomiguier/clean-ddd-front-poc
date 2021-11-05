import { Cart } from "./cart";
import {
    UniqueId,
    UserName,
    Password,
    FirstName,
    LastName,
} from "./ValueObjects";

export class User {
    id?: UniqueId;
    userName: UserName;
    password?: Password;
    firstName?: FirstName;
    lastName?: LastName;
    carts: Cart[];

    constructor(
        userName?: string,
        id?: string,
        password?: string,
        firstName?: string,
        lastName?: string,
        carts?: Cart[]
    ) {
        this.id = new UniqueId(id);
        this.userName = new UserName(userName);
        this.password = new Password(password);
        this.firstName = new FirstName(firstName);
        this.lastName = new LastName(lastName);
        this.carts = carts || [];
    }

    isEqualTo(objectToCheck: User): boolean {
        return objectToCheck.id?.value === this.id?.value;
    }

    addCart = (cart: Cart) => {
        if (this.carts.find((c) => c.isEqualTo(cart)) === undefined) {
            this.carts.push(cart);
        } else {
            throw new Error("This cart has already been added");
        }
    };

    updateCart = (cart: Cart) => {
        const _carts = this.carts.filter((c) => !c.isEqualTo(cart));
        _carts.push(cart);
        this.carts = _carts;
    };

    removeCart = (cart: Cart) => {
        this.carts = this.carts.filter((c) => !c.isEqualTo(cart));
    };
}
