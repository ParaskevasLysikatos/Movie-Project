import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieCollection } from 'src/app/interfaces/movies.interface';
import { MovieColectionService } from './../../services/movie-colection.service';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.scss']
})
export class CreateCollectionComponent implements OnInit {

  constructor(private collectionSrv:MovieColectionService) { }

  ngOnInit(): void {
  }

  submitted = false;
  collectionForm = new FormGroup({
    'title':new FormControl('',[Validators.required]),
    'description':new FormControl('',[Validators.required]),
    'movies':new FormControl([]),
    'id':new FormControl('')
   // 'key':new FormControl('')
  });

  onSubmit()
  {
    this.submitted = true;
      console.log(this.collectionForm.value,'collectionform#');
  //  let key = this.collectionSrv.nextKey();
   // this.collectionForm.controls.key.patchValue(key);
   // this.collectionSrv.saveMovieCollection(key, this.collectionForm.value);
   this.collectionSrv.saveMovieCollection(this.collectionForm.value).subscribe((data)=>{
    this.submitted = false;
    this.collectionForm.reset();
    alert(data.message);
   }, error=>alert(error.message)

   );
    // setTimeout(() => this.submitted = false, 3000);
  }

    get collectionFormControl() {
      return this.collectionForm.controls;
    }

}
