import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User, LoginDto, RegisterDto, AuthUser } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: LoginDto): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(user => {
          this.storeUserData(user);
          this.currentUserSubject.next(user);
        })
      );
  }

  register(userData: RegisterDto): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register`, userData);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/me`)
      .pipe(
        tap(user => {
          const currentUser = { ...this.currentUserSubject.value, ...user };
          this.storeUserData(currentUser);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }

  private storeUserData(user: AuthUser): void {
    if (user.token) {
      localStorage.setItem('token', user.token);
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
