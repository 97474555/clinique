import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) { }

  email: string = "";
  password: string = "";

  sub(): void {
    console.log(this.email, this.password);

    const members = [
      'syrine@gmail.com',
      
    ];

    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log("Connexion réussie");

        if (members.includes(this.email)) {
          // Si c'est un membre, il va vers book-pilates
          this.router.navigate(['/book-pilates']);
        } else {
          // Sinon, redirection classique (ex: admin)
          this.router.navigate(['/dashboard']);
        }

      })
      .catch(error => {
        console.error("Erreur de connexion", error);
        alert('❌ Email ou mot de passe incorrect');
      });
  }
}
