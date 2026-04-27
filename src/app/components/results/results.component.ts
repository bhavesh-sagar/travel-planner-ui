import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent {

  data: any;

  ngOnInit() {
    const stored = localStorage.getItem('travelData');
    this.data = stored ? JSON.parse(stored) : null;
  }
}