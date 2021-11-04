import { UserPresenterDto } from "../../../../../adapters/UserDto";
import { ListOfCards } from "../../../components/atoms/listOfCards/ListOfCards";
import { UserCard } from "../../molecules/userCard/UserCard";

export interface UserListOfCardsProps {
    usersList: UserPresenterDto[];
    onSelectUserId: (userId?: string) => void;
    selectedUser?: UserPresenterDto;
}

export const UserListOfCards: React.FC<UserListOfCardsProps> = ({
    usersList,
    onSelectUserId,
    selectedUser,
}) => (
    <ListOfCards>
        {usersList.map((user) => (
            <UserCard
                key={user.id}
                onClick={() => onSelectUserId(user.id)}
                selected={
                    selectedUser! && selectedUser.id === user.id
                }
                user={user}
            />
        ))}
    </ListOfCards>
);
