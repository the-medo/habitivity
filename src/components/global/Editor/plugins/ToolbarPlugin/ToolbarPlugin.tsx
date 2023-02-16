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
import {
  BsArrowCounterclockwise,
  BsChevronDown,
  BsCode,
  BsJustify,
  BsLink,
  BsTextCenter,
  BsTextLeft,
  BsTextRight,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
} from 'react-icons/bs';
import DynamicIcon from '../../../DynamicIcon';

export const LOW_PRIORITY = 1;

const supportedBlockTypes = new Set(['paragraph', 'quote', 'code', 'h1', 'h2', 'ul', 'ol']);

type BlockType =
  | 'code'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'ol'
  | 'paragraph'
  | 'quote'
  | 'ul';

interface BlockTypeInfo {
  name: string;
  iconName: string;
}

const blockTypeToBlockName: Record<BlockType, BlockTypeInfo> = {
  code: {
    name: 'Code Block',
    iconName: 'BsCode',
  },
  h1: {
    name: 'Large Heading',
    iconName: 'BsTypeH1',
  },
  h2: {
    name: 'Small Heading',
    iconName: 'BsTypeH2',
  },
  h3: {
    name: 'Heading',
    iconName: 'BsTypeH3',
  },
  h4: {
    name: 'Heading',
    iconName: 'BsTypeH4',
  },
  h5: {
    name: 'Heading',
    iconName: 'BsTypeH5',
  },
  h6: {
    name: 'Heading',
    iconName: 'BsTypeH6',
  },
  ul: {
    name: 'Bulleted List',
    iconName: 'BsListUl',
  },
  ol: {
    name: 'Numbered List',
    iconName: 'BsListOl',
  },
  paragraph: {
    name: 'Normal',
    iconName: 'BsTextParagraph',
  },
  quote: {
    name: 'Quote',
    iconName: 'BsChatSquareQuote',
  },
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
        <BsArrowCounterclockwise />
        {/*<DynamicIcon icon="BsArrowCounterclockwise" />*/}
      </button>
      <button disabled={!canRedo} onClick={redoCallback} className="toolbar-item" aria-label="Redo">
        <DynamicIcon icon="BsArrowClockwise" small />
      </button>
      <Divider />
      {supportedBlockTypes.has(blockType) && (
        <>
          <button
            className="toolbar-item block-controls"
            onClick={showBlockOptionsDropdownListCallback}
            aria-label="Formatting Options"
          >
            <span className={'icon ' + blockType}>
              <DynamicIcon icon={blockTypeToBlockName[blockType].iconName} />
            </span>
            <span className="text">{blockTypeToBlockName[blockType].name}</span>
            <BsChevronDown />
            {/*<i className="chevron-down" />*/}
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
          <BsChevronDown />
          {/*<i className="chevron-down inside" />*/}
        </>
      ) : (
        <>
          <button
            onClick={boldTextCallback}
            className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
            aria-label="Format Bold"
          >
            <BsTypeBold />
            {/*<i className="format bold" />*/}
          </button>
          <button
            onClick={italicTextCallback}
            className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
            aria-label="Format Italics"
          >
            <BsTypeItalic />
            {/*<i className="format italic" />*/}
          </button>
          <button
            onClick={underlineTextCallback}
            className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
            aria-label="Format Underline"
          >
            <BsTypeUnderline />
            {/*<i className="format underline" />*/}
          </button>
          <button
            onClick={strikethroughTextCallback}
            className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
            aria-label="Format Strikethrough"
          >
            <BsTypeStrikethrough />
            {/*<i className="format strikethrough" />*/}
          </button>
          <button
            onClick={codeTextCallback}
            className={'toolbar-item spaced ' + (isCode ? 'active' : '')}
            aria-label="Insert Code"
          >
            <BsCode />
            {/*<i className="format code" />*/}
          </button>
          <button
            onClick={insertLink}
            className={'toolbar-item spaced ' + (isLink ? 'active' : '')}
            aria-label="Insert Link"
          >
            <BsLink />
            {/*<i className="format link" />*/}
          </button>
          {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
          <Divider />
          <button
            onClick={leftElementCallback}
            className="toolbar-item spaced"
            aria-label="Left Align"
          >
            <BsTextLeft />
            {/*<i className="format left-align" />*/}
          </button>
          <button
            onClick={centerElementCallback}
            className="toolbar-item spaced"
            aria-label="Center Align"
          >
            <BsTextCenter />
            {/*<i className="format center-align" />*/}
          </button>
          <button
            onClick={rightElementCallback}
            className="toolbar-item spaced"
            aria-label="Right Align"
          >
            <BsTextRight />
            {/*<i className="format right-align" />*/}
          </button>
          <button
            onClick={justifyElementCallback}
            className="toolbar-item"
            aria-label="Justify Align"
          >
            <BsJustify />
            {/*<i className="format justify-align" />*/}
          </button>{' '}
        </>
      )}
    </div>
  );
};

export default ToolbarPlugin;
