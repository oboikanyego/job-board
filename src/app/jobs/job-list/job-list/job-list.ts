import { Component, OnInit } from '@angular/core';
import { Jobs } from '../../../services/jobs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MetaDataService } from '../../../services/metadataService';

import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';

interface SortOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-job-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './job-list.html',
  styleUrl: './job-list.css',
})
export class JobList implements OnInit {
  jobs: any[] = []; // Replace with actual job type
  filterForm!: FormGroup;

  sortOptions: SortOption[] = [
    { value: '', label: 'Sort' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];
  categories: any[] = [];
  filteredOptions: Observable<any> | undefined;
  locationOptions$: Observable<any[]> = of([]);

  constructor(
    private jobsService: Jobs,
    private metaDataService: MetaDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      q: [''],
      category: [null],
      location: [''],
      sort: [''],
    });

    this.load();
    this.controlChanges();
  }

  controlChanges() {
    this.metaDataService.getJobCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: (err) => console.error('Failed to fetch categories', err),
    });
    this.filteredOptions = this.filterForm.get('category')!.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name) : this.categories.slice();
      })
    );
    this.locationOptions$ = this.filterForm.get('location')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((value) => typeof value === 'string' && value.length >= 2), // 🚫 ignore objects
      switchMap((value) =>
        this.metaDataService
          .searchLocations(value)
          .pipe(catchError(() => of([])))
      )
    );
  }

  async load() {
    const filters = this.filterForm.value;
    console.log('Filters:', filters);

    // this.jobsService.list(filters).subscribe(res => this.jobs = res);
    this.jobs = [
      {
        _id: '1',
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'Cape Town, South Africa',
        description:
          'We are looking for a frontend developer with Angular experience...',
        type: 'Full-time',
        level: 'Mid',
        remote: true,
        salary: 'R30k - R45k / month',
        skills: ['Angular', 'TypeScript', 'CSS'],
      },
      {
        _id: '2',
        title: 'Backend Developer',
        company: 'Cloud Solutions',
        location: 'Johannesburg, South Africa',
        description:
          'Join our backend team to build scalable Node.js services...',
        type: 'Contract',
        level: 'Senior',
        remote: false,
        salary: 'R50k / month',
        skills: ['Node.js', 'MongoDB', 'Express'],
      },
      {
        _id: '3',
        title: 'UI/UX Designer',
        company: 'Design Studio',
        location: 'Remote',
        description:
          'Creative designer needed to craft intuitive user experiences...',
        type: 'Part-time',
        level: 'Junior',
        remote: true,
        salary: 'R20k / month',
        skills: ['Figma', 'Adobe XD', 'Prototyping'],
      },
    ];

    console.log('this.categories:', this.categories);
  }

  displayFn(category: any): string {
    return category && category.name ? category.name : '';
  }

  displayLocation(option: any): string {
    return option && option.city
      ? `${option.city}, ${option.region}`
      : option || '';
  }

  private _filter(category: string) {
    const filterValue = category.toLowerCase();

    return this.categories.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
