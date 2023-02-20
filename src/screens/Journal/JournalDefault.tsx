import React, { useCallback } from 'react';
import Editor from '../../components/global/Editor/Editor';
import { EditorState, LexicalEditor } from 'lexical';

const defaultEditorStateJsonString =
  '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"asdf","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}';

const JournalDefault: React.FC = () => {
  const onChangeHandler = useCallback((editorState: EditorState, editor: LexicalEditor) => {
    console.log(JSON.stringify(editorState));
  }, []);

  const initialEditorState = defaultEditorStateJsonString;

  return <Editor onChange={onChangeHandler} initialEditorState={initialEditorState} />;
};

export default JournalDefault;
