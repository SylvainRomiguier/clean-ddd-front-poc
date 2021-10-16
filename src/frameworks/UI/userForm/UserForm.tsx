import { useEffect, useState } from "react";
import { UserPresenterDto } from "../../../adapters/UserDto";
import { Button } from "../button/Button";
import "./UserForm.css";

export interface UserFormOutput {
    id?: string;
    userName: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface UserFormInput {
    id?: string;
    userName?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    onSubmit: (user: UserFormOutput) => Promise<UserPresenterDto>;
}

const userFormInputToUserFormOutput = (
    userFormInput: UserFormInput
): UserFormOutput =>
    Object.freeze({
        id: userFormInput.id,
        userName: userFormInput.userName || "",
        password: userFormInput.password || "",
        firstName: userFormInput.firstName,
        lastName: userFormInput.lastName,
    });

export const UserForm: React.FC<UserFormInput> = ({
    id,
    userName,
    firstName,
    lastName,
    onSubmit,
}) => {
    const [userInput, setUserInput] = useState<UserFormInput>({
        id,
        userName,
        firstName,
        lastName,
    } as UserFormInput);

    useEffect(() => {
        setUserInput({ id, userName, firstName, lastName } as UserFormInput);
    }, [id, userName, firstName, lastName]);

    const [error, setError] = useState<string | null>(null);

    const onChange = (userFormInput: UserFormInput) => {
        setUserInput(userFormInput);
    };

    const submit = async () => {
        try {
            setError(null);
            await onSubmit(userFormInputToUserFormOutput(userInput));
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError(e as string);
            }
        }
    };

    return (
        <div className="userForm">
            {userInput.id && <label>ID : {userInput.id}</label>}
            <label htmlFor="username" className="label">
                user name
            </label>
            <input
                type="text"
                name="username"
                className="input"
                value={userInput.userName || ""}
                onChange={(e) =>
                    onChange({ ...userInput, userName: e.target.value })
                }
            />
            <label htmlFor="password" className="label">
                password
            </label>
            <input
                type="password"
                name="password"
                className="input"
                value={userInput.password || ""}
                onChange={(e) =>
                    onChange({ ...userInput, password: e.target.value })
                }
            />
            <label htmlFor="firstname" className="label">
                first name
            </label>
            <input
                type="text"
                name="firstname"
                className="input"
                value={userInput.firstName || ""}
                onChange={(e) =>
                    onChange({ ...userInput, firstName: e.target.value })
                }
            />
            <label htmlFor="lastname" className="label">
                last name
            </label>
            <input
                type="text"
                name="lastname"
                className="input"
                value={userInput.lastName || ""}
                onChange={(e) =>
                    onChange({ ...userInput, lastName: e.target.value })
                }
            />
            <Button onClick={submit}>
        
                {userInput.id ? "Modifier" : "Ajouter"}
          </Button>
            {error && <div>{error}</div>}
        </div>
    );
};
