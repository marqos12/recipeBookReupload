import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Opinion } from 'src/shared/models/classes';
import { RecipeService } from 'src/shared/services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-opinions',
  templateUrl: './opinions.component.html',
  styleUrls: ['./opinions.component.scss']
})
export class OpinionsComponent implements OnInit {
  mark:number = 0;
  opinionForm:FormGroup;
id:string;
  opinionList:Opinion[]=[];


  constructor(private fb: FormBuilder,private recipeService:RecipeService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.recipeService.getOpinion(this.id).subscribe(x=>{
      this.opinionList=x;
    });
    this.initForm();
  }

  initForm(){
    this.opinionForm = this.fb.group({
      author:[null,Validators.required],
      text:[null,Validators.required]
    })
    this.mark=0;
  }

  createOpinion(){
    let opinion: Opinion={id:null,
    author : this.opinionForm.controls.author.value,
    idRecipe : this.id,
    mark : this.mark,
    text : this.opinionForm.controls.text.value};
    this.recipeService.createOpinion(opinion).subscribe(x=>{
      this.opinionList.push(opinion);
      this.opinionForm.reset();
      this.mark=0;
    })

  }
}
