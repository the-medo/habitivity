import React, { useCallback, useMemo } from 'react';
import Editor from '../../components/global/Editor/Editor';
import { EditorState, LexicalEditor } from 'lexical';
import Title from 'antd/es/typography/Title';
import { DatePicker, Spin } from 'antd';
import { datepickerFormat } from '../../components/forms/AntdFormComponents';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../store';
import { RowGap } from '../../components/global/RowGap';
import { setSelectedDate } from './journalSlice';
import debounce from 'lodash.debounce';
import {
  useCreateJournalEntryMutation,
  useGetJournalEntryByIdQuery,
  useUpdateJournalEntryMutation,
} from '../../apis/apiJournalEntry';
import { useGetTasksByTaskListQuery } from '../../apis/apiTasks';
import { JournalEntry } from '../../types/JournalEntry';

const defaultEditorStateJsonString =
  '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"asdf","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}';

const JournalDefault: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: ReduxState) => state.journal.selectedDate);
  const selectedDateDayjs = useMemo(() => dayjs(selectedDate), [selectedDate]);

  const [createJournalEntry, { isLoading: isLoadingCreate, isSuccess: isSuccessCreate }] =
    useCreateJournalEntryMutation();
  const [updateJournalEntry, { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate }] =
    useUpdateJournalEntryMutation();
  const {
    data: activeJournalEntry,
    isLoading: isLoadingJournalEntry,
    isFetching: isFetchingJournalEntry,
  } = useGetJournalEntryByIdQuery(selectedDate);

  const onChangeHandler = useCallback(
    (editorState: EditorState, _editor: LexicalEditor) => {
      const journalEntry: JournalEntry = {
        id: selectedDate,
        date: selectedDate,
        title: dayjs(selectedDate).format('dddd, MMMM D, YYYY'),
        body: JSON.stringify(editorState),
        tags: [],
      };

      console.log('SAVING!', journalEntry);

      if (activeJournalEntry) {
        updateJournalEntry(journalEntry);
      } else {
        createJournalEntry(journalEntry);
      }
    },
    [selectedDate, activeJournalEntry, updateJournalEntry, createJournalEntry],
  );

  const initialState = useMemo(() => {
    if (activeJournalEntry) {
      return activeJournalEntry.body;
    } else {
      return undefined;
    }
  }, [activeJournalEntry]);

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
      {!isFetchingJournalEntry && (
        <Editor
          onChange={onChangeHandler}
          initialEditorState={initialState}
          loading={isFetchingJournalEntry}
          debounceTime={2000}
        />
      )}
    </>
  );
};

export default JournalDefault;
