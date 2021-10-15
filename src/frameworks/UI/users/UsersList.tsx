import { UserPresenterDto } from "../../../adapters/UserDto";
import { UserCard } from "../user/User";
import "./UsersList.css";

export interface UsersListProps {
    usersList: UserPresenterDto[];
    selectUser: (user: UserPresenterDto) => void;
    selectedUser?: UserPresenterDto;
}

export const UsersList: React.FC<UsersListProps> = ({
    usersList,
    selectUser,
    selectedUser,
}) => {
    return (
        <div className="usersList">
            {usersList.map((user) => (
                <UserCard
                    selected={
                        selectedUser !== undefined &&
                        selectedUser.id === user.id
                    }
                    key={user.id}
                    user={user}
                    onClick={() => selectUser(user)}
                />
            ))}
        </div>
    );
};
