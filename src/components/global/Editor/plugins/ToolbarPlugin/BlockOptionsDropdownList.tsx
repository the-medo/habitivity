import React, { useCallback, useEffect, useRef } from 'react';
import { $getSelection, $isRangeSelection, $createParagraphNode, LexicalEditor } from 'lexical';
import { $wrapNodes } from '@lexical/selection';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $createCodeNode } from '@lexical/code';
import {
  BsChatSquareQuote,
  BsCode,
  BsListOl,
  BsListUl,
  BsTextParagraph,
  BsTypeH1,
  BsTypeH2,
} from 'react-icons/bs';
import {
  DropdownContainer,
  DropdownItem,
  DropdownItemIcon,
  DropdownItemText,
} from './dropdownComponents';

interface BlockOptionsDropdownListProps {
  editor: LexicalEditor;
  blockType: string;
  toolbarRef: React.RefObject<HTMLDivElement>;
  setShowBlockOptionsDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlockOptionsDropdownList = ({
  editor,
  blockType,
  toolbarRef,
  setShowBlockOptionsDropDown,
}: BlockOptionsDropdownListProps): JSX.Element => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect();
      dropDown.style.top = `${top + 40}px`;
      dropDown.style.left = `${left}px`;
    }
  }, [dropDownRef, toolbarRef]);

  useEffect(() => {
    const dropDown = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event: MouseEvent) => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        const target = event.target as Node;

        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

  const formatParagraph = useCallback(() => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  }, [blockType, editor, setShowBlockOptionsDropDown]);

  const formatLargeHeading = useCallback(() => {
    if (blockType !== 'h1') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode('h1'));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  }, [blockType, editor, setShowBlockOptionsDropDown]);

  const formatSmallHeading = useCallback(() => {
    if (blockType !== 'h2') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode('h2'));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  }, [blockType, editor, setShowBlockOptionsDropDown]);

  const formatBulletList = useCallback(() => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowBlockOptionsDropDown(false);
  }, [blockType, editor, setShowBlockOptionsDropDown]);

  const formatNumberedList = useCallback(() => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowBlockOptionsDropDown(false);
  }, [blockType, editor, setShowBlockOptionsDropDown]);

  const formatQuote = useCallback(() => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  }, [blockType, editor, setShowBlockOptionsDropDown]);

  const formatCode = useCallback(() => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  }, [blockType, editor, setShowBlockOptionsDropDown]);

  return (
    <DropdownContainer ref={dropDownRef}>
      <DropdownItem $active={blockType === 'paragraph'} onClick={formatParagraph}>
        <DropdownItemIcon>
          <BsTextParagraph />
        </DropdownItemIcon>
        <DropdownItemText>Normal</DropdownItemText>
      </DropdownItem>

      <DropdownItem $active={blockType === 'h1'} onClick={formatLargeHeading}>
        <DropdownItemIcon>
          <BsTypeH1 />
        </DropdownItemIcon>
        <DropdownItemText>Large Heading</DropdownItemText>
      </DropdownItem>

      <DropdownItem $active={blockType === 'h2'} onClick={formatSmallHeading}>
        <DropdownItemIcon>
          <BsTypeH2 />
        </DropdownItemIcon>
        <DropdownItemText>Small Heading</DropdownItemText>
      </DropdownItem>

      <DropdownItem $active={blockType === 'ul'} onClick={formatBulletList}>
        <DropdownItemIcon>
          <BsListUl />
        </DropdownItemIcon>
        <DropdownItemText>Bullet List</DropdownItemText>
      </DropdownItem>

      <DropdownItem $active={blockType === 'ol'} onClick={formatNumberedList}>
        <DropdownItemIcon>
          <BsListOl />
        </DropdownItemIcon>
        <DropdownItemText>Numbered List</DropdownItemText>
      </DropdownItem>

      <DropdownItem $active={blockType === 'quote'} onClick={formatQuote}>
        <DropdownItemIcon>
          <BsChatSquareQuote />
        </DropdownItemIcon>
        <DropdownItemText>Quote</DropdownItemText>
      </DropdownItem>

      <DropdownItem $active={blockType === 'code'} onClick={formatCode}>
        <DropdownItemIcon>
          <BsCode />
        </DropdownItemIcon>
        <DropdownItemText>Code Block</DropdownItemText>
      </DropdownItem>
    </DropdownContainer>
  );
};

export default BlockOptionsDropdownList;
