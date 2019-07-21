import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  details: any = {}

  constructor(
    private account: AccountService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signup(): void{
    let copy = Object.assign({}, this.details)
    delete copy.confirm
    this.account.signup(copy)
      .subscribe((res: any) => {
        this.router.navigateByUrl('/account/login')
      }, (err) => {
      })
  }

}
