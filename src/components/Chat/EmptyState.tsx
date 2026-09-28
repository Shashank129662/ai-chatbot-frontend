import React from 'react';
import { Bot, ShoppingBag, Gift, Package, Tag } from 'lucide-react';
import { Clients } from '~/types/chat';

interface EmptyStateProps {
  client: Clients;
  onSelectPrompt: (prompt: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ client, onSelectPrompt }) => {
  const prompts = [
    {
      icon: Gift,
      header: 'Explore Gift Cards',
      sub: 'Show me top brand gift cards and vouchers',
      query: 'Show me top brand gift cards and vouchers available right now'
    },
    {
      icon: ShoppingBag,
      header: 'Find Products',
      sub: 'Search for electronics and gadgets',
      query: 'Find the best electronics products and tell me their details'
    },
    {
      icon: Tag,
      header: 'Brand Discounts',
      sub: 'What discounts are available for food & dining?',
      query: 'What brand discounts and vouchers are available for food and dining?'
    },
    {
      icon: Package,
      header: 'Track Orders',
      sub: 'Check my recent order details & vouchers',
      query: 'Check the status of my recent orders and voucher codes'
    }
  ];

  return (
    <div className="empty-state">
      <div className="empty-state-logo">
        <Bot size={26} />
      </div>

      <div>
        <h2 className="empty-state-title">How can I help you today?</h2>
        <p className="empty-state-subtitle">
          Connected to {client === Clients.meribachat ? 'MeriBachat' : 'BenefitWise'} AI agent network. Ask about products, brands, discounts, or your order history.
        </p>
      </div>

      <div className="prompt-suggestions">
        {prompts.map((p, idx) => {
          const IconComponent = p.icon;
          return (
            <div
              key={idx}
              className="suggestion-card"
              onClick={() => onSelectPrompt(p.query)}
            >
              <div className="suggestion-header">
                <IconComponent size={16} color="#10a37f" />
                <span>{p.header}</span>
              </div>
              <span className="suggestion-sub">{p.sub}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
