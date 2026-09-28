import { FormEvent, useEffect, useRef, useState } from 'react';
import { Bot, Maximize2, MessageCircle, Minimize2, Send, Sparkles, X } from 'lucide-react';
import { chatService } from '~/services/chatService';
import { Clients } from '~/types/chat';
import { MarkdownRenderer } from './MarkdownRenderer';

type Message = { id: number; sender: 'user' | 'assistant'; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'assistant', text: 'Hi! I’m **Bachat Buddy** 👋 How can I help you save today?' },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, busy, open, fullscreen]);
  useEffect(() => {
    if (!fullscreen) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setFullscreen(false);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [fullscreen]);

  async function send(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setMessages(current => [...current, { id: Date.now(), sender: 'user', text }]);
    setInput('');
    setBusy(true);
    try {
      let activeId = sessionId;
      if (!activeId) {
        const created = await chatService.createSession({ client: Clients.meribachat });
        if (!created.result) throw new Error();
        activeId = created.result;
        setSessionId(activeId);
      }
      const response = await chatService.sendMessage(activeId, text);
      if (!response.result) throw new Error();
      setMessages(current => [...current, { id: Date.now() + 1, sender: 'assistant', text: response.result! }]);
    } catch {
      setMessages(current => [...current, { id: Date.now() + 1, sender: 'assistant', text: 'I’m having trouble connecting right now. Please try again shortly.' }]);
    } finally { setBusy(false); }
  }

  const close = () => { setOpen(false); setFullscreen(false); };

  return <aside className={['chat-widget', open && 'open', fullscreen && 'fullscreen'].filter(Boolean).join(' ')}>
    <section aria-label="Bachat Buddy chat">
      <header><i><Bot /></i><div><b>Bachat Buddy</b><small>● Online</small></div><div className="chat-actions"><button onClick={() => setFullscreen(value => !value)} aria-label={fullscreen ? 'Exit fullscreen' : 'Open fullscreen'} title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{fullscreen ? <Minimize2 /> : <Maximize2 />}</button><button onClick={close} aria-label="Close chat"><X /></button></div></header>
      <main>{messages.map(message => <div className={message.sender} key={message.id}>{message.sender === 'assistant' && <i><Sparkles /></i>}{message.sender === 'assistant' ? <div className="chat-markdown"><MarkdownRenderer content={message.text} /></div> : <p>{message.text}</p>}</div>)}{busy && <div className="assistant"><i><Sparkles /></i><p className="typing"><b /><b /><b /></p></div>}<span ref={endRef} /></main>
      <form onSubmit={send}><input value={input} onChange={event => setInput(event.target.value)} placeholder="Type your message..." aria-label="Chat message" /><button disabled={!input.trim() || busy} aria-label="Send"><Send /></button></form><small>Powered by MeriBachat AI</small>
    </section>
    {!open && <label>Need help saving? <b>Chat with us</b></label>}
    <button className="launch" onClick={() => setOpen(!open)} aria-label={open ? 'Close chat' : 'Open chat'}>{open ? <X /> : <MessageCircle />}</button>
  </aside>;
}
