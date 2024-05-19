import { Genre } from "./genre.model";

export class Serie {
	idSerie! : number;
	nomSerie! : string;
	nbSerie! : number;
	dateSortie! : Date ;
	genre! : Genre;
}