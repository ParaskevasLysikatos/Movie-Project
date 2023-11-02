import { Injectable } from '@angular/core';
import { Movie, MovieCollection } from './../interfaces/movies.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieColectionService {

  readonly url = `${environment.domain}`;

   // Http Options
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

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

//  createEmployee(employee: Employee): Observable<Employee> {
//   return this.http
//     .post<Employee>(this.apiURL, employee, this.httpOptions);
// }




 getOneMovieCollection(key : string) : string {
   return localStorage.getItem(key) ?? '';
 }

//  getOneEmployee(id: number): Observable<Employee> {
//   return this.http
//     .get<Employee>(this.apiURL + '/' + id, this.httpOptions);
// }


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
