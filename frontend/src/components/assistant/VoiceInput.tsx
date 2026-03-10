import { useState, useRef, useCallback, useEffect } from "react";
import { Mic, X, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VoiceInputProps {
  open: boolean;
  onClose: () => void;
  onSendToChat: (text: string) => void;
}

const VoiceInput = ({ open, onClose, onSendToChat }: VoiceInputProps) => {
  const { t, currentLangOption } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Clean up recognition on unmount or close
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
    };
  }, []);

  // Reset state when popup closes
  useEffect(() => {
    if (!open) {
      recognitionRef.current?.abort();
      recognitionRef.current = null;
      setIsListening(false);
      setTranscript("");
    }
  }, [open]);

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome.");
      return;
    }

    // Abort any existing instance
    recognitionRef.current?.abort();

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = currentLangOption.speechCode;
    recognition.maxAlternatives = 1;

    let finalTranscript = "";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + " ";
        } else {
          interim = result[0].transcript;
        }
      }
      // Show final + current interim, no accumulation of interim text
      setTranscript(finalTranscript + interim);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Commit final transcript
      if (finalTranscript.trim()) {
        setTranscript(finalTranscript.trim());
      }
    };

    recognitionRef.current = recognition;
    setTranscript("");
    setIsListening(true);
    recognition.start();
  }, [currentLangOption.speechCode]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSendToChat = () => {
    if (transcript.trim()) {
      onSendToChat(transcript.trim());
      setTranscript("");
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-end p-3">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-8 pb-8 space-y-5">
          {/* Mic button */}
          <button
            onClick={handleMicClick}
            className={`relative p-5 rounded-full border-4 transition-all duration-300 ${
              isListening
                ? "border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20"
                : "border-border hover:border-primary hover:bg-primary/5"
            }`}
          >
            {isListening && (
              <span className="absolute inset-0 rounded-full border-4 border-red-500/40 animate-ping" />
            )}
            <Mic className={`w-8 h-8 ${isListening ? "text-red-500" : "text-muted-foreground"}`} />
          </button>

          <p className="text-sm text-muted-foreground font-medium">
            {isListening ? t("listening") : t("clickMicToStart")}
          </p>

          {/* Language indicator */}
          <p className="text-xs text-muted-foreground/70">
            {currentLangOption.name} ({currentLangOption.nativeName})
          </p>

          {/* Transcript */}
          {transcript && (
            <div className="w-full space-y-3">
              <div className="w-full bg-muted rounded-xl p-4 text-sm leading-relaxed max-h-40 overflow-y-auto">
                {transcript}
              </div>
              <button
                onClick={handleSendToChat}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Send className="h-4 w-4" />
                {t("sendToChat")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;
