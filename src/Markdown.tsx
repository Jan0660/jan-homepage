import React from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownProps = {
    text: string;
};

export const Markdown: React.FC<MarkdownProps> = (
    props: MarkdownProps
) => {
  return (<ReactMarkdown remarkPlugins={[remarkGfm]} className="ReactMarkdown-thing">{props.text}</ReactMarkdown>);
};
