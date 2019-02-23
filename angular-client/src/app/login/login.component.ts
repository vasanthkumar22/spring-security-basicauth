import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });


    sessionStorage.setItem('token', '');
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
  if (this.loginForm.invalid) {
    return;
}
    const url = 'http://localhost:8080/login';
    this.http.post<Observable<boolean>>(url, {
      username: this.f.username.value,
    password: this.f.password.value })
    .subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem('token', btoa(this.f.username.value + ':' + this.f.password.value));
        this.router.navigate(['']);
      } else {
        alert('Authentication failed.');
    }
    });
  }

}
