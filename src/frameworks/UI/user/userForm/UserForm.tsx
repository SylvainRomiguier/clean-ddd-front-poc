import { useEffect, useState } from "react";
import { UserPresenterDto } from "../../../../adapters/UserDto";
import { Button } from "../../components/button/Button";
import { TextField } from "../../components/textField/TextField";
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
        <div className="form">
            {userInput.id && <label>ID : {userInput.id}</label>}
            <TextField label="User name" value={userInput.userName} onChange={(userName) =>setUserInput({ ...userInput, userName })} />
            <TextField label="Password" value={userInput.password} onChange={(password) =>setUserInput({ ...userInput, password })} password />
            <TextField label="First name" value={userInput.firstName} onChange={(firstName) =>setUserInput({ ...userInput, firstName })} />
            <TextField label="Last name" value={userInput.lastName} onChange={(lastName) =>setUserInput({ ...userInput, lastName })} />
            <Button onClick={submit}> 
                {userInput.id ? "Modifier" : "Ajouter"}
          </Button>
            {error && <div>{error}</div>}
        </div>
    );
};
