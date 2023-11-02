import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guest } from 'src/app/interfaces/movies.interface';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

getMovieDetailResult:any;

spoken_languages!: string;

guest!:Guest;

rateStatus: string="Rate this movie!";

// @ViewChild('sliderInput')
//   slider!: HTMLInputElement;
stars: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
selectedValue: number=1;

constructor(private movieSrv:MovieService,private router:ActivatedRoute) {
  let getParamId = this.router.snapshot.paramMap.get('id');
  console.log(getParamId,'getparamid#');

  this.getMovie(getParamId);
 }

  ngOnInit(): void {

  }

  countStar(star: number) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }

getMovie(id:any){
    this.movieSrv.getMovieDetails(id).subscribe((result)=>{
        console.log(result,'getmoviedetails#');
        this.getMovieDetailResult = result;
        this.selectedValue=this.getMovieDetailResult.vote_average;
      this.spoken_languages = result.spoken_languages.map((language: any) => language?.name).join(', ');

      this.movieSrv.getGuestSession().subscribe((res) => {
        console.log(res,'getGuestSession');
        this.guest = res;
      });

    });
  }

// rateForm = new FormGroup({
//     'rating':new FormControl(5)
//   });

  submitForm()
  {
      console.log(this.selectedValue,'rateform#');
    this.movieSrv.postMovieRating(this.selectedValue, Number(this.router.snapshot.paramMap.get('id')), this.guest.guest_session_id)
    .subscribe((res) => {
      console.log(res,'getMovieRating');
      this.rateStatus='You rated this movie. Thank you!'
      this.getMovie(this.router.snapshot.paramMap.get('id'));
    });
  }

}
