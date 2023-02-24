import React, { useCallback, useMemo } from 'react';
import Title from 'antd/es/typography/Title';
import { DatePicker } from 'antd';
import { datepickerFormat } from '../../components/forms/AntdFormComponents';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { RowGap } from '../../components/global/RowGap';
import { setSelectedDate } from './journalSlice';
import JournalEditor from './JournalEditor';

const JournalDefault: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: ReduxState) => state.journal.selectedDate);
  const selectedDateDayjs = useMemo(() => dayjs(selectedDate), [selectedDate]);

  const onDateChange = useCallback(
    (value: any) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      if (value !== null) dispatch(setSelectedDate((value as Dayjs).format('YYYY-MM-DD')));
    },
    [dispatch],
  );

  return (
    <>
      <RowGap>
        <Title level={2}>{selectedDateDayjs.format('dddd, MMMM D, YYYY')}</Title>
        <DatePicker
          size="large"
          bordered={false}
          format={datepickerFormat}
          defaultValue={selectedDateDayjs}
          clearIcon={false}
          onChange={onDateChange}
        />
      </RowGap>
      <JournalEditor selectedDate={selectedDate} />
    </>
  );
};

export default JournalDefault;
