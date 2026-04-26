import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  getTravelPlan(destination: string) {
    return this.http.post(`${this.baseUrl}/api/ultimate-agent`, {
      destination: destination,
      user: "bhavesh"
    });
  }
}