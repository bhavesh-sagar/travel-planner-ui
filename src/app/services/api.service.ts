import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://travel-planner-sv.onrender.com/';

  constructor(private http: HttpClient) { }

  getTravelPlan(destination: string) {
    return this.http.post(`${this.baseUrl}api/ultimate-agent`, {
      destination: destination,
      user: "user"
    });
  }

  wakeServer(): Promise<any> {
    return fetch(`${this.baseUrl}`).then(res => res.json());
  }
}