import { Component, OnInit, Input } from '@angular/core';
import { EditUserService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss']
})
export class UserProfileUpdateComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', EmailId: '', BirthDay: '' };

  constructor(
    public fetchApiData: EditUserService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserProfileUpdateComponent>
  ) { }

  ngOnInit(): void {
  }

  updateUserProfile(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      this.dialogRef.close();
      console.log(result);
      localStorage.setItem('user', result.Username);
      this.snackBar.open('Profile updated!', 'OK', {
        duration: 2000
      });
      window.location.reload();
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
