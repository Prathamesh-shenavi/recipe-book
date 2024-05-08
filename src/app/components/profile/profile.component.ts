import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { DbUserService } from '../../services/db-user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { DbRecipeService } from '../../services/db-recipe.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  uname: string | null = '';
  upass: string | null = '';
  uFiexedName = '';
  constructor(
    public router: Router,
    private loginService: LoginService,
    private dbUserService: DbUserService,
    private recipeService: DbRecipeService
  ) {}
  ngOnInit(): void {
    const uname = window.sessionStorage.getItem('username');
    const upass = window.sessionStorage.getItem('password');
    this.uname = uname;
    this.uFiexedName = uname as string;
    this.upass = upass;
  }
  closeForm() {
    this.router.navigate(['/home']);
  }
  onUpdate(form: NgForm) {
    let formObj: any = form;
    this,
      this.dbUserService
        .getUserByUserName(this.uname as string)
        .subscribe((data) => {
          let dbData: any = data;

          if (dbData[0]) {
            alert('Username Already Exists!! Try different Username');
          } else {
            let choice = confirm('Do you really want to update?');
            if (choice) {
              this.dbUserService
                .getUserByUserName(this.uFiexedName)
                .subscribe((data) => {
                  const udata: any = data;
                  formObj.id = udata[0].id;
                  console.log(formObj, 'formObj');
                  this.recipeService
                    .getRecipesByAuthor(this.uFiexedName)
                    .subscribe((data) => {
                      let recipes: any = data;
                      console.log(recipes, 'my recpies');
                      recipes?.forEach((recipe: any) => {
                        recipe.author = this.uname;
                        this.recipeService
                          .updateRecipe(recipe)
                          .subscribe((data) => {
                            console.log('recipes updated');
                          });
                      });
                      console.log(recipes, 'after update');
                    });
                  this.dbUserService.updateUser(formObj).subscribe((data) => {
                    let newUser: any = data;
                    console.log(newUser, 'new user');
                    this.loginService.login(newUser.username, newUser.password);
                    alert('Profile Successfully updated!!');
                    this.router.navigate(['/myrecipes']);
                  });
                });
            }
            
          }
        });
  }
}
