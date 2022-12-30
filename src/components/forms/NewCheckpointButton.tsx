import { useCallback, useMemo } from 'react';
import { Button, FormListOperation } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface NewCheckpointButtonProps<T> {
  add: FormListOperation['add'];
  text: string;
  defaultValues: T;
}

const NewCheckpointButton = <T,>({
  add,
  text,
  defaultValues,
}: NewCheckpointButtonProps<T>): JSX.Element => {
  const plusIcon = useMemo(() => <PlusOutlined />, []);
  const addCallback = useCallback(() => add(defaultValues), [add, defaultValues]);

  return (
    <Button type="dashed" onClick={addCallback} block icon={plusIcon}>
      {text}
    </Button>
  );
};

export default NewCheckpointButton;
