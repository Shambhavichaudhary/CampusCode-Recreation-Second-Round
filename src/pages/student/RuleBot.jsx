import { useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle.js';
import FeaturePage from '../../components/student/FeaturePage.jsx';
import { RULEBOT_ANSWERS } from '../../data/studentPagesData.js';

function answer(question) {
  const hit = RULEBOT_ANSWERS.find((row) => row.match.test(question));
  return hit
    ? hit.text
    : 'I only answer CampusCode workspace rules from this portal: teams, invite codes, rounds, and certificates. Try asking about ReBuild rounds or paid events.';
}

export default function RuleBot() {
  useDocumentTitle('CampusCode — RuleBot AI');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Ask about team names, invite codes, round timing or certificates. Answers stay on this page.' },
  ]);

  function onSubmit(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: 'me', text }, { from: 'bot', text: answer(text) }]);
    setInput('');
  }

  return (
    <FeaturePage
      kicker="AI workspace"
      title="RuleBot AI"
      description="A local Q&A for CampusCode event rules. It does not browse the web or store chats on a server."
    >
      <section className="sd-feature-card sd-chat">
        <div className="sd-chat__log" role="log">
          {messages.map((msg, index) => (
            <p key={`${msg.from}-${index}`} className={`sd-bubble sd-bubble--${msg.from}`}>
              {msg.text}
            </p>
          ))}
        </div>
        <form className="sd-chat__form" onSubmit={onSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a rule…"
            aria-label="Ask RuleBot"
          />
          <button type="submit" className="sd-solid-btn">Send</button>
        </form>
      </section>
    </FeaturePage>
  );
}
