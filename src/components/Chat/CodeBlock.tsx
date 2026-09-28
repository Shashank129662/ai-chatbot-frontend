import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  children?: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  const [copied, setCopied] = useState(false);

  let language = '';
  let rawCode = '';

  // Helper to extract raw text content from React children
  const extractText = (node: any): string => {
    if (typeof node === 'string') return node;
    if (typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (React.isValidElement(node) && (node.props as any)?.children) {
      return extractText((node.props as any).children);
    }
    return '';
  };

  if (React.isValidElement(children)) {
    const childProps: any = children.props || {};
    const className = childProps.className || '';
    const match = /language-(\w+)/.exec(className);
    if (match) {
      language = match[1];
    }
    rawCode = extractText(childProps.children);
  } else if (typeof children === 'string') {
    rawCode = children;
  }

  const cleanedCode = rawCode.replace(/\n$/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code to clipboard', err);
    }
  };

  const displayLanguage = language ? language.toLowerCase() : 'code';

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-language">{displayLanguage}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="code-block-copy-btn"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={13} color="#10a37f" />
              <span style={{ color: '#10a37f' }}>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <pre className="code-block-pre">
        {children}
      </pre>
    </div>
  );
};
