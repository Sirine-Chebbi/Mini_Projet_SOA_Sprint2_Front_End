import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../model/genre.model';

@Component({  
  selector: 'app-update-genres',
  templateUrl: './update-genres.component.html',
  styles: ``
})
export class UpdateGenresComponent {

  @Input()
  genre! : Genre;

  @Input()
  ajout!:boolean;

  @Output()
  genreUpdated = new EventEmitter<Genre>();

  constructor(){};
  ngOnInit(): void {
    //  console.log("ngOnInit du composant UpdateCategorie ",this.genre);
  }

  saveGenre(){
    this.genreUpdated.emit(this.genre);
  }

  modeAjout()
  {
    this.ajout=true;
    this.genre.idG = 0;
    this.genre.nomG="";
  }

  
}
