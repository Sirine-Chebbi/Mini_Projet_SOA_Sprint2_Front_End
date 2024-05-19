import { Component } from '@angular/core';
import { Genre } from '../model/genre.model';
import { SerieService } from '../services/serie.service';

@Component({
  selector: 'app-liste-genres',
  templateUrl: './liste-genres.component.html',
  styles: ``
})
export class ListeGenresComponent {

  genres! : Genre[];
  updatedG:Genre = {"idG":0,"nomG":""};
  ajout:boolean=true;


  constructor(private serieService : SerieService) { }

  ngOnInit(): void {
    this.chargerGenres();
  }

  chargerGenres(){
    this.serieService.listeGenres().
    subscribe(g => {
      if(Array.isArray(g))
        this.genres = g;
        //console.log(g);
    });
    }

  genreUpdated(g:Genre){
    console.log("G updated event",g);
    this.serieService.ajouterGenre(g).
     subscribe( ()=> this.chargerGenres());
  }

  updateG(g:Genre) {
    this.updatedG=g;
    this.ajout=false;
  }
  supprimerGenre(g : Genre) {
    let conf = confirm("Etes-vous sûr ?");
       if (conf)
       {
         this.serieService.supprimerGenre(g.idG).subscribe(() => {
          console.log("Genre supprimée");
          this.chargerGenres(); }  );
       }
  } 
      
  
}
