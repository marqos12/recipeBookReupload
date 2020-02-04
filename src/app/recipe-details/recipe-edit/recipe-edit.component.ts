import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient, Step, Recipe } from 'src/shared/models/classes';
import { RecipeService } from 'src/shared/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { DomSanitizer } from '@angular/platform-browser';
 
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  ingredientList: Ingredient[] = [];
  ingredientForm: FormGroup;
  creatingIngredient: boolean = true;
  stepList: Step[] = [];
  stepForm: FormGroup;
  createStep: boolean = true;
  mark: number = 0;
  favourite: boolean = false;
  editing = false;
  id: string;
  recipe: Recipe;
  initialized = false;
  error='';
public files: UploadFile[] = [];
private image: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,private domSanitizer: DomSanitizer) { }




  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.ingredientForm = this.fb.group({
      amount: [null, Validators.required],
      unit: [null, Validators.required],
      name: [null, Validators.required]
    });


    //,{validator: this.formValidator}
    this.stepForm = this.fb.group({
      description: [null, Validators.required]
    });

    if (this.id == null) {
      this.initEmptyForm();
    }
    else {
      this.editing = true;
      this.recipeService.getRecipe(this.id).subscribe(x => {
        this.recipe = x;
        this.ingredientList = this.recipe.ingredients;
        this.stepList = this.recipe.steps;
        this.mark = this.recipe.mark;
        this.favourite = (this.recipe.favourite == Boolean(1));

        this.initForm();
      })
    }
  }

  initEmptyForm() {
    this.recipeForm = this.fb.group({
      name: [null, Validators.required],
      shortdesc: [null, Validators.required],
      longdesc: [null, Validators.required],
      image: [""]
    });
    this.initialized = true;
  }

  initForm() {
    this.recipeForm = this.fb.group({
      name: [this.recipe.name, Validators.required],
      shortdesc: [this.recipe.shortdesc, Validators.required],
      longdesc: [this.recipe.longdesc, Validators.required],
      image: [null]
    });
    this.image=this.recipe.image;
    this.initialized = true;
  }

  newIngredient() {
    this.addIngredient();
    this.creatingIngredient = true;
  }

  addIngredient() {

    this.creatingIngredient = false;
    let ingredient: Ingredient = { id: null, amount: null, name: null, idRecipe: null, image: null, unit: null };

    ingredient.amount = this.ingredientForm.controls.amount.value;
    ingredient.unit = this.ingredientForm.controls.unit.value;
    ingredient.name = this.ingredientForm.controls.name.value;
    if (ingredient.amount != null && ingredient.unit != null && ingredient.name != null &&
      ingredient.amount.toString() != "" && ingredient.unit.toString() != "" && ingredient.name.toString() != "") {

      this.ingredientList.push(ingredient);

      this.ingredientForm.controls.amount.setValue(null);
      this.ingredientForm.controls.amount.markAsUntouched();
      this.ingredientForm.controls.unit.setValue(null);
      this.ingredientForm.controls.unit.markAsUntouched();
      this.ingredientForm.controls.name.setValue(null);
      this.ingredientForm.controls.name.markAsUntouched();

      this.creatingIngredient = true;
    }
  }

  newStep() {
    this.addStep();
    this.createStep = true;
  }

  addStep() {
    let step: Step = { id: null, idRecipe: null, sequence: null, description: null };

    step.description = this.stepForm.controls.description.value;
    step.sequence = this.stepList.length + 1;
    if (step.sequence != null && step.description != "") {

      this.stepList.push(step);

      this.stepForm.controls.description.setValue(null);
      this.stepForm.controls.description.markAsUntouched();


      //this.createStep = false;
    }
  }

  createRecipe() {
    let unvalid=false;
    if(this.stepList==[]){
      unvalid=true;
    }
    if (this.recipeForm.valid && this.image.length<100000) {
      let image='';  
      if(this.image) image=this.image;
      else image = this.recipeForm.controls.image.value;

      let recipe: Recipe = {
        id: null,
       image: image,
        name: this.recipeForm.controls.name.value,
        shortdesc: this.recipeForm.controls.shortdesc.value,
        longdesc: this.recipeForm.controls.longdesc.value,
        mark: this.mark,
        favourite: this.favourite,
        ingredients: this.ingredientList,
        steps: this.stepList
      };

      if (!this.editing)
        this.recipeService.createRecipe(recipe).subscribe(x => {
          this.router.navigate(['details', x]);
        })
      else {
        recipe.id = Number(this.id);
        this.recipeService.updateRecipe(recipe).subscribe(x => {
          this.router.navigate(['details', this.id]);
        })
      }

    }
    else {
      this.recipeForm.controls.name.markAsTouched();
      this.recipeForm.controls.shortdesc.markAsTouched();
      this.recipeForm.controls.longdesc.markAsTouched();
      if (this.image.length>100000){
      this.error="Zbyt duży obraz";
     this.image=''; }
    }
  }

  removeStep(step: Step) {
    this.stepList.splice(this.stepList.indexOf(step), 1);
  }

  removeIngredient(ingredient: Ingredient) {
    this.ingredientList.splice(this.ingredientList.indexOf(ingredient), 1);
  }

  recipeFormValidator(group: FormGroup) {
    let correct = true;
    /*
        if(group.controls.multipleChoice.value=="Krotność"){
          group.controls.multipleChoice.setErrors({'invalid':true});
        }
        
        if ( group.controls.newUser.value){
          if(group.controls.email.value==""){
            correct=false;
            group.controls.email.setErrors({'invalid':true});
          }
          if(group.controls.password.value==""){
            correct=false;
            group.controls.password.setErrors({'invalid':true});
          }
          if(group.controls.password.value!=group.controls.passwordRepeat.value){
            correct=false;
            group.controls.passwordRepeat.setErrors({'invalid':true});
          }
          group.controls.course.setErrors(null);
        }
        else {
          if(group.controls.course.value=="Kierunek studiów"){
            correct=false;
            group.controls.course.setErrors({'invalid':true});
          }
          group.controls.email.setErrors(null);
          group.controls.password.setErrors(null);
          group.controls.passwordRepeat.setErrors(null);
        }
    
    */
    return correct ? null : true;
  }

public dropped(event: UploadEvent) {
  this.files = event.files;
  for (const droppedFile of event.files) {

    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        this.readThis2(file);
        
      });
    } else {
      const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      console.log(droppedFile.relativePath, fileEntry);
    }
  }
}

public fileOver(event){
  console.log(event);
}

public fileLeave(event){
  console.log(event);
}


changeListener($event): void {
  this.readThis($event.target);
}

readThis(inputValue: any): void {
  var file: File = inputValue.files[0];
  var myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.recipeForm.controls.image.setValue('');
  }
  myReader.readAsDataURL(file);
}

readThis2(inputValue: any): void {
  var file: File = inputValue;
  var myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.recipeForm.controls.image.setValue('');
  }
  myReader.readAsDataURL(file);
}



}
