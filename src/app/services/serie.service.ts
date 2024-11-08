import { Injectable } from '@angular/core';
import { Serie } from '../model/serie.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { GenreWrapper } from '../model/GenreWrapper.model';
import { AuthService } from './auth.service';
import { Image } from "../model/Image.model";

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  }; 


@Injectable({
  providedIn: 'root'
})
export class SerieService {
  apiURLG: string = 'http://localhost:8080/series/g';

  series!: Serie[];

  constructor(private http: HttpClient, private authService: AuthService) { }

  listeSeries(): Observable<Serie[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.get<Serie[]>(apiURL + "/all",{ headers: httpHeaders });
  }
  /*listeSeries(): Observable<Serie[]> {
    let jwt = this.au thService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.get<Serie[]>(apiURL + "/all", { headers: httpHeaders });
  }*/

  ajouterSerie(prod: Serie): Observable<Serie> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.post<Serie>(apiURL + "/addserie", prod, { headers: httpHeaders });
  }

  supprimerSerie(id: number) {
    const url = `${apiURL}/delserie/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterSerie(id: number): Observable<Serie> {
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.get<Serie>(url, { headers: httpHeaders });
  }

  updateSerie(serie: Serie): Observable<Serie> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.put<Serie>(apiURL + "/updateSerie", serie, { headers: httpHeaders });
  }

  listeGenres(): Observable<GenreWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.get<GenreWrapper>(this.apiURLG, { headers: httpHeaders });
  }

  ajouterGenre(g: Genre): Observable<Genre> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.post<Genre>(this.apiURLG, g, { headers: httpHeaders });
  }

  supprimerGenre(id: number) {
    const url = `${this.apiURLG}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterGenre(id: number): Observable<Genre> {
    const url = `${this.apiURLG}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.get<Genre>(url, { headers: httpHeaders });
  }

  updateGenre(genre: Genre): Observable<Genre> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.put<Genre>(this.apiURLG + "/updategenre", genre, { headers: httpHeaders });
  }

  rechercherParGenre(idG: number): Observable<Serie[]> {
    const url = `${apiURL}/serieGenre/${idG}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.get<Serie[]>(url, { headers: httpHeaders });
  }

  rechercherParNom(nom: string): Observable<Serie[]> {
    const url = `${apiURL}/seriesByName/${nom}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt, "Content-Type": "application/json" });
    return this.http.get<Serie[]>(url, { headers: httpHeaders });
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }


  loadImage(id: number): Observable<Image> {
    const url = `${apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageSerie(file: File, filename: string, idSerie:number): Observable<any>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/uplaodImageSerie'}/${idSerie}`;
    return this.http.post(url, imageFormData);
 }
    
 supprimerImage(id : number) {
  const url = `${apiURL}/image/delete/${id}`;
  return this.http.delete(url, httpOptions);
  }


}
