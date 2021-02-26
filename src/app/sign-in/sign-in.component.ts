import { ApiService } from './../Api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public frm: FormGroup;
  public isBusy = false;
  public hasFailed = false;
  public showInputError = false;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private title: Title
  ) {
    this.frm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.title.setTitle('Log in');
  }

  public doSignIn() {
    // Make sure form values are valid
    if (this.frm.invalid) {
      this.showInputError = true;
      return;
    }

    // Reset status
    this.isBusy = true;
    this.hasFailed = false;

    // Grab values from form
    const username = this.frm.get('username').value;
    const password = this.frm.get('password').value;

    // Submit request to API
    this.api.SignIn(username, password).subscribe(
      (response) => {
        this.auth.doSignIn(response.token, response.name);
        this.router.navigate(['todos']);
      },
      (error) => {
        this.isBusy = false;
        this.hasFailed = true;
      }
    );
  }
}
