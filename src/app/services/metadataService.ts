import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetaDataService {
  private baseLocation = `${environment.apiUrl}/locations`;
  private baseCategories = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  // --- Categories ---
  createJobCategory(name: string) {
    return this.http.post<any>(this.baseCategories, { name });
  }

  getJobCategories() {
    return this.http.get<any[]>(this.baseCategories);
  }

  searchJobCategories(query: string) {
    return this.http.get<any[]>(`${this.baseCategories}/search?q=${query}`);
  }

  // --- Locations ---
  searchLocations(query: string) {
    return this.http.get<any[]>(`${this.baseLocation}/search?q=${query}`);
  }
}
