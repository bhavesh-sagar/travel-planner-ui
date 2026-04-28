import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  chatHistory: any[] = [];
  activeChat: any = null;

  ngOnInit() {
    this.newChat();
  }

  newChat() {
    const chat = {
      id: Date.now(),
      title: 'New Chat',
      messages: []
    };
    this.chatHistory.unshift(chat);
    this.activeChat = chat;
  }

  loadChat(chat: any) {
    this.activeChat = chat;
  }

  updateChatTitle(chat: any) {
    if (chat.messages.length > 0) {
      const firstMsg = chat.messages[0].content;
      chat.title = firstMsg.length > 30 ? firstMsg.substring(0, 30) + '...' : firstMsg;
    }
  }
}