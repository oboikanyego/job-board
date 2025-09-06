import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Jobs } from '../../../services/jobs';
import { Auth } from '../../../services/auth';
import { ActivatedRoute } from '@angular/router';
import { Applications } from '../../../services/applications';

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
export class JobDetail  implements OnInit {
  jobData: any; // ✅ API data for job
  jobForm!: FormGroup;

  jobSectors = ['Retail Banker', 'Corporate Banker', 'Software Engineer'];
  jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  salaryTypes = ['Monthly', 'Yearly', 'Hourly'];

   uploadedFiles: {
    name: string;
    size: number;
    uploaded: number;
    completed: boolean;
    type?: string;
    public_id?: string;
    fileUrl?: string;
    file?: File;
  }[] = [];
  jobId: string | null | undefined;
  currentUser: any ={
    _id:239
  };

  constructor(private fb: FormBuilder,
    private jobs: Jobs,
    public auth: Auth,
    public applications: Applications,
    private route: ActivatedRoute,

  ) {

  }

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      title: [{ value: '', disabled: true }],
      category: [{ value: '', disabled: true }],
      jobSectors: [{ value: [], disabled: true }],
      salaryMin: [{ value: null, disabled: true }],
      salaryMax: [{ value: null, disabled: true }],
      salaryCurrency: [{ value: '', disabled: true }],
      salaryType: [{ value: '', disabled: true }],
      stage: [{ value: '', disabled: true }],
      deadline: [{ value: null, disabled: true }],
      jobType: [{ value: '', disabled: true }],
      location: [{ value: '', disabled: true }],
      coverLetter: [''] // ✅ candidate can still add cover letter
    });
    this.jobId = this.route.snapshot.paramMap.get('id');
    if (this.jobId) {
      this.jobs.get(this.jobId).subscribe(job => 
        this.patchJobDetails(job)
      );
    }

    // if (this.jobData) {
    //   debugger
    //   this.patchJobDetails(this.jobData);
    // }
  }

  patchJobDetails(job: any) {
    this.jobForm.patchValue({
      title: job.title,
      category: job.category,
      jobSectors: job.category ? [job.category] : ["N/A"],
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      salaryCurrency: job.salaryCurrency,
      salaryType: job.salaryType,
      stage: job.stage,
      deadline: job.deadline ? new Date(job.deadline) : null,
      jobType: job.jobType,
      location: job.location
    });

    console.log("Form details:", this.jobForm.get('jobSectors')?.value)
  }

  // Candidate uploads supporting docs
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const sizeInMB = +(file.size / (1024 * 1024)).toFixed(2);

      this.uploadedFiles.push({
      name: file.name,
      size: sizeInMB,
      uploaded: 0,
      completed: false,
      file // keep actual file for FormData upload
    });

      const index = this.uploadedFiles.length - 1;
      let uploaded = 0;
      const interval = setInterval(() => {
        if (uploaded >= sizeInMB) {
          this.uploadedFiles[index].uploaded = sizeInMB;
          this.uploadedFiles[index].completed = true;
          clearInterval(interval);
        } else {
          uploaded += sizeInMB / 10;
          this.uploadedFiles[index].uploaded = +uploaded.toFixed(2);
        }
      }, 300);
    }
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  save() {
  if (!this.jobForm.valid) return;

  const formData = new FormData();
  formData.append('jobId', this.jobId!);
  formData.append('coverLetter', this.jobForm.value.coverLetter);

  this.uploadedFiles.forEach((fileWrapper: any) => {
    formData.append('documents', fileWrapper.file); // actual File object
  });

  this.applications.apply(formData).subscribe({
    next: (res) => console.log("Application submitted ✅", res),
    error: (err) => console.error("Error applying ❌", err)
  });
}


}
