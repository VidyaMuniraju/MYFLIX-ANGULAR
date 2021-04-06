/**
* This opens up the genre dialog displaying the details of the genre
*/
import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService, GetUserService, DeleteFavoriteMoviesService, DeleteUserService } from '../fetch-api-data.service';
import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  /**
  * Declaring the variables required
  */
  user: any = {};
  movies: any = [];
  favMovies: any = [];
  constructor(public fetchApiData: GetUserService,
    public fetchApiMovData: GetAllMoviesService,
    public fetchApiDelFavData: DeleteFavoriteMoviesService,
    public fetchApiDelUserData: DeleteUserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
  * Returns the data about the user
  */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((result: any) => {
      this.user = result;
      // this.getMovies();
      this.fetchApiMovData.getAllMovies().subscribe((response: any) => {
        this.movies = response;
        // this.FavMovies;
        this.favMovies = this.movies.filter((movie: any) =>
          this.user.FavoriteMovies.includes(movie._id)
        );
        return this.favMovies;
      });
    });
  }

  /**
  * This deletes a movie from the user's favorite movies list
  * @param id
  * @param Title
  */
  removeFav(id: string, Title: string): void {
    this.fetchApiDelFavData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open(
        `${Title} has been removed from favorites`, 'OK', {
        duration: 2000,
      });
      window.location.reload();
    });
  }

  /**
  * This opens up the dialog to update user's profile
  */
  openUpdateProfileDialog(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '500px',
    });
  }


  /**
  * Navigating back to the movies page
  */
  openMoviesComponent(): void {
    this.router.navigate(['movies']);
  }

  /**
  * This deletes the user's account from the application.
  */
  deleteUser(): void {
    let okay = confirm("Are you sure you want to delete your profile?");
    if (okay) {
      this.fetchApiDelUserData.deleteUser().subscribe(() => {
        console.log('profile deleted');
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Profile Deleted', 'OK', {
          duration: 2000,
        });
      });
    } else {
      window.location.reload();
    }
  }

  /**
  * Logging out the user from the application
  */
  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('Log out successful', 'OK', {
      duration: 2000,
    });
  }

}
