import { Component } from '@angular/core';
import { DbRecipeService } from '../../services/db-recipe.service';
import { RecipeComponent } from '../recipe/recipe.component';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeComponent, RouterModule, NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  uname: string | null = '';
  upass: string | null = '';
  recipes: any;
  constructor(private recipeService: DbRecipeService, public router: Router) {}
  ngOnInit(): void {
    const uname = window.sessionStorage.getItem('username');
    const upass = window.sessionStorage.getItem('password');
    this.uname = uname;
    this.upass = upass;
    if (this.router.url == '/home') {
      this.recipeService.getAllRecipes().subscribe((recipes) => {
        this.recipes = recipes;
        this.recipes = this.recipes.data;
        console.log(this.recipes, 'rec');
      });
    } else if (this.router.url == '/myrecipes') {
      if (uname) {
        this.recipeService.getRecipesByAuthor(uname).subscribe((recipes) => {
          this.recipes = recipes;
          this.recipes = this.recipes.data;
          console.log(this.recipes, 'myrec');
        });
      }
    }
  }
  onLike(recipeId: string) {
    console.log(recipeId);
  }
  deleteRecipe(recipeId: string) {
    console.log(recipeId);
    const choice = confirm('Do You really want to delete this recipe ?');
    if (choice) {
      this.recipeService.deletRecipe(recipeId).subscribe((recipe) => {
        if (this.uname && this.router.url == '/myrecipes') {
          this.recipeService
            .getRecipesByAuthor(this.uname)
            .subscribe((recipes) => {
              console.log(recipes);

              this.recipes = recipes;
              this.recipes = this.recipes.data;
              console.log(this.recipes, 'myrec');
            });
        } else if (this.uname && this.router.url == '/home') {
          this.recipeService.getAllRecipes().subscribe((recipes) => {
            this.recipes = recipes;
            this.recipes = this.recipes.data;
            console.log(this.recipes, 'rec');
          });
        }
      });
    }
  }
  editRecipe(recipeId: string) {
    console.log(recipeId);
    this.router.navigate(['/editrecipe/' + recipeId]);
  }
}
