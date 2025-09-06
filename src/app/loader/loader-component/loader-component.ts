import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.css',
})
export class LoaderComponent {
  dots = Array(3); // three animated dots
  constructor(public loaderService: LoaderService) {}
}
