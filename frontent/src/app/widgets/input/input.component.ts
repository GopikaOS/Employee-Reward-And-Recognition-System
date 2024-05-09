import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class InputComponent {
  @Input() labelName!: string;
  @Input() parentForm!: UntypedFormGroup;
  @Input() type: string= 'text';
  @Input() name!:string;
  @Input() formControls!: string;
  @Input() placeholder!: string;


}
