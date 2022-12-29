import { Form, FormInstance } from 'antd';
import { useMemo } from 'react';

export interface AntdForm<T> {
  form: FormInstance<T>;
  data: T;
}

export function useAntdForm<T>(initValues: T): AntdForm<T> {
  const [form] = Form.useForm<T>();

  const formData = Form.useWatch<FormInstance<T | undefined>>([], form);

  return useMemo(
    () => ({
      form,
      data: formData ?? initValues,
    }),
    [form, formData, initValues],
  );
}
