import { useState } from "react";
import { Globe, Mic, X } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import VoiceInput from "./VoiceInput";
import ChatbotAssistant from "./ChatbotAssistant";

const FloatingAssistant = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [pendingVoiceText, setPendingVoiceText] = useState<string | null>(null);

  const handleVoiceSendToChat = (text: string) => {
    setPendingVoiceText(text);
    setChatOpen(true);
    setVoiceOpen(false);
  };

  const toggleChat = () => {
    setChatOpen((prev) => !prev);
    if (voiceOpen) setVoiceOpen(false);
    if (languageOpen) setLanguageOpen(false);
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Language button */}
        <button
          onClick={() => { setLanguageOpen(true); setVoiceOpen(false); }}
          className="group relative w-11 h-11 rounded-full bg-card border border-border shadow-lg hover:shadow-xl hover:border-primary/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
          aria-label="Select Language"
        >
          <Globe className="h-4.5 w-4.5 text-primary" />
        </button>

        {/* Mic button */}
        <button
          onClick={() => { setVoiceOpen(true); setLanguageOpen(false); }}
          className="group relative w-11 h-11 rounded-full bg-card border border-border shadow-lg hover:shadow-xl hover:border-primary/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
          aria-label="Voice Input"
        >
          <Mic className="h-4.5 w-4.5 text-primary" />
        </button>

        {/* AI Chat button */}
        <button
          onClick={toggleChat}
          className={`relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 ${
            chatOpen
              ? "bg-muted border border-border hover:bg-muted/80"
              : "bg-primary hover:bg-primary/90 shadow-primary/30 hover:shadow-primary/40"
          }`}
          aria-label="AI Assistant"
        >
          {chatOpen ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <span className="text-primary-foreground font-bold text-sm">AI</span>
          )}
        </button>
      </div>

      {/* Modals & Panels */}
      <LanguageSelector open={languageOpen} onClose={() => setLanguageOpen(false)} />
      <VoiceInput
        open={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        onSendToChat={handleVoiceSendToChat}
      />
      <ChatbotAssistant
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        externalMessage={pendingVoiceText}
        onExternalMessageConsumed={() => setPendingVoiceText(null)}
      />
    </>
  );
};

export default FloatingAssistant;
