export interface ValueObject {
    value: any;
    validate(_value: any): boolean;
    isEqualTo(_value: any): boolean;
}

export class UserName implements ValueObject {
    value: string = "";
    constructor(value: string = "") {
        if (this.validate(value)) this.value = value;
    }
    validate(value: string): boolean {
        if (value.length === 0) throw new Error("Username is mandatory");
        if (value.length < 5)
            throw new Error("Username should have at least 5 characters");
        return true;
    }
    isEqualTo(value?: string): boolean {
        return value === this.value;
    }
}

export class Password implements ValueObject {
    value: string = "";
    constructor(value: string = "") {
        if (this.validate(value)) this.value = value;
    }
    validate(value: string): boolean {
        if (value.length > 0 && !value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/))
            throw new Error(
                "Password should have at least 6 characters, one lower case, one upper case, one digit."
            );
        return true;
    }
    isEqualTo(value: string = ""): boolean {
        return value === this.value;
    }
}

export class UniqueId implements ValueObject {
    value: string = "";
    constructor(value: string = "") {
        if (this.validate(value)) this.value = value;
    }
    validate(value: string = ""): boolean {
        return true;
    }
    isEqualTo(value: string = ""): boolean {
        return value === this.value;
    }
}

export class FirstName implements ValueObject {
    value: string = "";
    constructor(value: string = "") {
        if (this.validate(value)) this.value = value;
    }
    validate(value: string): boolean {
        return true;
    }
    isEqualTo(_value?: string): boolean {
        return _value === this.value;
    }
}

export class LastName implements ValueObject {
    value: string = "";
    constructor(value: string = "") {
        if (this.validate(value)) this.value = value;
    }
    validate(value: string = ""): boolean {
        return true;
    }
    isEqualTo(value: string = ""): boolean {
        return value === this.value;
    }
}

export class ProductName implements ValueObject {
    value: string = "";
    constructor(value: string = "") {
        if (this.validate(value)) this.value = value;
    }
    validate(value: string = ""): boolean {
        if (!value.match(/^(?=.*[a-zA-Z])[0-9a-zA-Z]{4,}$/))
            throw new Error(
                "Product name should have  at least 4 characters with one letter"
            );
        return true;
    }
    isEqualTo(value: string = ""): boolean {
        return value === this.value;
    }
}

export class Quantity implements ValueObject {
    value: number = 0;
    constructor(value: number = 0) {
        if (this.validate(value)) this.value = value;
    }
    validate(value: number = 0): boolean {
        if (value < 0) throw new Error("Quantity can not be less than zero.");
        return true;
    }
    isEqualTo(value: number = 0): boolean {
        return value === this.value;
    }
}
