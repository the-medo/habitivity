import ExampleTheme from './themes/EditorTheme';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from './plugins/ToolbarPlugin/ToolbarPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin/ListMaxIndentLevelPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin/CodeHighlightPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin/AutoLinkPlugin';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EditorContainer, EditorInner, Placeholder } from './componentsEditor';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState, LexicalEditor } from 'lexical';
import { Spin } from 'antd';
import { useLexicalEditor } from '@lexical/react/DEPRECATED_useLexicalEditor';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import debounce from 'lodash.debounce';

const editorConfig: InitialConfigType = {
  // The editor theme
  theme: ExampleTheme,
  namespace: 'editor',

  // Handling of errors during update
  onError(error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

interface EditorProps {
  onChange: (editorState: EditorState, editor: LexicalEditor) => void;
  initialEditorState?: string;
  disabled?: boolean;
  loading?: boolean;
  debounceTime?: number;
}

const Editor = ({
  onChange,
  initialEditorState,
  disabled,
  loading,
  debounceTime = 2000,
}: EditorProps): JSX.Element => {
  const contentEditable = useMemo(() => <ContentEditable className="editor-input" />, []);
  const editorStateRef = useRef<EditorState>();
  const editorRef = useRef<LexicalEditor>();
  const placeholder = useMemo(() => <Placeholder>Enter some rich text...</Placeholder>, []);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [contentSaved, setContentSaved] = useState(false);

  const initialConfig = useMemo(() => {
    return {
      ...editorConfig,
      editorState: initialEditorState,
      editable: !disabled,
    };
  }, [disabled, initialEditorState]);

  useEffect(() => {
    return () => {
      console.log('IN RETURN!!!!!!!', editorRef.current?.getEditorState());
      if (editorStateRef.current && editorRef.current) {
        onChange(editorStateRef.current, editorRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeHandlerDebounced = useCallback(
    debounce((editorState: EditorState, editor: LexicalEditor) => {
      if (!contentSaved) {
        editorStateRef.current = editorState;
        editorRef.current = editor;
        onChange(editorState, editor);
        setContentSaved(true);
      }
    }, debounceTime),
    [onChange, contentSaved],
  );

  const onChangeHandler = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      console.log('On change detected!!!');
      if (isInitialLoad) {
        setIsInitialLoad(false);
        return;
      }

      setContentSaved(false);
      onChangeHandlerDebounced(editorState, editor);
    },
    [isInitialLoad, onChangeHandlerDebounced],
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContainer>
        <ToolbarPlugin />
        <EditorInner>
          <Spin spinning={loading}>
            <RichTextPlugin
              contentEditable={contentEditable}
              placeholder={placeholder}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={onChangeHandler} ignoreSelectionChange={true} />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <LinkPlugin />
            <AutoLinkPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </Spin>
        </EditorInner>
      </EditorContainer>
    </LexicalComposer>
  );
};

export default Editor;
