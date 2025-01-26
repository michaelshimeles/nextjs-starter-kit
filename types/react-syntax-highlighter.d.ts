declare module 'react-syntax-highlighter' {
  import { ReactNode } from 'react';

  interface SyntaxHighlighterProps {
    children?: ReactNode;
    language?: string;
    style?: any;
    customStyle?: any;
    codeTagProps?: any;
    useInlineStyles?: boolean;
    showLineNumbers?: boolean;
    startingLineNumber?: number;
    lineNumberStyle?: any;
    wrapLines?: boolean;
    lineProps?: any;
  }

  export default function SyntaxHighlighter(props: SyntaxHighlighterProps): JSX.Element;
}
