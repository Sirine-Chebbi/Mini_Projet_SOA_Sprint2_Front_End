import { Genre } from "./genre.model";
import { Image } from "./Image.model";


export class Serie {
	idSerie! : number;
	nomSerie! : string;
	nbSerie! : number;
	dateSortie! : Date ;
	genre! : Genre;
	image! : Image
	imageStr!:string
	images!: Image[];
}