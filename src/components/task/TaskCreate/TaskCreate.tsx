import React from 'react';
import TaskCreateForm from './TaskCreateForm';
import { Header1 } from '../../global/Headers';

const TaskCreate: React.FC = () => {
  return (
    <>
      <Header1>Create new task</Header1>
      <TaskCreateForm />
    </>
  );
};

export default TaskCreate;
