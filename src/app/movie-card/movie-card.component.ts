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


  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;
      return this.movies;
    });
  }

  openUserProfileComponent(): void {
    this.router.navigate(['profile']);
  }

  searchBar(text: string): void {
    this.searchVar = text;
    // this.filteredmovies = this.movies.includes(this.searchVar);
    console.log(this.searchVar);
    // if(this.movies.includes(this.searchVar)) {
    //    this.filteredmovies = this.movies.filter((movie: any));
    // }
  }


  addFav(id: string, Title: string): void {
    this.fetchApiAddFavData.addFavoriteMovies(id).subscribe(() => {
      this.snackBar.open(`${Title} has been added to your favorites!`, 'OK', {
        duration: 2000,
      });
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: '450px',
    });
  }

  openDirectorDialog(name: string, bio: string, birth: Date, death: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, death },
      width: '450px',
    });
  }

  openSynopsisDialog(title: string, imageurl: string, description: string, director: string, genre: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, imageurl, description, director, genre },
      width: '450px',
    });
  }

  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('Log out successful', 'OK', {
      duration: 2000,
    });
  }


}
