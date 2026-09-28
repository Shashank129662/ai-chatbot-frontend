import React, { useState } from 'react';
import { Plus, User, Settings2, Sparkles } from 'lucide-react';
import { Clients, Session } from '~/types/chat';
import { SessionItem } from './SessionItem';
import { UserContextModal } from './UserContextModal';

interface SidebarProps {
  isOpen: boolean;
  sessions: Session[];
  activeSessionId: string | null;
  selectedClient: Clients;
  userId: string;
  token: string;
  onSelectSession: (session: Session) => void;
  onNewChat: () => void;
  onChangeClient: (client: Clients) => void;
  onUpdateUserContext: (userId: string, token: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  sessions,
  activeSessionId,
  selectedClient,
  userId,
  token,
  onSelectSession,
  onNewChat,
  onChangeClient,
  onUpdateUserContext
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <aside className={`sidebar ${isOpen ? '' : 'closed'}`}>
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={onNewChat}>
            <div className="new-chat-left">
              <Plus size={16} />
              <span>New chat</span>
            </div>
            <Sparkles size={14} color="#10a37f" />
          </button>

          <div className="client-select-wrapper">
            <label className="label-subtle">Target Platform</label>
            <select
              className="client-select"
              value={selectedClient}
              onChange={(e) => onChangeClient(e.target.value as Clients)}
            >
              <option value={Clients.meribachat}>MeriBachat</option>
              <option value={Clients.benefitwise}>BenefitWise</option>
            </select>
          </div>
        </div>

        <div className="sidebar-nav">
          <div className="session-group-title">Recent Conversations</div>
          {sessions.length === 0 ? (
            <div style={{ padding: '12px 10px', fontSize: 13, color: 'var(--text-muted)' }}>
              No previous chats yet
            </div>
          ) : (
            sessions.map((sess) => (
              <SessionItem
                key={sess.id}
                session={sess}
                isActive={sess.id === activeSessionId}
                onSelect={onSelectSession}
              />
            ))
          )}
        </div>

        <div className="sidebar-footer">
          <button className="user-context-btn" onClick={() => setIsModalOpen(true)}>
            <User size={16} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
              <span style={{ fontWeight: 500 }}>
                {userId ? `User: ${userId}` : 'Guest Session'}
              </span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                {userId ? 'Authenticated' : 'Click to configure auth'}
              </span>
            </div>
            <Settings2 size={14} color="var(--text-muted)" />
          </button>
        </div>
      </aside>

      <UserContextModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
        token={token}
        onSave={onUpdateUserContext}
      />
    </>
  );
};
