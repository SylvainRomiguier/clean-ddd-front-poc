import { UserPresenterDto } from "../../../../../adapters/UserDto";
import { Card } from "../../../components/atoms/card/Card";
import { Title } from "../../../components/atoms/title/Title";

export interface UserCardProps {
    onClick: () => void;
    selected: boolean;
    user: UserPresenterDto;
}

export const UserCard: React.FC<UserCardProps> = ({
    selected,
    onClick,
    user,
}) => (
    <Card onClick={onClick} selected={selected}>
        <Title>User</Title>
        <div>{user.id}</div>
        <div>{user.userName}</div>
        <div>{user.firstName && user.firstName}</div>
        <div>{user.lastName && user.lastName}</div>
        <div>Carts count : {user.carts?.length || 0}</div>
    </Card>
);
