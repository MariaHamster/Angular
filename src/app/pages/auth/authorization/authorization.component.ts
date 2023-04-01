import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user/user.service";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  psw: string;
  login: string;
  loginText = 'Логин';
  pswText = 'Пароль';
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;

  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    //Основная работа по инициализации всех данных
    this.authTextButton = 'Авторизоваться';
  }

  ngOnDestroy(): void {
  }

  vipStatusSelected(): void {
  }

  onAuth(ev: Event): void {
    const authUser: IUser = {
      psw: this.psw,
      login: this.login
    }
    if (this.authService.checkUser(authUser)) {
      //console.log('auth true');
      this.messageService.add({severity:'success', summary:'Авторизация прошла успешно'});
      this.router.navigate(['tickets/tickets-list']).then(nav => {console.log(nav);
      }, err => {console.log(err)});
      this.userService.setUser(authUser); //   **user - передать ваш объект с пользователем
    } else {
      //console.log('auth false');
      this.messageService.add({severity:'error', summary:'Логин или пароль введены не верно'});
    }

  }

}
