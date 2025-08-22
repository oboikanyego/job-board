import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Applications {
  private base = `${environment.apiUrl}/applications`;
  constructor(private http: HttpClient) {}

  apply(jobId: string, coverLetter: string) {
    return this.http.post<any>(this.base, { jobId, coverLetter });
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
}
