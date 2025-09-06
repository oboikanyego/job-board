import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Applications } from '../../../services/applications';
import { Auth } from '../../../services/auth';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-my-applications',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    RouterModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.css'
})
export class MyApplications  implements OnInit {
  apps: any[] = [];
  loading = true;
  currentUser: any;

  constructor(
    private applications: Applications,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.user;
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.loading = true;
    this.applications.myApplications().subscribe({
      next: (res: any[]) => {
        this.apps = res;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Failed to fetch applications ❌', err);
        this.loading = false;
      }
    });
  }

  getStatusColor(status: string): 'primary' | 'accent' | 'warn' {
    switch (status) {
      case 'accepted': return 'primary';
      case 'rejected': return 'warn';
      case 'reviewing': return 'accent';
      default: return 'accent';
    }
  }

getFileExtension(fileType: string): string {
  if (fileType.includes('pdf')) return '.pdf';
  if (fileType.includes('application/pdf')) return '.pdf';
  if (fileType.includes('spreadsheet') || fileType.includes('excel') || fileType.includes('csv')) return '.xlsx';
  if (fileType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || fileType.includes('excel') || fileType.includes('csv')) return '.xlsx';
  if (fileType.includes('word') || fileType.includes('doc')) return '.docx';
  return '';
}

downloadDoc(app: any, doc: any): void {
  this.applications.downloadDocument(app._id, doc._id).subscribe({
  next: (resp) => {
    const blob = resp.body!;
    // try to get filename from Content-Disposition header
    const contentDisp = resp.headers.get('content-disposition') || '';
    const filename = this.filenameFromContentDisposition(contentDisp) || (doc.originalName || doc.public_id.split('/').pop()) || 'document';

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },
  error: (err) => console.error('Download failed', err)
});

}
filenameFromContentDisposition(header: string): string | null {
  if (!header) return null;
  // try filename* (UTF-8) first
  const fnStarMatch = header.match(/filename\*=(?:UTF-8''|utf-8'')?([^;]+)/i);
  if (fnStarMatch && fnStarMatch[1]) {
    return decodeURIComponent(fnStarMatch[1].replace(/['"]/g, ''));
  }
  // fallback to filename=
  const fnMatch = header.match(/filename="?([^;"']+)"?/i);
  if (fnMatch && fnMatch[1]) {
    return fnMatch[1];
  }
  return null;
}






}
