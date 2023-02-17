import ExampleTheme from './themes/ExampleTheme';
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
import { useMemo } from 'react';
import { EditorContainer, EditorInner, Placeholder } from './editorComponents';

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

const Editor = (): JSX.Element => {
  const contentEditable = useMemo(() => <ContentEditable className="editor-input" />, []);
  const placeholder = useMemo(() => <Placeholder>Enter some rich text...</Placeholder>, []);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <EditorContainer>
        <ToolbarPlugin />
        <EditorInner>
          <RichTextPlugin
            contentEditable={contentEditable}
            placeholder={placeholder}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </EditorInner>
      </EditorContainer>
    </LexicalComposer>
  );
};

export default Editor;
