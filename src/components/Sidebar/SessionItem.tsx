import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Session } from '~/types/chat';

interface SessionItemProps {
  session: Session;
  isActive: boolean;
  onSelect: (session: Session) => void;
}

export const SessionItem: React.FC<SessionItemProps> = ({ session, isActive, onSelect }) => {
  const formatTitle = (sess: Session) => {
    if (sess.name) return sess.name;
    const dateStr = sess.createdAt ? new Date(sess.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
    return `${sess.client} chat ${dateStr ? `(${dateStr})` : sess.id.slice(0, 6)}`;
  };

  return (
    <div
      className={`session-item ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(session)}
      title={session.id}
    >
      <div className="session-item-title">
        <MessageSquare size={15} style={{ flexShrink: 0, opacity: isActive ? 1 : 0.6 }} />
        <span>{formatTitle(session)}</span>
      </div>
    </div>
  );
};
