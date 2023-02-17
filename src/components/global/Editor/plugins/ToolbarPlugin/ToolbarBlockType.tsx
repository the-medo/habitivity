import React, { useCallback, useState } from 'react';
import DynamicIcon from '../../../DynamicIcon';
import { BsChevronDown } from 'react-icons/bs';
import { createPortal } from 'react-dom';
import BlockOptionsDropdownList from './BlockOptionsDropdownList';
import { Divider, ToolbarItemButton } from './toolbarComponents';
import styled from 'styled-components';
import { LexicalEditor } from 'lexical';

const IconWrapper = styled.span`
  display: flex;
  width: 20px;
  height: 20px;
  user-select: none;
  margin-right: 8px;
  line-height: 16px;
  background-size: contain;
`;

const ChevronWrapper = styled(IconWrapper)`
  width: 14px;
  height: 14px;
  margin-right: 0;
  margin-left: 4px;
`;

const TextWrapper = styled.span`
  display: flex;
  line-height: 20px;
  //width: 200px;
  vertical-align: middle;
  font-size: 14px;
  color: #777;
  text-overflow: ellipsis;
  width: 70px;
  overflow: hidden;
  height: 20px;
  text-align: left;
`;

const supportedBlockTypes = new Set(['paragraph', 'quote', 'code', 'h1', 'h2', 'ul', 'ol']);

export type BlockType =
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

interface ToolbarBlockControlsProps {
  blockType: BlockType;
  toolbarRef: React.RefObject<HTMLDivElement>;
  editor: LexicalEditor;
}

const ToolbarBlockType: React.FC<ToolbarBlockControlsProps> = ({
  blockType,
  toolbarRef,
  editor,
}) => {
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(false);

  const showBlockOptionsDropdownListCallback = useCallback(
    () => setShowBlockOptionsDropDown(p => !p),
    [],
  );
  if (!supportedBlockTypes.has(blockType)) return null;

  return (
    <>
      <ToolbarItemButton
        onClick={showBlockOptionsDropdownListCallback}
        aria-label="Formatting Options"
      >
        <IconWrapper>
          <DynamicIcon icon={blockTypeToBlockName[blockType].iconName} />
        </IconWrapper>
        <TextWrapper>{blockTypeToBlockName[blockType].name}</TextWrapper>
        <ChevronWrapper>
          <BsChevronDown />
        </ChevronWrapper>
        {/*<i className="chevron-down" />*/}
      </ToolbarItemButton>
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
  );
};

export default ToolbarBlockType;
