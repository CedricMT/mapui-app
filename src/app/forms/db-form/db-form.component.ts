import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-db-form',
  templateUrl: './db-form.component.html',
  styleUrls: ['./db-form.component.scss']
})
export class DbFormComponent {
  public form: FormGroup;
  public sexes = ['Male', 'Female'];

  constructor(
    private dialogRef: MatDialogRef<DbFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data) {

    if (!data) {
      throw new Error("Cannot generate form due to undefined data");
    }

    switch (this.data.collectionName) {
      case 'patient':
        this.form = fb.group({
          firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
          lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
          age: ['', [Validators.required, Validators.min(0), Validators.max(150)]],
          sex: ['', [Validators.required]],
        });

        this.form.get('firstName').setValue(data.firstName);
        this.form.get('lastName').setValue(data.lastName);
        this.form.get('age').setValue(data.age);
        this.form.get('sex').setValue(data.sex);
        break;

      default:
        throw new Error("Cannot to generate form due to collectionName not valid ");
        break;
    }

    console.log('Received data into form', data);
  }

  public onSubmit() {
    this.dialogRef.close(this.form.value);
  }
}
