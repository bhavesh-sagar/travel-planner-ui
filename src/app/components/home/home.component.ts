import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  destination: string = '';
  result: any;
  loading = false;

  constructor(private api: ApiService, private router: Router) { }

  search() {
    if (!this.destination) return;
    this.api.getTravelPlan(this.destination).subscribe((res: any) => {
      // store result temporarily
      localStorage.setItem('travelData', JSON.stringify(res.data));
      this.router.navigate(['/results']);
    });
  }
}