import { Component } from '@angular/core';
import { SerieService } from '../services/serie.service';
import { Serie } from '../model/serie.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent {

  nomSerie! : string;
  series!: Serie[];
  searchTerm!: string;
  allSeries!: Serie[];

  constructor(private serieService: SerieService) { }

  rechercherSeries(){
    this.serieService.rechercherParNom(this.nomSerie).
    subscribe(sers => {
    this.series = sers;
    console.log(sers)});
  }
  ngOnInit(): void {
    this.serieService.listeSeries().subscribe(sers => {
    console.log(sers);
    this.series = sers;
    });
    }
    onKeyUp(filterText : string){
    this.series = this.allSeries.filter(item =>
    item.nomSerie.toLowerCase().includes(filterText));
    }
    
}
