import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie, MovieCollection } from 'src/app/interfaces/movies.interface';
import { MovieColectionService } from './../../services/movie-colection.service';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.scss']
})
export class ViewCollectionComponent implements OnInit {

 constructor(private collectionSrv:MovieColectionService,private route:ActivatedRoute,private router:Router) {}

  pageEvent!: PageEvent;

   // MatPaginator Inputs
  length = 20;
  pageSize = 10;

  ngOnInit(): void {
    this.initialize();
  }

  collectionResult!:any;
  savedMovies!:Movie[];

  initialize(){
    this.collectionResult = JSON.parse(this.collectionSrv.getOneMovieCollection(this.route.snapshot.paramMap.get('id') ?? ''));
    console.log(this.collectionResult);
    this.savedMovies=this.collectionResult.movies;
  }


 goToNewTab(id:number){
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/movie/' + id])
    );

    window.open(url, '_blank');
 }

 removeMovie(movie:Movie){
   this.collectionSrv.removeMovieListCollection(this.route.snapshot.paramMap.get('id') ?? '', movie);
   this.initialize();
 }

}
