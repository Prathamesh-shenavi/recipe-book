import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DbRecipeService {
  baseURL = 'http://localhost:3000/recipes';
  constructor(private http: HttpClient) {}
  getAllRecipes() {
    return this.http.get(this.baseURL);
  }
  getRecipeById(id: string) {
    return this.http.get(`${this.baseURL}/${id}`);
  }
  getRecipesByAuthor(username: string) {
    return this.http.get(`${this.baseURL}?author=${username}`);
  }
  getRecipesByCategory(category: string) {
    return this.http.get(`${this.baseURL}?category=${category}`);
  }
  addRecipe(recipe: any) {
    return this.http.post(this.baseURL, recipe);
  }
  deletRecipe(id: any) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  updateRecipe( recipe: any) {
    return this.http.put(`${this.baseURL}/${recipe.id}`, recipe);
  }
}
