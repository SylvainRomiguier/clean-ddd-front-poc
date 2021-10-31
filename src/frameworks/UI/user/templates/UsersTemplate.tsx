import { useEffect, useState } from "react";
import { UserPresenterDto, userPresenterDtoFromDomain } from "../../../../adapters/UserDto";
import { services } from "../../../../services/ioc";
import { UserEvent } from "../../../../services/user/userService";
import { UserDetails } from "../molecules/userDetails/UserDetails";
import { UserFormOutput, UserForm } from "../organisms/userForm/UserForm";
import { UserListOfCards } from "../organisms/userListOfCards/UserListOfCards";

export const UsersTemplate:React.FC = () => {
    const [usersList, setUsersList] = useState<UserPresenterDto[]>([]);
    const [selectedUser, setSelectedUser] = useState<
        UserPresenterDto | undefined
    >(undefined);

        const updateUsersList = async (event: UserEvent) => {
        const usersListRead = await services.userService.getAllUsers();
        setUsersList(
            usersListRead.map((user) => userPresenterDtoFromDomain(user))
        );
    };

    const onUserUpdate = async (user: UserFormOutput) => {
        const _user = await services.userService.handleUser(
            "UPDATE_USER",
            updateUsersList
        )(user);
        if (_user.id) setSelectedUser(undefined);
        return _user;
    };

     // example data
    useEffect(() => {
        const addExamples = async () => {
          await services.userService.handleUser(
              "CREATE_USER",
              updateUsersList
          )({
              userName: "SylvainUserName",
              password: "123456",
              firstName: "Sylvain",
              lastName: "Romiguier",
          });
        };
        addExamples();
    }, []);
      // -----------------
    
    return (<div className="userContainer">
    <div style={{ width: "30%" }}>
        {selectedUser ? (
            <>
                <UserForm
                    id={selectedUser.id}
                    userName={selectedUser.userName}
                    firstName={selectedUser.firstName}
                    lastName={selectedUser.lastName}
                    onSubmit={onUserUpdate}
                />
            </>
        ) : (
            <UserForm
                onSubmit={services.userService.handleUser(
                    "CREATE_USER",
                    updateUsersList
                )}
            />
        )}
    </div>
    <div className="containerList">
        {selectedUser ? (
            <UserDetails user={selectedUser}/>
        ) : (
            <UserListOfCards
                selectUser={setSelectedUser}
                selectedUser={selectedUser}
                usersList={usersList}
            />
        )}
    </div>
</div>)
}

