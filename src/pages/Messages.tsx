import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, Paperclip, MoreHorizontal, ArrowLeft, Star, Clock } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  thread_id: string;
  sender_id: string;
  recipient_id: string;
  message_content: string;
  sent_at: string;
  read_status: boolean;
  listing_id?: string;
  message_type: 'inquiry' | 'response' | 'general';
  attachments?: any;
  sender_profile?: any;
  profiles?: any;
}

interface Thread {
  id: string;
  subject?: string;
  participants: any;
  last_message_at: string;
  thread_status: 'active' | 'archived' | 'closed';
  related_listing_id?: string;
  last_message?: any;
  unread_count?: number;
  other_participant?: any;
  messages?: any[];
}

const Messages = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchThreads = async () => {
    if (!user) return;

    try {
      const { data: threadsData, error } = await supabase
        .from('message_threads')
        .select(`
          *,
          messages!messages_thread_id_fkey (
            id,
            sender_id,
            message_content,
            sent_at,
            read_status,
            message_type,
            profiles:sender_id (
              first_name,
              last_name,
              profile_picture_url,
              company_profiles (company_name)
            )
          )
        `)
        .contains('participants', [user.id])
        .order('last_message_at', { ascending: false });

      if (error) throw error;

      // Process threads to get other participant info and unread counts
      const processedThreads = await Promise.all(
        (threadsData || []).map(async (thread) => {
          const participantsArray = Array.isArray(thread.participants) ? thread.participants : [];
          const otherUserId = participantsArray.find((id: string) => id !== user.id);
          
          // Get other participant's profile
          let otherParticipant = null;
          if (otherUserId) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select(`
                first_name,
                last_name,
                profile_picture_url,
                company_profiles (company_name)
              `)
              .eq('user_id', otherUserId)
              .single();
            
            otherParticipant = profileData;
          }

          // Get unread message count
          const { count: unreadCount } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('thread_id', thread.id)
            .eq('recipient_id', user.id)
            .eq('read_status', false);

          // Get last message
          const lastMessage = thread.messages?.[0];

          return {
            ...thread,
            other_participant: otherParticipant,
            unread_count: unreadCount || 0,
            last_message: lastMessage
          };
        })
      );

      setThreads(processedThreads);
    } catch (error) {
      console.error('Error fetching threads:', error);
      toast({
        title: "Error",
        description: "Failed to load message threads",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (threadId: string) => {
    try {
      const { data: messagesData, error } = await supabase
        .from('messages')
        .select(`
          *,
          profiles:sender_id (
            first_name,
            last_name,
            profile_picture_url,
            company_profiles (company_name)
          )
        `)
        .eq('thread_id', threadId)
        .order('sent_at', { ascending: true });

      if (error) throw error;

      setMessages(messagesData || []);

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read_status: true })
        .eq('thread_id', threadId)
        .eq('recipient_id', user!.id)
        .eq('read_status', false);

      // Refresh threads to update unread counts
      fetchThreads();
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedThread || !user) return;

    setSending(true);
    try {
      const participantsArray = Array.isArray(selectedThread.participants) ? selectedThread.participants : [];
      const otherUserId = participantsArray.find((id: string) => id !== user.id);
      
      const { error } = await supabase
        .from('messages')
        .insert({
          thread_id: selectedThread.id,
          sender_id: user.id,
          recipient_id: otherUserId,
          message_content: newMessage.trim(),
          message_type: 'response',
          listing_id: selectedThread.related_listing_id
        });

      if (error) throw error;

      // Update thread last_message_at
      await supabase
        .from('message_threads')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', selectedThread.id);

      setNewMessage('');
      fetchMessages(selectedThread.id);
      fetchThreads();
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchThreads();
    }
  }, [user]);

  useEffect(() => {
    if (selectedThread) {
      fetchMessages(selectedThread.id);
    }
  }, [selectedThread]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
              <p className="text-muted-foreground mb-4">
                You need to be logged in to access messages.
              </p>
              <Button onClick={() => navigate('/marketplace')}>
                Go to Marketplace
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString('en-GB', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    }
  };

  const getDisplayName = (profile: any) => {
    if (profile?.company_profiles?.[0]?.company_name) {
      return profile.company_profiles[0].company_name;
    }
    return `${profile?.first_name || 'Unknown'} ${profile?.last_name || 'User'}`;
  };

  const getInitials = (profile: any) => {
    const name = getDisplayName(profile);
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/marketplace')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground">
              Communicate with buyers and sellers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Threads List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Conversations</CardTitle>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 max-h-[400px] overflow-y-auto">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <div key={i} className="p-4 animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-3/4" />
                          <div className="h-3 bg-muted rounded w-1/2" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : threads.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <p>No conversations yet</p>
                    <p className="text-sm mt-1">Start by contacting a seller on a listing</p>
                  </div>
                ) : threads
                    .filter(thread => 
                      !searchQuery || 
                      getDisplayName(thread.other_participant).toLowerCase().includes(searchQuery.toLowerCase()) ||
                      thread.subject?.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((thread) => (
                  <div
                    key={thread.id}
                    className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors border-l-2 ${
                      selectedThread?.id === thread.id ? 'bg-muted border-l-primary' : 'border-l-transparent'
                    }`}
                    onClick={() => setSelectedThread(thread)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={thread.other_participant?.profile_picture_url} />
                        <AvatarFallback>{getInitials(thread.other_participant)}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">
                            {getDisplayName(thread.other_participant)}
                          </p>
                          <div className="flex items-center gap-1">
                            {thread.unread_count && thread.unread_count > 0 && (
                              <Badge variant="default" className="text-xs">
                                {thread.unread_count}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatMessageTime(thread.last_message_at)}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {thread.last_message?.message_content || 'No messages yet'}
                        </p>
                        
                        {thread.subject && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Re: {thread.subject}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedThread ? (
              <>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedThread.other_participant?.profile_picture_url} />
                        <AvatarFallback>{getInitials(selectedThread.other_participant)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {getDisplayName(selectedThread.other_participant)}
                        </CardTitle>
                        {selectedThread.subject && (
                          <CardDescription>Re: {selectedThread.subject}</CardDescription>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <Separator />

                {/* Messages */}
                <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[400px]">
                  {messages.map((message) => {
                    const isOwnMessage = message.sender_id === user.id;
                    return (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={message.sender_profile?.profile_picture_url} />
                          <AvatarFallback className="text-xs">
                            {getInitials(message.sender_profile)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className={`max-w-[70%] ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                          <div
                            className={`p-3 rounded-lg ${
                              isOwnMessage
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.message_content}</p>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {formatMessageTime(message.sent_at)}
                            </span>
                            {isOwnMessage && message.read_status && (
                              <span className="text-xs text-muted-foreground">• Read</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>

                <Separator />

                {/* Message Input */}
                <div className="p-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[60px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-10 w-10"
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={sendMessage}
                        disabled={sending || !newMessage.trim()}
                        size="sm"
                        className="h-10 w-10"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p>Choose a conversation from the list to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Messages;