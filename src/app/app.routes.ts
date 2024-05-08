import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { authGuard } from './guards/auth.guard';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'myrecipes',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'home/recipe/:id',
    component: RecipeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'addrecipe',
    component: AddRecipeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'editrecipe/:id',
    component: EditRecipeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'myrecipes/recipe/:id',
    component: RecipeComponent,
    canActivate: [authGuard],
  },
  { path: '**', component: PageNotFoundComponent, canActivate: [authGuard] },
  // {
  //   path: 'home/favrecipes',
  //   component: HomeComponent,
  //   canActivate: [authGuard],
  // },
];
