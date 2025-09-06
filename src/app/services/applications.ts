import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class Applications {
  private base = `${environment.apiUrl}/applications`;
  constructor(private http: HttpClient, public auth: Auth) {}

  apply(application: any): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.base}`, application, { headers });
  }

  myApplications() {
    return this.http.get<any[]>(`${this.base}/mine`);
  }
  jobApplications(jobId: string) {
    return this.http.get<any[]>(`${this.base}/job/${jobId}`);
  }
  updateStatus(id: string, status: string) {
    return this.http.put<any>(`${this.base}/${id}/status`, { status });
  }
  downloadDocument(appId: string, docId: string) {
    const url = `${this.base}/${appId}/document/${docId}/download`;
    return this.http.get(url, {
      responseType: 'blob',
      observe: 'response', // we want headers too
    });
  }
}
