"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Send, Paperclip, Phone, Loader2 } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { getPlaceholderImage } from "@/lib/placeholder-images";
import { consultExpert } from "@/ai/flows/consult-expert";
import type { ConsultExpertMessage } from "@/ai/schemas/consult-expert";

export function ConsultChat() {
  const [messages, setMessages] = useState<ConsultExpertMessage[]>([
    {
      role: "model",
      content: "Hello! I'm CropDoc AI, your agricultural expert. How can I help you with your crops today? You can ask me about diseases, treatments, or general farming advice.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const expertAvatar = getPlaceholderImage("expert-avatar");
  const expertAvatarSm = getPlaceholderImage("expert-avatar-sm");
  const userAvatarSm = getPlaceholderImage("user-avatar-sm");

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if(viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage: ConsultExpertMessage = { role: "user", content: input };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput("");
      setIsLoading(true);

      try {
        const aiResponse = await consultExpert(newMessages);
        setMessages(prev => [...prev, { role: "model", content: aiResponse }]);
      } catch (error) {
        console.error("Error consulting expert:", error);
        setMessages(prev => [...prev, { role: "model", content: "I'm sorry, I encountered an error. Please try again." }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="flex flex-col h-[70vh]">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div className="flex items-center space-x-4">
          <Avatar>
            {expertAvatar && <AvatarImage src={expertAvatar.imageUrl} alt={expertAvatar.description} />}
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">CropDoc AI Expert</p>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
        <Button variant="outline" size="icon">
            <Phone className="h-4 w-4" />
            <span className="sr-only">Start video call</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="space-y-4 p-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role === "model" && (
                  <Avatar className="h-8 w-8">
                    {expertAvatarSm && <AvatarImage src={expertAvatarSm.imageUrl} alt={expertAvatarSm.description} />}
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs rounded-lg p-3 text-sm lg:max-w-md ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
                 {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    {userAvatarSm && <AvatarImage src={userAvatarSm.imageUrl} alt={userAvatarSm.description} />}
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-end gap-2">
                <Avatar className="h-8 w-8">
                  {expertAvatarSm && <AvatarImage src={expertAvatarSm.imageUrl} alt={expertAvatarSm.description} />}
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="max-w-xs rounded-lg p-3 text-sm lg:max-w-md bg-muted flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin"/>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center space-x-2">
            <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
            </Button>
            <Input
                id="message"
                placeholder="Type your message..."
                className="flex-1"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                disabled={isLoading}
            />
            <Button type="submit" size="icon" onClick={handleSend} disabled={!input.trim() || isLoading}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
