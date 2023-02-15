import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
  $getNodeByKey,
} from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isParentElementRTL } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { createPortal } from 'react-dom';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isCodeNode, getDefaultCodeLanguage, getCodeLanguages } from '@lexical/code';
import BlockOptionsDropdownList from './BlockOptionsDropdownList';
import { getSelectedNode } from './getSelectedNode';
import FloatingLinkEditor from './FloatingLinkEditor';

export const LOW_PRIORITY = 1;

const supportedBlockTypes = new Set(['paragraph', 'quote', 'code', 'h1', 'h2', 'ul', 'ol']);

const blockTypeToBlockName = {
  code: 'Code Block',
  h1: 'Large Heading',
  h2: 'Small Heading',
  h3: 'Heading',
  h4: 'Heading',
  h5: 'Heading',
  h6: 'Heading',
  ol: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
  ul: 'Bulleted List',
};

const Divider = () => <div className="divider" />;

interface SelectProps {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  options: string[];
  value: string;
}

const Select = ({ onChange, className, options, value }: SelectProps) => {
  return (
    <select className={className} onChange={onChange} value={value}>
      <option hidden={true} value="" />
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

type BlockType = keyof typeof blockTypeToBlockName;

const ToolbarPlugin = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState<BlockType>('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(null);
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('');
  const [_, setIsRTL] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type: BlockType = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type: BlockType = $isHeadingNode(element)
            ? element.getTag()
            : // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              (element.getType() as BlockType);
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() ?? getDefaultCodeLanguage());
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        _payload => {
          //unused - newEditor
          updateToolbar();
          return false;
        },
        LOW_PRIORITY,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        payload => {
          setCanUndo(payload);
          return false;
        },
        LOW_PRIORITY,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        payload => {
          setCanRedo(payload);
          return false;
        },
        LOW_PRIORITY,
      ),
    );
  }, [editor, updateToolbar]);

  const codeLanguages = useMemo(() => getCodeLanguages(), []);

  const onCodeLanguageSelect = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(e.target.value);
          }
        }
      });
    },
    [editor, selectedElementKey],
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const undoCallback = useCallback(() => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  }, [editor]);

  const redoCallback = useCallback(() => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  }, [editor]);

  const boldTextCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  }, [editor]);

  const italicTextCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  }, [editor]);

  const underlineTextCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
  }, [editor]);

  const strikethroughTextCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
  }, [editor]);

  const codeTextCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
  }, [editor]);

  const leftElementCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
  }, [editor]);

  const centerElementCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
  }, [editor]);

  const rightElementCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
  }, [editor]);

  const justifyElementCallback = useCallback(() => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
  }, [editor]);

  const showBlockOptionsDropdownListCallback = useCallback(
    () => setShowBlockOptionsDropDown(p => !p),
    [],
  );

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={undoCallback}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo" />
      </button>
      <button disabled={!canRedo} onClick={redoCallback} className="toolbar-item" aria-label="Redo">
        <i className="format redo" />
      </button>
      <Divider />
      {supportedBlockTypes.has(blockType) && (
        <>
          <button
            className="toolbar-item block-controls"
            onClick={showBlockOptionsDropdownListCallback}
            aria-label="Formatting Options"
          >
            <span className={'icon block-type ' + blockType} />
            <span className="text">{blockTypeToBlockName[blockType]}</span>
            <i className="chevron-down" />
          </button>
          {showBlockOptionsDropDown &&
            createPortal(
              <BlockOptionsDropdownList
                editor={editor}
                blockType={blockType}
                toolbarRef={toolbarRef}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />,
              document.body,
            )}
          <Divider />
        </>
      )}
      {blockType === 'code' ? (
        <>
          <Select
            className="toolbar-item code-language"
            onChange={onCodeLanguageSelect}
            options={codeLanguages}
            value={codeLanguage}
          />
          <i className="chevron-down inside" />
        </>
      ) : (
        <>
          <button
            onClick={boldTextCallback}
            className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
            aria-label="Format Bold"
          >
            <i className="format bold" />
          </button>
          <button
            onClick={italicTextCallback}
            className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
            aria-label="Format Italics"
          >
            <i className="format italic" />
          </button>
          <button
            onClick={underlineTextCallback}
            className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
            aria-label="Format Underline"
          >
            <i className="format underline" />
          </button>
          <button
            onClick={strikethroughTextCallback}
            className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
            aria-label="Format Strikethrough"
          >
            <i className="format strikethrough" />
          </button>
          <button
            onClick={codeTextCallback}
            className={'toolbar-item spaced ' + (isCode ? 'active' : '')}
            aria-label="Insert Code"
          >
            <i className="format code" />
          </button>
          <button
            onClick={insertLink}
            className={'toolbar-item spaced ' + (isLink ? 'active' : '')}
            aria-label="Insert Link"
          >
            <i className="format link" />
          </button>
          {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
          <Divider />
          <button
            onClick={leftElementCallback}
            className="toolbar-item spaced"
            aria-label="Left Align"
          >
            <i className="format left-align" />
          </button>
          <button
            onClick={centerElementCallback}
            className="toolbar-item spaced"
            aria-label="Center Align"
          >
            <i className="format center-align" />
          </button>
          <button
            onClick={rightElementCallback}
            className="toolbar-item spaced"
            aria-label="Right Align"
          >
            <i className="format right-align" />
          </button>
          <button
            onClick={justifyElementCallback}
            className="toolbar-item"
            aria-label="Justify Align"
          >
            <i className="format justify-align" />
          </button>{' '}
        </>
      )}
    </div>
  );
};

export default ToolbarPlugin;
