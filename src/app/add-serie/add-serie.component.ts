import { Component, OnInit } from '@angular/core';
import { Serie } from '../model/serie.model';
import { SerieService } from '../services/serie.service';
import { Genre } from '../model/genre.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-serie',
  templateUrl: './add-serie.component.html',
  styleUrl: './add-serie.component.css'
})
export class AddSerieComponent implements OnInit {

  newSerie = new Serie();
  genres!: Genre[];
  newIdG!: number;
  newGenre!: Genre;

  constructor(private serieService: SerieService, private router: Router) { }

  ngOnInit(): void {
    this.serieService.listeGenres().
      subscribe(g => {
        if (Array.isArray(g)) {

        //console.log(g);
        this.genres = g;
        }
      });
  }

  addSerie() {
    this.newSerie.genre = this.genres.find(g => g.idG == this.newIdG)!;
    this.serieService.ajouterSerie(this.newSerie)
      .subscribe(sers => {
        console.log(sers);
        this.router.navigate(['series']);
      });
  }


}
