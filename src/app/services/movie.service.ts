import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guest, Movie } from '../interfaces/movies.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

   constructor(private http: HttpClient) { }

  baseurl = "https://api.themoviedb.org/3";
  apikey = "85204a8cc33baf447559fb6d51b18313";

 httpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});

  // searchmovive
  getSearchMovie(data: any): Observable<any> {
    console.log(data, 'movie#');

    return this.http.get<any>(`${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`);
  }

   getMovieDetails(id: number): Observable<Movie> {
     return this.http.get<Movie>(`${this.baseurl}/movie/${id}?api_key=${this.apikey}`);
  }

  getGuestSession(): Observable<Guest> {
     return this.http.get<Guest>(`${this.baseurl}/authentication/guest_session/new?api_key=${this.apikey}`);
  }

    postMovieRating(rating: number,movieId:number,guestSession:string): Observable<any> {
     return this.http.post<any>(`${this.baseurl}/movie/${movieId}/rating?api_key=${this.apikey}&guest_session_id=${guestSession}`,{value:rating},{headers:this.httpHeaders});
  }

}
