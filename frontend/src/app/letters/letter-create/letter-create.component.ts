import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LettersService } from '../letters.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { CreateLetterDto } from '../../models/letter.model';

@Component({
  selector: 'app-letter-create',
  templateUrl: './letter-create.component.html',
  styleUrls: ['./letter-create.component.scss']
})
export class LetterCreateComponent {
  letterForm: FormGroup;
  isSubmitting = false;
  fileToUpload: File | null = null;

  constructor(
    private fb: FormBuilder,
    private lettersService: LettersService,
    private router: Router,
    private notification: NotificationService
  ) {
    this.letterForm = this.fb.group({
      referenceNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2,4}-\d{4}-\d{3,5}$/)]],
      subject: ['', [Validators.required, Validators.maxLength(200)]],
      content: ['', Validators.maxLength(5000)],
      sender: ['', Validators.required],
      recipient: ['', Validators.required],
      dateReceived: [new Date().toISOString().substring(0, 10), Validators.required],
      file: [null]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.fileToUpload = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.letterForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    const formData = new FormData();
    const formValue: CreateLetterDto = this.letterForm.value;

    // Append all form values except file
    Object.keys(formValue).forEach(key => {
      if (key !== 'file' && formValue[key as keyof CreateLetterDto]) {
        formData.append(key, formValue[key as keyof CreateLetterDto] as string);
      }
    });

    // Append file if exists
    if (this.fileToUpload) {
      formData.append('file', this.fileToUpload);
    }

    this.lettersService.createLetter(formData).subscribe({
      next: (letter) => {
        this.notification.showSuccess('Letter created successfully');
        this.router.navigate(['/letters', letter.id]);
      },
      error: (err) => {
        this.notification.showError(err.error?.message || 'Failed to create letter');
        this.isSubmitting = false;
      }
    });
  }
}
