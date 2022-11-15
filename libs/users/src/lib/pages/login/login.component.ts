import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong!';

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthService, 
    private localStorageService: LocalstorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) return;
    this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe(
      (user) => {
      // Eğer giriş başarılı ise authError devre dışı bırak ve localStorage e token i tanımla
      this.authError = false;
      this.localStorageService.setToken(user.token);
      // Eğer giriş başarılı ise home page e yönlendir
      this.router.navigate(['/']);
    },
    (error: HttpErrorResponse) => {
      // Eğer Http.error.Response status kodu 400 dışında bir hata dönüyor ise AuthMessage aktifleştir ve göster
      this.authError = true;
      if (error.status !== 400) {
        this.authMessage = "Error in the server, please try again later!";
      }
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

}
