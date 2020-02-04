import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Recipe } from 'src/shared/models/classes';
import { RecipeService } from 'src/shared/services/recipe.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe:Recipe;
  initialized:boolean = false;
id:string;
  constructor( private route: ActivatedRoute,
    private router: Router,private domSanitizer: DomSanitizer,
    private recipeService:RecipeService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.id = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipe(this.id).subscribe(x=>{
      this.spinner.hide();
      this.recipe=x;
      this.initialized=true;
    })
  }

  editRecipe(){
    this.router.navigate(['edit',this.id]);
  }

  deleteRecipe(){
    this.recipeService.deleteRecipe(this.recipe).subscribe(x=>{this.router.navigate([''])});
  }
}
