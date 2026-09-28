import React, { useEffect, useRef } from 'react';
import { PanelLeft, Sparkles } from 'lucide-react';
import { Clients, SessionMessage } from '~/types/chat';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { EmptyState } from './EmptyState';

interface ChatContainerProps {
  messages: SessionMessage[];
  isLoading: boolean;
  selectedClient: Clients;
  onSendMessage: (text: string) => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isLoading,
  selectedClient,
  onSendMessage,
  onToggleSidebar,
  isSidebarOpen
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <main className="chat-main">
      <header className="chat-header">
        <div className="chat-header-left">
          <button
            className="icon-btn"
            onClick={onToggleSidebar}
            title={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <PanelLeft size={18} />
          </button>

          <div className="header-model-pill">
            <span className="status-badge" />
            <Sparkles size={12} color="#10a37f" />
            <span>Claude 3 Sonnet • {selectedClient}</span>
          </div>
        </div>
      </header>

      <div className="messages-viewport">
        {messages.length === 0 ? (
          <EmptyState client={selectedClient} onSelectPrompt={onSendMessage} />
        ) : (
          <div className="messages-container">
            {messages.map((msg, index) => (
              <MessageBubble key={index} message={msg} />
            ))}

            {isLoading && (
              <div className="message-row assistant">
                <div className="message-avatar assistant">
                  <Sparkles size={15} />
                </div>
                <div className="message-content-wrapper">
                  <div className="typing-dots">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} style={{ height: 20 }} />
          </div>
        )}
      </div>

      <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </main>
  );
};
