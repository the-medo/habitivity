import { createGlobalStyle } from 'styled-components';

export const EditorStyle = createGlobalStyle`
  
  .other h2 {
    font-size: 18px;
    color: #444;
    margin-bottom: 7px;
  }

  .other a {
    color: #777;
    text-decoration: underline;
    font-size: 14px;
  }

  .other ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  h1 {
    font-size: 24px;
    color: #333;
  }

  .ltr {
    text-align: left;
  }

  .rtl {
    text-align: right;
  }

  .editor-container {
    margin: 20px auto 20px auto;
    border: 1px solid #ddd;
    border-radius: 2px;
    max-width: 600px;
    color: #000;
    position: relative;
    line-height: 20px;
    font-weight: 400;
    text-align: left;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .editor-inner {
    background: #fff;
    position: relative;
  }

  .editor-input {
    min-height: 150px;
    resize: none;
    font-size: 15px;
    caret-color: rgb(5, 5, 5);
    position: relative;
    tab-size: 1;
    outline: 0;
    padding: 15px 10px;
    caret-color: #444;
  }

  .editor-placeholder {
    color: #999;
    overflow: hidden;
    position: absolute;
    text-overflow: ellipsis;
    top: 15px;
    left: 10px;
    font-size: 15px;
    user-select: none;
    display: inline-block;
    pointer-events: none;
  }

  .editor-text-bold {
    font-weight: bold;
  }

  .editor-text-italic {
    font-style: italic;
  }

  .editor-text-underline {
    text-decoration: underline;
  }

  .editor-text-strikethrough {
    text-decoration: line-through;
  }

  .editor-text-underlineStrikethrough {
    text-decoration: underline line-through;
  }

  .editor-text-code {
    background-color: rgb(240, 242, 245);
    padding: 1px 0.25rem;
    font-family: Menlo, Consolas, Monaco, monospace;
    font-size: 94%;
  }

  .editor-link {
    color: rgb(33, 111, 219);
    text-decoration: none;
  }

  .editor-code {
    background-color: rgb(240, 242, 245);
    font-family: Menlo, Consolas, Monaco, monospace;
    display: block;
    padding: 8px 8px 8px 52px;
    line-height: 1.53;
    font-size: 13px;
    margin: 0;
    margin-top: 8px;
    margin-bottom: 8px;
    tab-size: 2;
    /* white-space: pre; */
    overflow-x: auto;
    position: relative;
  }

  .editor-code:before {
    content: attr(data-gutter);
    position: absolute;
    background-color: #eee;
    left: 0;
    top: 0;
    border-right: 1px solid #ccc;
    padding: 8px;
    color: #777;
    white-space: pre-wrap;
    text-align: right;
    min-width: 25px;
  }
  .editor-code:after {
    content: attr(data-highlight-language);
    top: 0;
    right: 3px;
    padding: 3px;
    font-size: 10px;
    text-transform: uppercase;
    position: absolute;
    color: rgba(0, 0, 0, 0.5);
  }

  .editor-tokenComment {
    color: slategray;
  }

  .editor-tokenPunctuation {
    color: #999;
  }

  .editor-tokenProperty {
    color: #905;
  }

  .editor-tokenSelector {
    color: #690;
  }

  .editor-tokenOperator {
    color: #9a6e3a;
  }

  .editor-tokenAttr {
    color: #07a;
  }

  .editor-tokenVariable {
    color: #e90;
  }

  .editor-tokenFunction {
    color: #dd4a68;
  }

  .editor-paragraph {
    margin: 0;
    margin-bottom: 8px;
    position: relative;
  }

  .editor-paragraph:last-child {
    margin-bottom: 0;
  }

  .editor-heading-h1 {
    font-size: 24px;
    color: rgb(5, 5, 5);
    font-weight: 400;
    margin: 0;
    margin-bottom: 12px;
    padding: 0;
  }

  .editor-heading-h2 {
    font-size: 15px;
    color: rgb(101, 103, 107);
    font-weight: 700;
    margin: 0;
    margin-top: 10px;
    padding: 0;
    text-transform: uppercase;
  }

  .editor-quote {
    margin: 0;
    margin-left: 20px;
    font-size: 15px;
    color: rgb(101, 103, 107);
    border-left-color: rgb(206, 208, 212);
    border-left-width: 4px;
    border-left-style: solid;
    padding-left: 16px;
  }

  .editor-list-ol {
    padding: 0;
    margin: 0;
    margin-left: 16px;
  }

  .editor-list-ul {
    padding: 0;
    margin: 0;
    margin-left: 16px;
  }

  .editor-listitem {
    margin: 8px 32px 8px 32px;
  }

  .editor-nested-listitem {
    list-style-type: none;
  }

  pre::-webkit-scrollbar {
    background: transparent;
    width: 10px;
  }

  pre::-webkit-scrollbar-thumb {
    background: #999;
  }

  .emoji {
    color: transparent;
    background-size: 16px 16px;
    background-position: center;
    background-repeat: no-repeat;
    vertical-align: middle;
    margin: 0 -1px;
  }

  .emoji-inner {
    padding: 0 0.15em;
  }

  .emoji-inner::selection {
    color: transparent;
    background-color: rgba(150, 150, 150, 0.4);
  }

  .emoji-inner::moz-selection {
    color: transparent;
    background-color: rgba(150, 150, 150, 0.4);
  }

  .emoji.happysmile {
    background-image: url(./images/emoji/1F642.png);
  }

  .toolbar {
    display: flex;
    margin-bottom: 1px;
    background: #fff;
    padding: 4px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    vertical-align: middle;
  }

  .toolbar button.toolbar-item {
    border: 0;
    display: flex;
    background: none;
    border-radius: 10px;
    padding: 8px;
    cursor: pointer;
    vertical-align: middle;
  }

  .toolbar button.toolbar-item:disabled {
    cursor: not-allowed;
  }

  .toolbar button.toolbar-item.spaced {
    margin-right: 2px;
  }

  .toolbar button.toolbar-item i.format {
    background-size: contain;
    display: inline-block;
    height: 18px;
    width: 18px;
    margin-top: 2px;
    vertical-align: -0.25em;
    display: flex;
    opacity: 0.6;
  }

  .toolbar button.toolbar-item:disabled i.format {
    opacity: 0.2;
  }

  .toolbar button.toolbar-item.active {
    background-color: rgba(223, 232, 250, 0.3);
  }

  .toolbar button.toolbar-item.active i {
    opacity: 1;
  }

  .toolbar .toolbar-item:hover:not([disabled]) {
    background-color: #eee;
  }

  .toolbar .divider {
    width: 1px;
    background-color: #eee;
    margin: 0 4px;
  }

  .toolbar select.toolbar-item {
    border: 0;
    display: flex;
    background: none;
    border-radius: 10px;
    padding: 8px;
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 70px;
    font-size: 14px;
    color: #777;
    text-overflow: ellipsis;
  }

  .toolbar select.code-language {
    text-transform: capitalize;
    width: 130px;
  }

  .toolbar .toolbar-item .text {
    display: flex;
    line-height: 20px;
    width: 200px;
    vertical-align: middle;
    font-size: 14px;
    color: #777;
    text-overflow: ellipsis;
    width: 70px;
    overflow: hidden;
    height: 20px;
    text-align: left;
  }

  .toolbar .toolbar-item .icon {
    display: flex;
    width: 20px;
    height: 20px;
    user-select: none;
    margin-right: 8px;
    line-height: 16px;
    background-size: contain;
  }

  .toolbar i.chevron-down {
    margin-top: 3px;
    width: 16px;
    height: 16px;
    display: flex;
    user-select: none;
  }

  .toolbar i.chevron-down.inside {
    width: 16px;
    height: 16px;
    display: flex;
    margin-left: -25px;
    margin-top: 11px;
    margin-right: 10px;
    pointer-events: none;
  }

  i.chevron-down {
    background-color: transparent;
    background-size: contain;
    display: inline-block;
    height: 8px;
    width: 8px;
    background-image: url(images/icons/chevron-down.svg);
  }

  #block-controls button:hover {
    background-color: #efefef;
  }

  #block-controls button:focus-visible {
    border-color: blue;
  }

  #block-controls span.block-type {
    background-size: contain;
    display: block;
    width: 18px;
    height: 18px;
    margin: 2px;
  }

  #block-controls span.block-type.paragraph {
    background-image: url(images/icons/text-paragraph.svg);
  }

  #block-controls span.block-type.h1 {
    background-image: url(images/icons/type-h1.svg);
  }

  #block-controls span.block-type.h2 {
    background-image: url(images/icons/type-h2.svg);
  }

  #block-controls span.block-type.quote {
    background-image: url(images/icons/chat-square-quote.svg);
  }

  #block-controls span.block-type.ul {
    background-image: url(images/icons/list-ul.svg);
  }

  #block-controls span.block-type.ol {
    background-image: url(images/icons/list-ol.svg);
  }

  #block-controls span.block-type.code {
    background-image: url(images/icons/code.svg);
  }

  .dropdown {
    z-index: 5;
    display: block;
    position: absolute;
    box-shadow: 0 12px 28px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    min-width: 100px;
    min-height: 40px;
    background-color: #fff;
  }

  .dropdown .item {
    margin: 0 8px 0 8px;
    padding: 8px;
    color: #050505;
    cursor: pointer;
    line-height: 16px;
    font-size: 15px;
    display: flex;
    align-content: center;
    flex-direction: row;
    flex-shrink: 0;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 8px;
    border: 0;
    min-width: 268px;
  }

  .dropdown .item .active {
    display: flex;
    width: 20px;
    height: 20px;
    background-size: contain;
  }

  .dropdown .item:first-child {
    margin-top: 8px;
  }

  .dropdown .item:last-child {
    margin-bottom: 8px;
  }

  .dropdown .item:hover {
    background-color: #eee;
  }

  .dropdown .item .text {
    display: flex;
    line-height: 20px;
    flex-grow: 1;
    width: 200px;
  }

  .dropdown .item .icon {
    display: flex;
    width: 20px;
    height: 20px;
    user-select: none;
    margin-right: 12px;
    line-height: 16px;
    background-size: contain;
  }

  .link-editor {
    position: absolute;
    z-index: 100;
    top: -10000px;
    left: -10000px;
    margin-top: -6px;
    max-width: 300px;
    width: 100%;
    opacity: 0;
    background-color: #fff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    transition: opacity 0.5s;
  }

  .link-editor .link-input {
    display: block;
    width: calc(100% - 24px);
    box-sizing: border-box;
    margin: 8px 12px;
    padding: 8px 12px;
    border-radius: 15px;
    background-color: #eee;
    font-size: 15px;
    color: rgb(5, 5, 5);
    border: 0;
    outline: 0;
    position: relative;
    font-family: inherit;
  }

  .link-editor div.link-edit {
    background-image: url(images/icons/pencil-fill.svg);
    background-size: 16px;
    background-position: center;
    background-repeat: no-repeat;
    width: 35px;
    vertical-align: -0.25em;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    cursor: pointer;
  }

  .link-editor .link-input a {
    color: rgb(33, 111, 219);
    text-decoration: none;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    margin-right: 30px;
    text-overflow: ellipsis;
  }

  .link-editor .link-input a:hover {
    text-decoration: underline;
  }

  .link-editor .button {
    width: 20px;
    height: 20px;
    display: inline-block;
    padding: 6px;
    border-radius: 8px;
    cursor: pointer;
    margin: 0 2px;
  }

  .link-editor .button.hovered {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: #eee;
  }

  .link-editor .button i,
  .actions i {
    background-size: contain;
    display: inline-block;
    height: 20px;
    width: 20px;
    vertical-align: -0.25em;
  }

  i.undo {
    background-image: url(images/icons/arrow-counterclockwise.svg);
  }

  i.redo {
    background-image: url(images/icons/arrow-clockwise.svg);
  }

  .icon.paragraph {
    background-image: url(images/icons/text-paragraph.svg);
  }

  .icon.large-heading,
  .icon.h1 {
    background-image: url(images/icons/type-h1.svg);
  }

  .icon.small-heading,
  .icon.h2 {
    background-image: url(images/icons/type-h2.svg);
  }

  .icon.bullet-list,
  .icon.ul {
    background-image: url(images/icons/list-ul.svg);
  }

  .icon.numbered-list,
  .icon.ol {
    background-image: url(images/icons/list-ol.svg);
  }

  .icon.quote {
    background-image: url(images/icons/chat-square-quote.svg);
  }

  .icon.code {
    background-image: url(images/icons/code.svg);
  }

  i.bold {
    background-image: url(images/icons/type-bold.svg);
  }

  i.italic {
    background-image: url(images/icons/type-italic.svg);
  }

  i.underline {
    background-image: url(images/icons/type-underline.svg);
  }

  i.strikethrough {
    background-image: url(images/icons/type-strikethrough.svg);
  }

  i.code {
    background-image: url(images/icons/code.svg);
  }

  i.link {
    background-image: url(images/icons/link.svg);
  }

  i.left-align {
    background-image: url(images/icons/text-left.svg);
  }

  i.center-align {
    background-image: url(images/icons/text-center.svg);
  }

  i.right-align {
    background-image: url(images/icons/text-right.svg);
  }

  i.justify-align {
    background-image: url(images/icons/justify.svg);
  }

`;
