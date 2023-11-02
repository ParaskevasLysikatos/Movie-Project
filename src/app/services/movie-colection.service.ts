import { Injectable } from '@angular/core';
import { Movie, MovieCollection } from './../interfaces/movies.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieColectionService {

  //readonly urlCompany="http://localhost:8080/api/companies";
  //readonly urlCompany = `${environment.domain + '/api/companies'}`;

  constructor(private http: HttpClient) { }

  // title of movie collection will be unique

  nextKey(): string {
    let key = 0;
    if (localStorage.length == 0) {
      return String(key);
    }
     for (let i = 0; i <= localStorage.length; i++) {
       key = i;
    }
    return String(key);
  }

 saveMovieCollection(key : string, item :any) { // key will be a number that increments
     localStorage.setItem(key, JSON.stringify(item));
 }

 getOneMovieCollection(key : string) : string {
   return localStorage.getItem(key) ?? '';
 }


 deleteMovieCollection(key : string) {
   localStorage.removeItem(key)
 }

 getAllMovieCollections() : string {
    const collectionList = new Array<any>();
   for (let i = 0; i < localStorage.length; i++) {
     const key = localStorage.key(i) ?? '';
     const value = localStorage.getItem(key);
     if (key && value) {
       const element = { key, value };
       collectionList.push(element);
     }
   }
   return JSON.stringify(collectionList);
 }


 // movie list operations

 addMovieListCollection(collection_key : string,movie:Movie){
   let collection = JSON.parse(this.getOneMovieCollection(collection_key));
   collection?.movies.push(movie);
   this.saveMovieCollection(collection_key, collection);
 }

 removeMovieListCollection(collection_key : string,movie:Movie){
   let collection = JSON.parse(this.getOneMovieCollection(collection_key));
  collection=collection?.movies.filter((object:Movie) => {
      return object.id !== movie.id;
    });
    this.saveMovieCollection(collection_key, collection);
 }


}
