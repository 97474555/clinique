export class Patient {
    id: number;
    nom: string;
    email: string;
    age: number;
    adresse: string;
  
    constructor(id: number, nom: string, email: string, age: number, adresse: string) {
      this.id = id;
      this.nom = nom;
      this.email = email;
      this.age = age;
      this.adresse = adresse;
    }
  }
  