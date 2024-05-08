import { Component, Input } from '@angular/core';
import { DbRecipeService } from '../../services/db-recipe.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AddMinPipe } from '../../pipes/add-min.pipe';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [RouterModule,NavbarComponent,CommonModule,AddMinPipe],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  uname: string | null = '';
  upass: string | null = '';
  recipe: any = {
    title: '',
    id: '',
    author: '',
    description: '',
    category: '',
    ingredients: [],
    instructions: [],
    prep_time: '',
    cook_time: '',
    total_time: '',
    servings: '',
  };

  constructor(
    private recipeService: DbRecipeService,
    private actRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const uname = window.sessionStorage.getItem('username');
    const upass = window.sessionStorage.getItem('password');
    this.uname = uname;
    this.upass = upass;
    this.actRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.recipeService.getRecipeById(id).subscribe((data) => {
          this.recipe = data;
          console.log(this.recipe,'in rec');
        });
      }
    });
  }
}
