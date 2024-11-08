import { Component, OnInit } from '@angular/core';
import { Serie } from '../model/serie.model';
import { SerieService } from '../services/serie.service';
import { Genre } from '../model/genre.model';
import { Router } from '@angular/router';
import { Image } from "../model/Image.model";


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
  uploadedImage!: File;
  imagePath: any;


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


  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }

  addSerie() {
    this.newSerie.genre = this.genres.find(g => g.idG == this.newIdG)!;
    this.serieService.ajouterSerie(this.newSerie)
    .subscribe((e) => {
      this.serieService
      .uploadImageSerie(this.uploadedImage, this.uploadedImage.name, e.idSerie)
      .subscribe((img: Image) => { });
      this.router.navigate(['series']);
    });
  }


}
