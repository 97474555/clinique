import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(private router: Router) {}
  logout() {
    // Ex : tu peux nettoyer le localStorage/token
    localStorage.clear();
  
    // Et rediriger vers la page login
    this.router.navigate(['']);
  }
}
