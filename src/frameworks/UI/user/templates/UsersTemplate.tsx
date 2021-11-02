import { useEffect, useState } from "react";
import {
    UserControllerDto,
    UserPresenterDto,
} from "../../../../adapters/UserDto";
import { services } from "../../../../services/ioc";
import { UserDetails } from "../molecules/userDetails/UserDetails";
import { UserFormOutput, UserForm } from "../organisms/userForm/UserForm";
import { UserListOfCards } from "../organisms/userListOfCards/UserListOfCards";

export const UsersTemplate: React.FC = () => {
    const [usersList, setUsersList] = useState<UserPresenterDto[]>([]);
    const [selectedUser, setSelectedUser] = useState<
        UserPresenterDto | undefined
    >(undefined);

    const updateUsersList = async () =>
        setUsersList(await services.userService.getAllUsers());

    const onUserAdd = async (user: UserFormOutput) => {
        const unsubscribe = services.userService.subscribe(updateUsersList);
        await services.userService.addUser(
            new UserControllerDto(
                undefined,
                user.userName,
                user.password,
                user.firstName,
                user.lastName
            )
        );
        unsubscribe();
    };

    const onUserUpdate = async (user: UserFormOutput) => {
        const unsubscribe = services.userService.subscribe(updateUsersList);
        const _user = await services.userService.updateUser(
            new UserControllerDto(
                user.id,
                user.userName,
                user.password,
                user.firstName,
                user.lastName
            )
        );
        unsubscribe();
        if (_user.id) setSelectedUser(undefined);
    };

    // example data
    useEffect(() => {
        const unsubscribe =
        services.userService.subscribe(updateUsersList);
        services.userService.addUser(
            new UserControllerDto(
                undefined,
                "SylvainUserName",
                "aA123456",
                "Sylvain",
                "Romiguier"
            )
        );
        unsubscribe();
    }, []);
    // -----------------

    return (
        <div className="userContainer">
            <div style={{ width: "30%" }}>
                <UserForm
                    id={selectedUser?.id}
                    userName={selectedUser?.userName}
                    firstName={selectedUser?.firstName}
                    lastName={selectedUser?.lastName}
                    onSubmit={selectedUser ? onUserUpdate : onUserAdd}
                />
            </div>
            <div className="containerList">
                {selectedUser ? (
                    <UserDetails user={selectedUser} />
                ) : (
                    <UserListOfCards
                        selectUser={setSelectedUser}
                        selectedUser={selectedUser}
                        usersList={usersList}
                    />
                )}
            </div>
        </div>
    );
};
