import { Component, OnInit } from '@angular/core';
import { Serie } from '../model/serie.model';
import { Genre } from '../model/genre.model';
import { SerieService } from '../services/serie.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styles: ``
})
export class RechercheParGenreComponent implements OnInit {

  series!: Serie[];
  IdGenre!: number;
  genres!: Genre[];

  constructor(private serieService: SerieService) { }

  ngOnInit(): void {
    this.serieService.listeGenres().subscribe(g => {
      if (Array.isArray(g)) {
        this.genres = g;
        console.log("Genres:", this.genres); // Log genres if available
      } else {
        console.error("Genres not found in the response.");
      }
    });
  }

  onChange() {
    if (this.IdGenre) {
      this.serieService.rechercherParGenre(this.IdGenre)
        .subscribe(sers => this.series = sers);
    }
  }
}
