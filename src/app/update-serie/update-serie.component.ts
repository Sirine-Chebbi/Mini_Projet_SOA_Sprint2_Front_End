import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SerieService } from '../services/serie.service';
import { Serie } from '../model/serie.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-update-serie',
  templateUrl: './update-serie.component.html',
  styles: ``
})

export class UpdateSerieComponent implements OnInit {

  currentSerie = new Serie();
  genres!: Genre[];
  updateGId!: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private serieService: SerieService) { }


  updateSerie() {
    this.currentSerie.genre = this.genres.
      find(g => g.idG == this.updateGId)!;
    this.serieService.updateSerie(this.currentSerie).subscribe(sers => {
      this.router.navigate(['series']);
    }
    );
  }
  ngOnInit(): void {
    this.serieService.listeGenres().subscribe(g => {

      if (Array.isArray(g)) {
        this.genres = g;
        //console.log("Genres:", this.genres); // Log genres if available
      } else {
        console.error("Genres not found in the response.");
      }

    });
    this.serieService.consulterSerie(this.activatedRoute.snapshot.params['id']).
      subscribe(sers => {
        this.currentSerie = sers;
        this.updateGId = this.currentSerie.genre.idG;
      });
  }

  
}
