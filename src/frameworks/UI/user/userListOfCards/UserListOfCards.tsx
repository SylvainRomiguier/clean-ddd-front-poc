import { UserPresenterDto } from "../../../../adapters/UserDto";
import { ListOfCards } from "../../listOfCards/ListOfCards";
import { UserCard } from "../userCard/UserCard";

export interface UserListOfCardsProps {
    usersList: UserPresenterDto[];
    selectUser: (user: UserPresenterDto) => void;
    selectedUser: UserPresenterDto | undefined;
}

export const UserListOfCards: React.FC<UserListOfCardsProps> = ({
    usersList,
    selectUser,
    selectedUser,
}) => (
    <ListOfCards>
        {usersList.map((user) => (
            <UserCard
                onClick={() => selectUser(user)}
                selected={selectedUser && selectedUser.id === user.id ? true : false}
                user={user}
            />
        ))}
    </ListOfCards>
);
