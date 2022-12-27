import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Movie } from 'src/app/interfaces/movies.interface';
import { MovieColectionService } from './../../services/movie-colection.service';

@Component({
  selector: 'app-select-collection',
  templateUrl: './select-collection.component.html',
  styleUrls: ['./select-collection.component.scss']
})
export class SelectCollectionComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<SelectCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movie,private collectionSrv:MovieColectionService) { }

  collections:any[] = [];
  cleanCollections: any[]=[];

  @ViewChild('select') Select!:MatSelect;

  ngOnInit(): void {
     this.collections = JSON.parse(this.collectionSrv.getAllMovieCollections());
    console.log(this.collections);
    this.cleanCollections=this.collections.map((collection) => JSON.parse(collection.value));
     console.log(this.cleanCollections);
  }


  onCancelUserDialog(): void {
    this.dialogRef.close();
  }

}
