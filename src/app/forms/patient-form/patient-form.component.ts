import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent {
  public patientForm: FormGroup;
  public sexes = ['Male', 'Female'];

  constructor(private dialogRef: MatDialogRef<PatientFormComponent>, fb: FormBuilder) {
    this.patientForm = fb.group({
      firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(150)]],
      sex: ['', [Validators.required]],
    });
  }

  public onSubmit() {
    this.dialogRef.close(this.patientForm.value);
  }
}
