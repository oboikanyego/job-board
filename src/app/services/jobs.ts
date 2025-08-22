import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Jobs {
  private base = `${environment.apiUrl}/jobs`;
  constructor(private http: HttpClient) {}

  create(job: any) {
    return this.http.post<any>(this.base, job);
  }
  list() {
    return this.http.get<any[]>(this.base);
  }
  get(id: string) {
    return this.http.get<any>(`${this.base}/${id}`);
  }
}
