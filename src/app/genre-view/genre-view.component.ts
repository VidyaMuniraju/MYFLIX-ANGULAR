import { Component, OnInit, Inject } from '@angular/core';
import { GetGenreService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {
  /**
  * Passing data to this component from the movie card component
  */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      description: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
