import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-job-detail',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  templateUrl: './job-detail.html',
  styleUrl: './job-detail.css'
})
export class JobDetail {
  jobSectors = ['Retail Banker', 'Corporate Banker', 'Software Engineer'];
  selectedSectors: string[] = [];

  jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  salaryTypes = ['Monthly', 'Yearly', 'Hourly'];

  uploadedFiles: { name: string; size: number; uploaded: number; completed: boolean }[] = [
    { name: 'my-cv.mp4', size: 48, uploaded: 12, completed: false },
    { name: 'google-certificate.mp4', size: 32, uploaded: 32, completed: true }
  ];

  onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    const sizeInMB = +(file.size / (1024 * 1024)).toFixed(2); // ✅ correct size in MB

    this.uploadedFiles.push({
      name: file.name,
      size: sizeInMB,
      uploaded: 0,
      completed: false
    });

    // fake upload simulation
    const index = this.uploadedFiles.length - 1;
    let uploaded = 0;
    const interval = setInterval(() => {
      if (uploaded >= sizeInMB) {
        this.uploadedFiles[index].uploaded = sizeInMB;
        this.uploadedFiles[index].completed = true;
        clearInterval(interval);
      } else {
        uploaded += sizeInMB / 10; // increment in chunks
        this.uploadedFiles[index].uploaded = +uploaded.toFixed(2);
      }
    }, 300);
  }
}
removeFile(index: number) {
  this.uploadedFiles.splice(index, 1);
}




  save() {
    alert('Job details saved!');
  }
}
