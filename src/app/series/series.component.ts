import { Component, OnInit } from '@angular/core';
import { Serie } from '../model/serie.model';
import { SerieService } from '../services/serie.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit {


  series? : Serie[]; //un tableau de produits

constructor(private serieService: SerieService, public authService: AuthService) {
 //this.produits=[];
   }

ngOnInit(): void {
  this.chargerSeries();
}

chargerSeries(){
  this.serieService.listeSeries().subscribe(sers => {
      //console.log(sers);
      this.series = sers;
      this.series.forEach((serie) => {
        serie.imageStr = 'data:' + serie.images[0].type + ';base64,' + serie.images[0].image;
      });
  });
  
  }
supprimerSerie(s: Serie)
{
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
    this.serieService.supprimerSerie(s.idSerie).subscribe(( )=> {
      console.log("Serie supprimé");
      this.chargerSeries();
    });
};

}
