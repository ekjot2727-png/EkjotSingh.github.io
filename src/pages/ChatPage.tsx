// Chatbot page - AI assistant for menstrual health questions

import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Send, Bot, User, MapPin, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { findBestResponse, getFallbackResponse, getSampleDoctors } from '@/lib/chatbot-knowledge';
import { getChatHistory, saveChatHistory } from '@/lib/storage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const history = getChatHistory();
    return history.length > 0 ? history : [
      { role: 'assistant', content: "Hello! 💕 I'm Luna, your menstrual health assistant. I can help answer questions about periods, hygiene, symptoms, and reproductive health. What would you like to know?" }
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    saveChatHistory(messages);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 500));

    // Check for doctor search
    if (userMessage.toLowerCase().includes('doctor') || userMessage.toLowerCase().includes('gynecologist') || userMessage.toLowerCase().includes('find')) {
      const doctors = getSampleDoctors('Jaipur');
      const response = `I found some gynecologists near you:\n\n${doctors.slice(0, 3).map(d => 
        `🏥 **${d.name}**\n📍 ${d.area} (${d.distance})\n⭐ ${d.rating}/5\n📞 ${d.phone}`
      ).join('\n\n')}\n\n*Note: This is demo data. For real results, please use a verified medical directory or Google Maps.*`;
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } else {
      const match = findBestResponse(userMessage);
      const response = match ? match.response : getFallbackResponse();
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }

    setIsTyping(false);
  };

  return (
    <>
      <Helmet>
        <title>Ask Luna - AI Health Assistant</title>
        <meta name="description" content="Get answers to your menstrual health questions from Luna, your AI-powered health assistant." />
      </Helmet>

      <main className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
            <h1 className="text-2xl font-bold">Ask Luna</h1>
            <p className="text-sm text-muted-foreground">Your menstrual health assistant</p>
          </motion.div>

          {/* Messages */}
          <Card className="flex-1 p-4 mb-4 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 scrollbar-soft">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral to-lavender flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm whitespace-pre-wrap
                    ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted rounded-bl-sm'}
                  `}>
                    {msg.content}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-coral to-lavender flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted p-3 rounded-2xl rounded-bl-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </Card>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about periods, hygiene, symptoms..."
              className="flex-1 px-4 py-3 rounded-xl bg-muted border-none focus:ring-2 focus:ring-primary outline-none"
            />
            <Button onClick={handleSend} disabled={!input.trim() || isTyping} size="icon" className="w-12 h-12 rounded-xl">
              <Send className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-3">
            Luna provides general information only. Always consult a healthcare professional for medical advice.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
