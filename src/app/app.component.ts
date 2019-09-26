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
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('NavigationStart:', event);
        console.log(this.authService.checkValidLogin());
        console.log(this.publicRoutes.includes(event.url));
        if (!this.authService.checkValidLogin() && !this.publicRoutes.includes(event.url)) {
          router.navigateByUrl('/home');
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
}
