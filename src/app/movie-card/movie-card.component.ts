/**
* Importing required modules and services
*/
import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService, AddFavoriteMoviesService, GetGenreService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  /**
  * Declaring the variables required
  */
  movies: any[] = [];
  searchVar!: string;
  filteredmovies: any[] = [];
  constructor(public fetchApiData: GetAllMoviesService,
    public fetchApiAddFavData: AddFavoriteMoviesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
  * Returns all the movies
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      return this.movies;
    });
  }

  /**
  * This opens the Profile page for the user
  */
  openUserProfileComponent(): void {
    this.router.navigate(['profile']);
  }

  searchBar(text: string): void {
    this.searchVar = text;
    console.log(this.searchVar);
  }

  /**
  * This function adds a movie to the user's favorite list.
  * @param id
  * @param title
  */
  addFav(id: string, Title: string): void {
    this.fetchApiAddFavData.addFavoriteMovies(id).subscribe(() => {
      this.snackBar.open(`${Title} has been added to your favorites!`, 'OK', {
        duration: 2000,
      });
    });
  }

  /**
  * This opens up the genre dialog displaying the details of the genre
  * @param name
  * @param description
  */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: '450px',
    });
  }

  /**
  * This opens up the director dialog displaying the details of the director
  * @param name
  * @param bio
  * @param birth
  * @param death
  */
  openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, death },
      width: '450px',
    });
  }

  /**
  * This opens up the synopsis dialog displaying the details of the movie
  * @param title
  * @param imageurl
  * @param description
  * @param director
  * @param genre
  */
  openSynopsisDialog(title: string, imageurl: string, description: string, director: string, genre: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, imageurl, description, director, genre },
      width: '450px',
    });
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
