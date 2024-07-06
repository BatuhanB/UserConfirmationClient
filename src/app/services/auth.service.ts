import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5141/api/account';

  constructor(private http: HttpClient) {}

  login(model: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, model);
  }

  confirm(userId:string,code: string): Observable<any> {
    const url = new URL(this.baseUrl + '/confirm');
    url.searchParams.set('userId', userId);
    url.searchParams.set('code', code);
    return this.http.post<any>(url.toString(), {});
  }
}
