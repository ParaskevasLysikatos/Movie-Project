import { Injectable } from '@angular/core';
import { Movie, MovieCollection } from './../interfaces/movies.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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

//  saveMovieCollection(key : string, item :any) { // key will be a number that increments
//      localStorage.setItem(key, JSON.stringify(item));
//  }

saveMovieCollection(mc: any ): Observable<any> {
  return this.http
    .post<MovieCollection>(this.url + 'saveCollection', mc, this.httpOptions);
}


//  getOneMovieCollection(key : string) : string {
//    return localStorage.getItem(key) ?? '';
//  }

 getOneMovieCollection(id: number): Observable<any> {
  return this.http
    .get<any>(this.url + 'getOne/' + id, this.httpOptions);
}


//  deleteMovieCollection(key : string) {
//    localStorage.removeItem(key)
//  }

 deleteMovieCollection(id: number): Observable<any> {
  return this.http
    .delete<any>(this.url + 'delete/' + id, this.httpOptions);
}

//  getAllMovieCollections() : string {
//     const collectionList = new Array<any>();
//    for (let i = 0; i < localStorage.length; i++) {
//      const key = localStorage.key(i) ?? '';
//      const value = localStorage.getItem(key);
//      if (key && value) {
//        const element = { key, value };
//        collectionList.push(element);
//      }
//    }
//    return JSON.stringify(collectionList);
//  }


getAllMovieCollections(): Observable<any> {
  return this.http
    .get<MovieCollection[]>(this.url + 'getAll' , this.httpOptions);
}


 // movie list operations

//  addMovieListCollection(collection_key : string,movie:Movie){
//     let collection = JSON.parse(this.getOneMovieCollection(collection_key));
//     collection?.movies.push(movie);
//    this.saveMovieCollection(collection_key, collection);
//  }

//{'collection_id': '','movie':''};
addMovieListCollection(obj:any): Observable<any> {
  return this.http
    .post<any>(this.url + 'addMovie', obj , this.httpOptions);
}



//  removeMovieListCollection(collection_key : string,movie:Movie){
//    let collection = JSON.parse(this.getOneMovieCollection(collection_key));
//   collection=collection?.movies.filter((object:Movie) => {
//       return object.id !== movie.id;
//     });
//    this.saveMovieCollection(collection_key, collection);
//  }

//{'collection_id': '','movie':''};
removeMovieListCollection(obj:any): Observable<any> {
  return this.http
    .post<any>(this.url + 'removeMovie', obj , this.httpOptions);
}


}
