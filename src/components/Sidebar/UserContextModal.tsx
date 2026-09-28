import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface UserContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  token: string;
  onSave: (userId: string, token: string) => void;
}

export const UserContextModal: React.FC<UserContextModalProps> = ({
  isOpen,
  onClose,
  userId: initialUserId,
  token: initialToken,
  onSave
}) => {
  const [userId, setUserId] = useState(initialUserId);
  const [token, setToken] = useState(initialToken);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(userId.trim(), token.trim());
    onClose();
  };

  const handleClear = () => {
    setUserId('');
    setToken('');
    onSave('', '');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldCheck size={18} color="#10a37f" />
            <h3 className="modal-title">User Authentication Context</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Provide an optional user ID and bearer token to test authenticated queries (e.g. order history, vouchers, or user profile lookups). Leave blank for public/anonymous chat.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="form-group">
            <label className="form-label">User ID (optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. usr_12345"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Auth Token (optional)</label>
            <input
              type="password"
              className="form-input"
              placeholder="e.g. eyJhbGciOi..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={handleClear}>
              Clear & Guest
            </button>
            <button type="submit" className="btn-primary">
              Save Context
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
