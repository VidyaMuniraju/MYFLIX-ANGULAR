import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})
export class SynopsisViewComponent implements OnInit {
  /**
  * Passing data to this component from the movie card component
  */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      imageurl: string;
      description: string;
      director: string;
      genre: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
