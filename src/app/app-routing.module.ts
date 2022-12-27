import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCollectionsComponent } from './components/all-collections/all-collections.component';
import { CreateCollectionComponent } from './components/create-collection/create-collection.component';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ViewCollectionComponent } from './components/view-collection/view-collection.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path:'movie/:id',component:MovieComponent},

  {path:'create-collection',component:CreateCollectionComponent},
  {path:'all-collections',component:AllCollectionsComponent},
  {path:'view-collection/:id',component:ViewCollectionComponent},

	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
