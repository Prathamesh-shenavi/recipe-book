import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  NgForm,
} from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { DbRecipeService } from '../../services/db-recipe.service';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css',
})
export class EditRecipeComponent {
  uname: string | null = '';
  isAdmin = false;
  total_time = 0;
  title = '';
  author = '';
  description = '';

  ingredients: string[] = [];
  ingredientItem: string = '';
  recipeData: any = {};
  instructions: string[] = [];
  instruction: string = '';
  constructor(
    private router: Router,
    private recipeService: DbRecipeService,
    private actRoute: ActivatedRoute
  ) {
    this.fetchRecipeById();
  }
  ngOnInit() {
    this.uname = sessionStorage.getItem('username');
    console.log(this.uname);
    if (this.uname == 'admin') {
      this.uname = 'admin';
      this.isAdmin = true;
    }
    this.title = this.recipeData?.title;
  }
  fetchRecipeById() {
    this.actRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.recipeService.getRecipeById(id).subscribe((data) => {
          this.recipeData = data;
          this.recipeData = this.recipeData.data;
          console.log(this.recipeData, 'recipe data fetched');
        });
      }
    });
  }
  
  isIngredientNameRequired(): boolean {
    return this.recipeData.ingredients.length == 0;
  }
  isInstructionRequired(): boolean {
    return this.recipeData.instructions.length == 0;
  }
  onFormSubmit(form: NgForm) {
    let formObj: any = form;
    let tTime = formObj.prep_time + formObj.cook_time;
    formObj.total_time = `${tTime}`;
    this.recipeData.total_time = tTime;
    this.recipeService.updateRecipe(this.recipeData).subscribe((recipe) => {
      console.log(recipe);
      
      console.log(recipe, 'updated recipe');
    });
    if (this.isAdmin) {
      this.router.navigate(['/home']);
    } else this.router.navigate(['/myrecipes']);
  }
  closeForm() {
    if (this.isAdmin) {
      this.router.navigate(['/home']);
    } else this.router.navigate(['/myrecipes']);
  }

  addInstruction() {
    if (this.instruction) {
      const item = this.instruction.trim();
      this.recipeData.instructions.push(item);
      this.instruction = '';
    }
  }
  removeInstruction(index: number) {
    this.recipeData.instructions.splice(index, 1);
  }
  addIngredient() {
    if (this.ingredientItem) {
      const item = this.ingredientItem.trim();
      this.recipeData.ingredients.push(item);
      this.ingredientItem = '';
    }
  }
  removeItem(index: number) {
    this.recipeData.ingredients.splice(index, 1);
  }
}
