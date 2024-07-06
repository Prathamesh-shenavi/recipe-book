import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DbRecipeService } from '../../services/db-recipe.service';
@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
})
export class AddRecipeComponent {
  uname: string | null = '';
  isAdmin = false;
  total_time = 0;
  ingredients: string[] = [];
  ingredientItem: string = '';

  instructions: string[] = [];
  instruction: string = '';
  constructor(private router: Router, private recipeService: DbRecipeService) {}
  ngOnInit() {
    this.uname = sessionStorage.getItem('username');
    console.log(this.uname);
    if (this.uname == 'admin') {
      this.uname = 'admin';
      this.isAdmin = true;
    }
  }
  // checkIfAdmin() {
  //   if (this.uname == 'admin') {
  //     this.uname = '';
  //     this.isAdmin = true;
  //     return false;
  //   }
  //   return true;
  // }
  isIngredientNameRequired(): boolean {
    return this.ingredients.length == 0;
  }
  isInstructionRequired(): boolean {
    return this.instructions.length == 0;
  }
  onFormSubmit(form: NgForm) {
    // console.log(form);
    let formObj: any = form;
    console.log(formObj, 'obj of form');
    formObj.ingredients = this.ingredients;
    formObj.instructions = this.instructions;
    delete formObj.ingredientItem;
    delete formObj.instruction;
    // formObj.ingredientItem = null;
    // formObj.instruction = null;
    let tTime = formObj.prep_time + formObj.cook_time;
    formObj.total_time = `${tTime}`;
    this.recipeService.addRecipe(formObj).subscribe((recipe) => {
      console.log(recipe, 'adding rec');

      console.log(recipe);
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
      this.instructions.push(item);
      this.instruction = '';
    }
  }
  removeInstruction(index: number) {
    this.instructions.splice(index, 1);
  }
  addIngredient() {
    if (this.ingredientItem) {
      const item = this.ingredientItem.trim();
      this.ingredients.push(item);
      this.ingredientItem = '';
    }
  }
  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }
}
