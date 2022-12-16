import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';
import { HabitivityUser } from '../../types/HabitivityUser';
import { useUser } from '../../hooks/useUser';
import { initials } from '../../helpers/initials';

interface UserAvatarProps {
  userToDisplay?: HabitivityUser;
}

export const StyledUserAvatar = styled(Avatar)`
  padding: 0;
  margin: 0.25rem 0.5rem 0.25rem 0.25rem;
  transition: 0.5s all;
  display: flex;
`;

const UserAvatar: React.FC<UserAvatarProps> = ({ userToDisplay }) => {
  let user = useUser();

  if (userToDisplay) user = userToDisplay;

  const avatarImg = useMemo(
    () => <img src={user?.photoUrl ?? undefined} referrerPolicy="no-referrer" alt="User avatar" />,
    [user?.photoUrl],
  );

  if (!user) {
    return <StyledUserAvatar>-</StyledUserAvatar>;
  }

  if (!user.photoUrl) {
    return <StyledUserAvatar>{initials(user.name)}</StyledUserAvatar>;
  }

  return <StyledUserAvatar src={avatarImg} />;
};

export default UserAvatar;
