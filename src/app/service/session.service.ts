import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {}

  isLogged(): boolean {
    const session = sessionStorage.getItem('session');
    return session != null && session.length > 0;
  }

  setSession(): void {
    sessionStorage.setItem('session', 'logged');
  }

  clearSession(): void {
    sessionStorage.removeItem('session');
  }
}
