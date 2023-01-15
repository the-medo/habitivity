import React from 'react';
import { AdditionalActionType } from './TodayEditMode';
import styled from 'styled-components';
import { COLORS } from '../../../styles/CustomStyles';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../store';
import TaskRearrangeRow from './TaskRearrangeRow';

interface AdditionalActionBoxStyledProps {
  $action: AdditionalActionType;
}

const AdditionalActionBoxStyled = styled.div<AdditionalActionBoxStyledProps>`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin: 0.5rem;
  margin-block-start: 0;
  border-bottom: 1px solid ${COLORS.GREY_BORDER};
  background-color: ${p => (p.$action === 'delete' ? COLORS.DANGER_BACKGROUND : COLORS.GREY_LIGHT)};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.h3`
  color: red;
  margin-bottom: 0;
`;

const TitleDescription = styled.span`
  font-style: italic;
  font-size: 0.75rem;
`;

interface AdditionalActionBoxProps {
  action: AdditionalActionType;
}

const AdditionalActionBox: React.FC<AdditionalActionBoxProps> = ({ action }) => {
  const items = useSelector((state: ReduxState) => state.todayReducer.editItems);

  switch (action) {
    case 'archive':
      return (
        <AdditionalActionBoxStyled $action={action}>
          <TitleWrapper>
            <Title>Archived</Title>
            <TitleDescription>
              Archived tasks will keep their history, but you will not see them in menu and places,
              where they are not relevant anymore.
            </TitleDescription>
          </TitleWrapper>
          {Object.keys(items).map(g =>
            items[g]?.map(t =>
              t.additionalAction === 'archive' ? (
                <TaskRearrangeRow key={t.taskId} taskReorder={t} taskGroupId={g} />
              ) : null,
            ),
          )}
        </AdditionalActionBoxStyled>
      );
    case 'delete':
      return (
        <AdditionalActionBoxStyled $action={action}>
          <TitleWrapper>
            <Title>Deleted</Title>
            <TitleDescription>
              History of these tasks will be removed completely and your points will be lost.
            </TitleDescription>
          </TitleWrapper>
          {Object.keys(items).map(g =>
            items[g]?.map(t =>
              t.additionalAction === 'delete' ? (
                <TaskRearrangeRow key={t.taskId} taskReorder={t} taskGroupId={g} />
              ) : null,
            ),
          )}
        </AdditionalActionBoxStyled>
      );
  }
};

export default AdditionalActionBox;
