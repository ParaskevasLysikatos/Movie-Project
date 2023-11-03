import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movies.interface';
import { MovieColectionService } from 'src/app/services/movie-colection.service';
import { MovieService } from 'src/app/services/movie.service';
import { SelectCollectionComponent } from './../select-collection/select-collection.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private movieSrv:MovieService,private router:Router,public dialog: MatDialog,private collectionSrv:MovieColectionService) {}

  pageEvent!: PageEvent;

   // MatPaginator Inputs
  length = 20;
  pageSize = 10;

  submitted = false;

  ngOnInit(): void {
  }

  searchResult:Movie[]=[];
  searchForm = new FormGroup({
    'movieName':new FormControl('',[Validators.required,Validators.minLength(3)])
  });

  submitForm()
  {
    this.submitted = true;
      console.log(this.searchForm.value,'searchform#');
      this.movieSrv.getSearchMovie(this.searchForm.value).subscribe((result)=>{
          console.log(result,'searchmovie##');
          this.searchResult = result.results;
          this.submitted = false;
      });
  }

 get searchFormControl() {
    return this.searchForm.controls;
  }

 goToNewTab(id:number){
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/movie/' + id])
    );

    window.open(url, '_blank');
 }

  myTempDialog: any;

  openAddDialog(movie:Movie) {
   this.myTempDialog = this.dialog.open(SelectCollectionComponent, { data: movie, width: '450px', height: '450px', autoFocus: true});
    this.myTempDialog.afterClosed().subscribe((res:any) => {
      // this.collectionSrv.addMovieListCollection(res.key, res.movie);
      // console.log('The Info dialog was closed.');
      let obj={'collection_id':res.key, 'movie': res.movie};
        this.collectionSrv.addMovieListCollection(obj).subscribe((data:any) => {
          console.log('The Info dialog was closed.');
          alert(data.message);
        },err=>alert(err.error.message));
    });
  }



}
