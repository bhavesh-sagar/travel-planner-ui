import { Component, Input, ViewChild, ElementRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { marked } from 'marked';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnDestroy {

  @Input() chat: any;
  @Output() titleChanged = new EventEmitter<any>();
  userInput = '';

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  private typingInterval: any;

  constructor(private api: ApiService) { }

  async send() {
    if (!this.userInput.trim()) {
      return;
    }
    if (!this.chat) {
      this.chat = { messages: [] };
    }
    this.chat.messages.push({
      role: 'user',
      content: this.userInput
    });

    if (this.chat.messages.length === 1) {
      this.chat.title = this.userInput.slice(0, 30);
      this.titleChanged.emit(this.chat);
    }

    const query = this.userInput;
    this.userInput = '';
    this.scrollToBottom(true);
    const index = this.chat.messages.push({
      role: 'bot',
      loading: true,
      content: ''
    }) - 1;

    try {
      await this.api.wakeServer();
      this.api.getTravelPlan(query).subscribe({
        next: (res: any) => {
          const fullText = res.text || '';
          this.chat.messages[index].loading = false;
          if (this.typingInterval) {
            clearInterval(this.typingInterval);
          }

          let rawText = '';
          let i = 0;
          const speed = 15;
          this.typingInterval = setInterval(() => {
            if (i < fullText.length) {
              rawText += fullText.slice(i, i + speed);
              i += speed;
              this.chat.messages[index].content = marked.parse(rawText);
              this.scrollToBottom();
            } else {
              clearInterval(this.typingInterval);
              this.chat.messages[index].content = marked.parse(rawText);
            }
          }, 25);
        },
        error: () => {
          this.chat.messages[index] = {
            role: 'bot',
            content: 'Error fetching response'
          };
        }
      });
    } catch {
      this.chat.messages[index] = {
        role: 'bot',
        content: 'Server waking up, try again...'
      };
    }
  }

  scrollToBottom(force = false) {
    setTimeout(() => {
      const el = this.scrollContainer?.nativeElement;
      if (!el) return;
      const isNearBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight - 80;
      if (force || isNearBottom) {
        el.scrollTop = el.scrollHeight;
      }
    }, 50);
  }

  quick(text: string) {
    this.userInput = text;
    this.send();
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }
}