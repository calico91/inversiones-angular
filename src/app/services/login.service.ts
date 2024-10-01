import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Login } from '../interfaces/Login';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ApiResponse';
import { LoginResponse } from '../interfaces/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient);
  private urlBase: String = appsettings.urlBase;

  constructor() { }

  login(loginRequest: Login): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.urlBase}autenticacion/login`,loginRequest)
  }
}
