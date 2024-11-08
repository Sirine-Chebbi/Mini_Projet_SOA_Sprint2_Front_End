import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SerieService } from '../services/serie.service';
import { Serie } from '../model/serie.model';
import { Genre } from '../model/genre.model';
import { Image } from "../model/Image.model";


@Component({
  selector: 'app-update-serie',
  templateUrl: './update-serie.component.html',
  styles: ``
})

export class UpdateSerieComponent implements OnInit {

  currentSerie = new Serie();
  genres!: Genre[];
  updateGId!: number;
  myImage!: string;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;


  constructor(private activatedRoute: ActivatedRoute, private router: Router, private serieService: SerieService) { }


  updateSerie() {
    this.currentSerie.genre = this.genres.
      find(g => g.idG == this.updateGId)!;

    this.serieService
      .updateSerie(this.currentSerie)
      .subscribe((sers) => {
        this.router.navigate(['series']);
      });
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
        this.updateGId = sers.genre.idG;
      });
  }


  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }

  onAddImageProduit() {
    this.serieService
      .uploadImageSerie(this.uploadedImage, this.uploadedImage.name, this.currentSerie.idSerie)
      .subscribe((img: Image) => {
        this.currentSerie.images.push(img);
      });
  }

  supprimerImage(img: Image) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.serieService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images 
        const index = this.currentSerie.images.indexOf(img, 0);
        if (index > -1) {
          this.currentSerie.images.splice(index, 1);
        }
      });
  }

}

