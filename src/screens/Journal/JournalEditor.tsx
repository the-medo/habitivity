import React, { useCallback, useEffect, useMemo } from 'react';
import Editor from '../../components/global/Editor/Editor';
import { EditorState, LexicalEditor } from 'lexical';
import { JournalEntry } from '../../types/JournalEntry';
import dayjs from 'dayjs';
import {
  useCreateJournalEntryMutation,
  useGetJournalEntryByIdQuery,
  useUpdateJournalEntryMutation,
} from '../../apis/apiJournalEntry';
import { Spin } from 'antd';

interface JournalEditorProps {
  selectedDate: string;
}

const JournalEditor: React.FC<JournalEditorProps> = ({ selectedDate }) => {
  const [createJournalEntry /*{ isLoading: isLoadingCreate, isSuccess: isSuccessCreate }*/] =
    useCreateJournalEntryMutation();
  const [updateJournalEntry /* { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate } */] =
    useUpdateJournalEntryMutation();
  const {
    data: activeJournalEntry,
    // isLoading: isLoadingJournalEntry,
    isFetching: isFetchingJournalEntry,
  } = useGetJournalEntryByIdQuery(selectedDate);

  const [selectedDateChanged, setSelectedDateChanged] = React.useState(false);

  useEffect(() => {
    setSelectedDateChanged(true);
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDateChanged) {
      setSelectedDateChanged(false);
    }
  }, [selectedDate, selectedDateChanged]);

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
        console.log('To update', journalEntry);
        updateJournalEntry(journalEntry);
      } else {
        console.log('To create', journalEntry);
        createJournalEntry(journalEntry);
      }
    },
    [selectedDate, activeJournalEntry, updateJournalEntry, createJournalEntry],
  );

  const editorState = useMemo(() => {
    console.log('activeJournalEntry', activeJournalEntry);
    if (!isFetchingJournalEntry && activeJournalEntry) {
      return activeJournalEntry.body;
    } else {
      return undefined;
    }
  }, [activeJournalEntry, isFetchingJournalEntry]);

  if (isFetchingJournalEntry || selectedDateChanged) {
    return (
      <Spin spinning={true}>
        <Editor
          editorState={undefined}
          loading={true}
          // eslint-disable-next-line react/jsx-no-bind,react-perf/jsx-no-new-function-as-prop
          onChange={() => {
            /* empty */
          }}
        />
      </Spin>
    );
  }

  return (
    <Editor
      onChange={onChangeHandler}
      editorState={editorState}
      loading={isFetchingJournalEntry}
      debounceTime={1000}
    />
  );
};

export default JournalEditor;
