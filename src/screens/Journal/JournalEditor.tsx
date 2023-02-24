import React, { useCallback, useMemo } from 'react';
import Editor from '../../components/global/Editor/Editor';
import { EditorState, LexicalEditor } from 'lexical';
import { JournalEntry } from '../../types/JournalEntry';
import dayjs from 'dayjs';
import {
  useCreateJournalEntryMutation,
  useGetJournalEntryByIdQuery,
  useUpdateJournalEntryMutation,
} from '../../apis/apiJournalEntry';

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
  } = useGetJournalEntryByIdQuery(selectedDate, { refetchOnMountOrArgChange: true });

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

  if (isFetchingJournalEntry) return null;

  return (
    <Editor
      onChange={onChangeHandler}
      initialEditorState={initialState}
      loading={isFetchingJournalEntry}
      debounceTime={2000}
    />
  );
};

export default JournalEditor;
