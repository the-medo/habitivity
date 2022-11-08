import React from "react";
import styled from "styled-components";
import {Avatar, Image} from "antd";
import {HabitivityUser} from "../../types/HabitivityUser";
import {useUser} from "../../hooks/useUser";

interface UserAvatarProps {
    userToDisplay?: HabitivityUser;
}

export const StyledUserAvatar = styled(Avatar)`
  transition: .5s all;
`


const UserAvatar: React.FC<UserAvatarProps> = ({userToDisplay}) => {
    const user = userToDisplay ?? useUser();

    if (!user) {
        return <StyledUserAvatar>-</StyledUserAvatar>
    }

    if (!user.photoUrl) {
        return <StyledUserAvatar>{user.name.match(/(\b\S)?/g)?.join("").match(/(^\S|\S$)?/g)?.join("").toUpperCase()}</StyledUserAvatar>
    }

    return <StyledUserAvatar src={<Image src={user.photoUrl} referrerPolicy="no-referrer" />} />
}

export default UserAvatar;