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

  .editor-input {
    min-height: 150px;
    resize: none;
    font-size: 15px;
    //caret-color: rgb(5, 5, 5);
    position: relative;
    tab-size: 1;
    outline: 0;
    padding: 15px 10px;
    caret-color: #444;
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
    margin: 8px 0;
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
    margin: 0 0 8px;
    position: relative;
  }

  .editor-paragraph:last-child {
    margin-bottom: 0;
  }

  .editor-heading-h1 {
    font-size: 24px;
    color: rgb(5, 5, 5);
    font-weight: 400;
    margin: 0 0 12px;
    padding: 0;
  }

  .editor-heading-h2 {
    font-size: 15px;
    color: rgb(101, 103, 107);
    font-weight: 700;
    margin: 10px 0 0;
    padding: 0;
    text-transform: uppercase;
  }

  .editor-quote {
    margin: 0 0 0 20px;
    font-size: 15px;
    color: rgb(101, 103, 107);
    border-left-color: rgb(206, 208, 212);
    border-left-width: 4px;
    border-left-style: solid;
    padding-left: 16px;
  }

  .editor-list-ol {
    padding: 0;
    margin: 0 0 0 16px;
  }

  .editor-list-ul {
    padding: 0;
    margin: 0 0 0 16px;
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

`;
