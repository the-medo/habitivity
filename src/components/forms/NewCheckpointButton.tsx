import React, { useCallback, useMemo } from 'react';
import { Button, FormListOperation } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface NewCheckpointButtonProps {
  add: FormListOperation['add'];
  text: string;
}

const NewCheckpointButton: React.FC<NewCheckpointButtonProps> = ({ add, text }) => {
  const plusIcon = useMemo(() => <PlusOutlined />, []);
  const addCallback = useCallback(() => add(), [add]);

  return (
    <Button type="dashed" onClick={addCallback} block icon={plusIcon}>
      {text}
    </Button>
  );
};

export default NewCheckpointButton;
