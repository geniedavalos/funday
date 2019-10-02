import { Component, OnInit, ComponentFactory } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'funday';
  publicRoutes = ['/home', '/login', '/register', '/information', '/devTeam'];
  loggedIn;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.loggedIn = this.authService.checkValidLogin();
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart:', event);
        this.loggedIn = this.authService.checkValidLogin();
        if (!this.loggedIn && !this.publicRoutes.includes(event.url)) {
          router.navigateByUrl('/home');
        } else if (this.loggedIn && event.url === '/home') {
          router.navigateByUrl('/dashboard');
        }
      }
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event);
      }
      if (event instanceof NavigationError) {
        console.log('NavigationError:', event);
      }
    });
  }
  ngOnInit() { }


  logoutButton() {
    const token = localStorage.getItem('access_token');
    this.loggedIn = false;
    if (!token) {
      this.router.navigateByUrl('/home');
    } else {
      this.authService.logout(token).subscribe(result => {
        this.router.navigateByUrl('/home');
      });
    }
  }

  verifyLogin() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('/home');
    } else {
      this.authService.verifyLogin(token).subscribe(result => {
        if (result['name'] && result['name'] === 'TokenExpiredError') {
          this.authService.logout(token).subscribe(logoutResult => {
            this.router.navigateByUrl('/home');
          });
        }
      });
    }
  }
}
