import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service'
import { Login } from '../../interfaces/Login';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  public formLogin: FormGroup = this.formBuild.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  iniciarSesion() {
    if (this.formLogin.invalid) return;

    const loginRequest: Login = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    }

    this.loginService.login(loginRequest).subscribe({
      next: (response) => {
        localStorage.setItem("token", response.data.token)
        this.router.navigate(['inicio'])
      },
      error: (error) => {
        this.snackBar.open(error.error.message || 'Ocurrió un error', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }


}
