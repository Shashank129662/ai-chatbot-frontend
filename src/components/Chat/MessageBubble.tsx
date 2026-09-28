import React, { useState } from 'react';
import { Bot, User, Copy, Check } from 'lucide-react';
import { SessionMessage } from '~/types/chat';

import { MarkdownRenderer } from './MarkdownRenderer';

interface MessageBubbleProps {
  message: SessionMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`message-row ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && (
        <div className="message-avatar assistant">
          <Bot size={16} />
        </div>
      )}

      <div className="message-content-wrapper">
        <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
          {isUser ? (
            message.message
          ) : (
            <MarkdownRenderer content={message.message} />
          )}
        </div>

        {!isUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <button
              className="icon-btn"
              onClick={handleCopy}
              title="Copy message"
              style={{ padding: 4, height: 24, width: 24 }}
            >
              {copied ? <Check size={13} color="#10a37f" /> : <Copy size={13} />}
            </button>
          </div>
        )}
      </div>

      {isUser && (
        <div className="message-avatar" style={{ backgroundColor: '#555555', color: '#fff' }}>
          <User size={16} />
        </div>
      )}
    </div>
  );
};
