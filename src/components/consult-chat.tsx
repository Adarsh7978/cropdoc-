"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Send, Paperclip, Phone } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { getPlaceholderImage } from "@/lib/placeholder-images";

export function ConsultChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "expert",
      text: "Hello! I'm Dr. Green. How can I help you with your crops today? Feel free to share any details or previous diagnosis IDs.",
    },
  ]);
  const [input, setInput] = useState("");

  const expertAvatar = getPlaceholderImage("expert-avatar");
  const expertAvatarSm = getPlaceholderImage("expert-avatar-sm");
  const userAvatarSm = getPlaceholderImage("user-avatar-sm");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), sender: "user", text: input }]);
      setInput("");
      // Simulate expert reply
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: "expert", text: "Thank you for the information. Let me review that..."}])
      }, 1500)
    }
  };

  return (
    <Card className="flex flex-col h-[70vh]">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div className="flex items-center space-x-4">
          <Avatar>
            {expertAvatar && <AvatarImage src={expertAvatar.imageUrl} alt={expertAvatar.description} />}
            <AvatarFallback>DG</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">Dr. Green</p>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
        <Button variant="outline" size="icon">
            <Phone className="h-4 w-4" />
            <span className="sr-only">Start video call</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.sender === "user" ? "justify-end" : ""
                }`}
              >
                {message.sender === "expert" && (
                  <Avatar className="h-8 w-8">
                    {expertAvatarSm && <AvatarImage src={expertAvatarSm.imageUrl} alt={expertAvatarSm.description} />}
                    <AvatarFallback>DG</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs rounded-lg p-3 text-sm lg:max-w-md ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.text}
                </div>
                 {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    {userAvatarSm && <AvatarImage src={userAvatarSm.imageUrl} alt={userAvatarSm.description} />}
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
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
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button type="submit" size="icon" onClick={handleSend} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
