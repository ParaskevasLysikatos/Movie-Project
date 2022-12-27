import { Component, OnInit } from '@angular/core';
import { MovieColectionService } from './../../services/movie-colection.service';
import { MovieCollection } from 'src/app/interfaces/movies.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-collections',
  templateUrl: './all-collections.component.html',
  styleUrls: ['./all-collections.component.scss']
})
export class AllCollectionsComponent implements OnInit {

  constructor(private collectionSrv:MovieColectionService,private router:Router) { }

  collections!: any[];
  cleanCollections!: any[];

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.collections = JSON.parse(this.collectionSrv.getAllMovieCollections());
    console.log(this.collections);
    this.cleanCollections=this.collections.map((collection) => JSON.parse(collection.value));
     console.log(this.cleanCollections);
  }

  SeeCollection(key:string){
    this.router.navigateByUrl('/view-collection/' + key);
  }


  deleteCollection(key:string){
    this.collectionSrv.deleteMovieCollection(key);
    this.initialize();
  }

}
