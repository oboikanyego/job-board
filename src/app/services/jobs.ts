import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  company?: string;
  employerId?: { name: string };
}

@Injectable({
  providedIn: 'root',
})
export class Jobs {
  private base = `${environment.apiUrl}/jobs`;
  constructor(private http: HttpClient) {}

  create(job: any) {
    return this.http.post<any>(this.base, job);
  }
  list(filters?: { q?: string; category?: string; location?: string; sort?: string }): Observable<Job[]> {
    let params = new HttpParams();
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key as keyof typeof filters]) {
          params = params.set(key, filters[key as keyof typeof filters]!);
        }
      });
    }
    console.log("params",params)
    return this.http.get<Job[]>(this.base, { params });
  }
  get(id: string) {
    return this.http.get<any>(`${this.base}/${id}`);
  }
}
