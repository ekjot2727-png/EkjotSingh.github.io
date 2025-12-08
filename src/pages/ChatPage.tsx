// Chatbot page - AI assistant for menstrual health questions

import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2, Phone, MapPin, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { api } from '@/lib/api';
import type { Doctor } from '@/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  gynecologists?: Doctor[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! 💕 I'm Luna, your menstrual health assistant. I can help answer questions about periods, hygiene, symptoms, and reproductive health. I can also help you find gynecologists in Jaipur! What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      // Send message to backend
      const response = await api.sendMessage(userMessage);

      // Check if response is for gynecologist search
      if (response.type === 'gynecologist_search' || response.content === 'gynecologist_search') {
        // Fetch gynecologists from backend
        const gynecologists = await api.getGynecologists({ city: 'Jaipur' });
        
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `I found ${gynecologists.length} gynecologists in Jaipur for you:`,
          gynecologists: gynecologists.slice(0, 5) // Show top 5
        }]);
      } else {
        // Regular text response
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: response.content 
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I'm having trouble connecting to the server. Please make sure the backend is running." 
      }]);
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
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`p-3 rounded-2xl text-sm whitespace-pre-wrap inline-block
                      ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted rounded-bl-sm'}
                    `}>
                      {msg.content}
                    </div>
                    
                    {/* Gynecologist Results */}
                    {msg.gynecologists && msg.gynecologists.length > 0 && (
                      <div className="mt-3 space-y-3">
                        {msg.gynecologists.map((doctor) => (
                          <Card key={doctor._id} className="p-4 bg-card">
                            <div className="flex flex-col gap-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-base">{doctor.name}</h3>
                                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded">
                                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                  <span className="text-sm font-medium">{doctor.rating}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{doctor.area}, {doctor.city}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                <span>{doctor.phone}</span>
                              </div>

                              {doctor.experience && (
                                <p className="text-sm text-muted-foreground">
                                  Experience: {doctor.experience} years
                                </p>
                              )}

                              {doctor.consultationFee && (
                                <p className="text-sm font-medium text-green-600 dark:text-green-500">
                                  Consultation Fee: ₹{doctor.consultationFee}
                                </p>
                              )}

                              {doctor.services && doctor.services.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {doctor.services.slice(0, 3).map((service, idx) => (
                                    <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
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
