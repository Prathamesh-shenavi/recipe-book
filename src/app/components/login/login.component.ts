import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { DbUserService } from '../../services/db-user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  uname: string = '';
  upass: string = '';
  constructor(
    public router: Router,
    private loginService: LoginService,
    private dbUserService: DbUserService
  ) {}
  onLogin() {
    this.dbUserService
      .getUserByUserName(this.uname)
      .subscribe((dbUsers: any[any]) => {
        console.log(dbUsers, 'dbusers');
        const dbUser: any = dbUsers.data.user;
        const id:string = dbUser._id;
        console.log(dbUser, 'dbuser');
        if (this.upass != dbUser?.password) {
          alert('Invalid Credentials');
        } else {
          this.loginService.login(this.uname, this.upass, id);
          this.router.navigate(['/home']);
        }
      });
  }
  onSignUp() {
    console.log(this.uname, 'uname');
    console.log(this.upass, 'upass');
    const user = {
      username: this.uname,
      password: this.upass,
    };
    this.dbUserService.getUserByUserName(this.uname).subscribe((uname) => {
      const names: any = uname;
      console.log(names);
      if (names[0]) {
        alert('Username Already Exists!! Try new Username');
      } else {
        this.dbUserService.addUser(user).subscribe((newUser) => {
          console.log(newUser);
          alert('Successfully registered, Now Login to your account!!');
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
