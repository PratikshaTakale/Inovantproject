import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://dev.myemprove.com/api/ver2api/student-login?lang=en';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
      device_type: 'W',
      device_token: '',
      device_model: '',
      app_version: '',
      os_version: ''
    };
    return this.http.post<any>(this.loginUrl, body);
  }
}
