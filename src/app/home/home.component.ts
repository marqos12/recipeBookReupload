import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/shared/services/recipe.service';
import { Recipe } from 'src/shared/models/classes';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recipeTable:Recipe[][]=[];

  constructor(private router: Router, private recipeService:RecipeService,private spinner: NgxSpinnerService,private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.recipeService.getAllRecipes().subscribe(x=>{
      this.spinner.hide();
      let i = 0;
      let recipeRow:Recipe[]=[];
      x.forEach(recipe=>{
        if(i<3){
          recipeRow.push(recipe);
          i++;
        }
        else {
          i=1;
          this.recipeTable.push(recipeRow);
          recipeRow=[];
          recipeRow.push(recipe);
        }
      })
      this.recipeTable.push(recipeRow);
     
    });
  }

  toNewRecipe(){
    this.router.navigate(['create']);
  }

  showRecipeDetails(recipe:Recipe){
    this.router.navigate(['details',recipe.id]);
  }

}
