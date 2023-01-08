import { useCallback, useMemo } from 'react';
import { Button, FormListOperation } from 'antd';
import DynamicIcon from '../global/DynamicIcon';

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
  const plusIcon = useMemo(() => <DynamicIcon icon="AiOutlinePlus" />, []);
  const addCallback = useCallback(() => add(defaultValues), [add, defaultValues]);

  return (
    <Button type="dashed" onClick={addCallback} block icon={plusIcon}>
      {text}
    </Button>
  );
};

export default NewCheckpointButton;
