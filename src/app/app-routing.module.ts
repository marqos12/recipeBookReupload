import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeEditComponent } from './recipe-details/recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const routes: Routes = [
  {path:"", component:HomeComponent, pathMatch:'full'},
  {path:"create", component:RecipeEditComponent},
  {path:"details/:id", component:RecipeDetailsComponent},
  {path:"edit/:id", component:RecipeEditComponent},
  {path:"**", redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
