import { UserPresenterDto } from "../../../adapters/UserDto";
import { UserCard } from "../user/User";
import "./UsersList.css";

export interface UsersListProps {
    usersList: UserPresenterDto[];
}

export const UsersList: React.FC<UsersListProps> = ({ usersList }) => {
    return (
        <div className="usersList">
            {usersList.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
};
