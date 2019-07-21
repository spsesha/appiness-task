import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cred : any = {}
  passVisible = false

  constructor(private account: AccountService) { }

  ngOnInit() {
  }

  login(): void {
    this.account.login(this.cred.email, this.cred.password)
      .subscribe((res: any) => {
        this.account.loggedIn(res)
      }, (err: any) => {
      })
  }

}
