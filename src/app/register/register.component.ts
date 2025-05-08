import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  register() {
    this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
    .then((userCredential) => {
        console.log('✅ Utilisateur créé avec succès :', userCredential.user);
        alert('Compte créé avec succès');
        this.router.navigate(['']); // optionnel, pour rediriger vers page login
      })
      .catch((error) => {
        console.error('❌ Erreur lors de la création de l\'utilisateur:', error.code, error.message);
        alert('Erreur : ' + error.message);
      });
  }
}
