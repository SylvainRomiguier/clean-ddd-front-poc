import { UserPresenterDto } from "../../../../../adapters/UserDto";
import { Card } from "../../../components/atoms/card/Card";
import { Label } from "../../../components/atoms/label/Label";
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
        <Label color="teal" size={16}>{user.userName}</Label>
        <div>{user.firstName && user.firstName} {user.lastName && user.lastName}</div>
        <div style={{marginTop: "10px"}}>Carts count : {user.carts?.length || 0}</div>
    </Card>
);
