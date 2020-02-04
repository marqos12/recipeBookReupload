import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe, Opinion } from '../models/classes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  createRecipe(recipe:Recipe):Observable<number>{
    return this.http.post<number>('api/recipe/createRecipe.php',recipe);
  }

  updateRecipe(recipe:Recipe):Observable<number>{
    return this.http.post<number>('api/recipe/updateRecipe.php',recipe);
  }

  getRecipe(id:string):Observable<Recipe>{
    return this.http.get<Recipe>('api/recipe/getRecipe.php?id='+id);
  }

  getAllRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>('api/recipe/getAllRecipes.php');
  }

  deleteRecipe(recipe:Recipe):Observable<any>{
    return this.http.post<any>('api/recipe/deleteRecipe.php',recipe);
  }

  getOpinion(idRecipe:string):Observable<Opinion[]>{
    return this.http.get<Opinion[]>('api/opinion/getOpinions.php?idRecipe='+idRecipe);
  }

  createOpinion(opinion:Opinion):Observable<any>{
    return this.http.post<any>('api/opinion/createOpinion.php',opinion);
  }

}
