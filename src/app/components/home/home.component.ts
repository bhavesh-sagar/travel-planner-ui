import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
destination: string = '';
  result: any;
  loading = false;

  constructor(private api: ApiService) {}

  search() {
    if (!this.destination) return;

    this.loading = true;

    this.api.getTravelPlan(this.destination).subscribe({
      next: (res: any) => {
        this.result = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
