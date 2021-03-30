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

  // async getUser(): Promise<void> {
  //   try {
  //     await this.fetchApiData.getUser().subscribe((result: any) => {
  //       this.user = result;
  //     });
  //     console.log(this.user);
  //     this.movies = await this.fetchApiMovData.getAllMovies();
  //     console.log(this.movies);
  //     // this.favMovies = this.movies.filter((movie: any) =>
  //     //   this.user.FavoriteMovies.includes(movie._id)
  //     // );
  //     // console.log(this.favMovies);
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }

  //   // return;
  // }

  removeFav(id: string, Title: string): void {
    this.fetchApiDelFavData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open(
        `${Title} has been removed from favorites`, 'OK', {
        duration: 2000,
      });
      window.location.reload();
    });
  }

  openUpdateProfileDialog(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '500px',
    });
  }

  openMoviesComponent(): void {
    this.router.navigate(['movies']);
  }

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

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('Log out successful', 'OK', {
      duration: 2000,
    });
  }

}
