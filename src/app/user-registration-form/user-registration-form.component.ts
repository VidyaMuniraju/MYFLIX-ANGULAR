import { Component, OnInit, Input } from '@angular/core';

// you'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// this import brings in the API  calls we created
import { UserRegistrationService } from '../fetch-api-data.service';

// this import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
  * Declaring the input fields required for the functionality to work as required
  */
  @Input() userData = { Username: '', Password: '', EmailId: '', BirthDay: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
  * This is the function responsible for sending the form inputs to the backend
  */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // logic for a successful user registration goes here
      this.dialogRef.close();
      console.log(result);
      this.snackBar.open('User registered successfully!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
