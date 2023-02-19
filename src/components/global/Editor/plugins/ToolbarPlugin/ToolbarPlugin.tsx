import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useRef, useState } from 'react';
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
} from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isParentElementRTL } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { createPortal } from 'react-dom';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isCodeNode, getDefaultCodeLanguage } from '@lexical/code';
import { getSelectedNode } from './getSelectedNode';
import FloatingLinkEditor from './FloatingLinkEditor';
import {
  BsArrowCounterclockwise,
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
import { Divider, Toolbar, ToolbarItemButton } from './componentsToolbar';
import ToolbarBlockType, { BlockType } from './ToolbarBlockType';
import SelectCodeLanguage from './SelectCodeLanguage';

export const LOW_PRIORITY = 1;

const ToolbarPlugin = (): JSX.Element => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState<BlockType>('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(null);
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

  return (
    <Toolbar ref={toolbarRef}>
      <ToolbarItemButton disabled={!canUndo} onClick={undoCallback} aria-label="Undo">
        <BsArrowCounterclockwise />
      </ToolbarItemButton>
      <ToolbarItemButton disabled={!canRedo} onClick={redoCallback} aria-label="Redo">
        <DynamicIcon icon="BsArrowClockwise" small />
      </ToolbarItemButton>
      <Divider />
      <ToolbarBlockType blockType={blockType} editor={editor} toolbarRef={toolbarRef} />
      {blockType === 'code' ? (
        <SelectCodeLanguage
          selectedElementKey={selectedElementKey}
          editor={editor}
          codeLanguage={codeLanguage}
        />
      ) : (
        <>
          <ToolbarItemButton onClick={boldTextCallback} $active={isBold} aria-label="Format Bold">
            <BsTypeBold />
          </ToolbarItemButton>
          <ToolbarItemButton
            onClick={italicTextCallback}
            $active={isItalic}
            aria-label="Format Italics"
          >
            <BsTypeItalic />
          </ToolbarItemButton>
          <ToolbarItemButton
            onClick={underlineTextCallback}
            $active={isUnderline}
            aria-label="Format Underline"
          >
            <BsTypeUnderline />
          </ToolbarItemButton>
          <ToolbarItemButton
            onClick={strikethroughTextCallback}
            $active={isStrikethrough}
            aria-label="Format Strikethrough"
          >
            <BsTypeStrikethrough />
          </ToolbarItemButton>
          <ToolbarItemButton onClick={codeTextCallback} $active={isCode} aria-label="Insert Code">
            <BsCode />
          </ToolbarItemButton>
          <ToolbarItemButton onClick={insertLink} $active={isLink} aria-label="Insert Link">
            <BsLink />
          </ToolbarItemButton>
          {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
          <Divider />
          <ToolbarItemButton onClick={leftElementCallback} aria-label="Left Align">
            <BsTextLeft />
          </ToolbarItemButton>
          <ToolbarItemButton onClick={centerElementCallback} aria-label="Center Align">
            <BsTextCenter />
          </ToolbarItemButton>
          <ToolbarItemButton onClick={rightElementCallback} aria-label="Right Align">
            <BsTextRight />
          </ToolbarItemButton>
          <ToolbarItemButton onClick={justifyElementCallback} aria-label="Justify Align">
            <BsJustify />
          </ToolbarItemButton>{' '}
        </>
      )}
    </Toolbar>
  );
};

export default ToolbarPlugin;
