import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Send,
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  Clock,
  CheckCheck,
} from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Production Team",
    lastMessage: "Quality check completed for Batch #B2024-045",
    time: "2 min ago",
    unread: 2,
    avatar: "PT",
    online: true,
  },
  {
    id: 2,
    name: "Ahmad Hassan",
    lastMessage: "Line C maintenance scheduled for tomorrow",
    time: "15 min ago",
    unread: 0,
    avatar: "AH",
    online: true,
  },
  {
    id: 3,
    name: "Quality Control",
    lastMessage: "New batch ready for inspection",
    time: "1 hour ago",
    unread: 1,
    avatar: "QC",
    online: false,
  },
  {
    id: 4,
    name: "Fatima Ali",
    lastMessage: "Inventory update completed",
    time: "2 hours ago",
    unread: 0,
    avatar: "FA",
    online: true,
  },
  {
    id: 5,
    name: "Sales Team",
    lastMessage: "New order from Karachi distributor",
    time: "3 hours ago",
    unread: 3,
    avatar: "ST",
    online: false,
  },
]

const messages = [
  {
    id: 1,
    sender: "Production Team",
    content: "Quality check completed for Batch #B2024-045. All parameters within acceptable range.",
    time: "2 min ago",
    isOwn: false,
    status: "delivered",
  },
  {
    id: 2,
    sender: "You",
    content: "Great! Please proceed with packaging. What's the final yield?",
    time: "1 min ago",
    isOwn: true,
    status: "read",
  },
  {
    id: 3,
    sender: "Production Team",
    content: "Final yield is 2,450 kg of Premium Basmati. Packaging will start in 30 minutes.",
    time: "Just now",
    isOwn: false,
    status: "delivered",
  },
]

export default function MessagesPage() {
  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Conversations List */}
      <div className="w-80 border-r bg-card">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Button size="sm" variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b hover:bg-accent cursor-pointer transition-colors ${
                conversation.id === 1 ? 'bg-accent' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xs">
                      {conversation.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate mt-0.5">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unread > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-xs min-w-[20px] h-5 flex items-center justify-center">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xs">
                  PT
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Production Team</h3>
                <p className="text-sm text-muted-foreground">5 members • Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Video className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                {!message.isOwn && (
                  <p className="text-xs text-muted-foreground mb-1 px-3">
                    {message.sender}
                  </p>
                )}
                <div
                  className={`rounded-lg px-3 py-2 ${
                    message.isOwn
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <div className={`flex items-center gap-1 mt-1 px-3 ${
                  message.isOwn ? 'justify-end' : 'justify-start'
                }`}>
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                  {message.isOwn && (
                    <CheckCheck className={`w-3 h-3 ${
                      message.status === 'read' ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-card">
          <div className="flex items-end gap-2">
            <Button size="sm" variant="outline">
              <Paperclip className="w-4 h-4" />
            </Button>
            <div className="flex-1 relative">
              <Textarea
                placeholder="Type your message..."
                className="min-h-[40px] max-h-32 resize-none pr-10"
                rows={1}
              />
              <Button size="sm" variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
            <Button size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}