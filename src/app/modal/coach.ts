export interface coach {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  speciality: string;

  availability?: string[];  // Peut être une liste de dates disponibles sous forme de chaînes
  appointments?: Appointment[];  // Liste des rendez-vous associés au coach
}

export interface Appointment {
  date: string;  // Date du rendez-vous
  patientId: string;  // ID du patient qui a réservé le rendez-vous
  status: 'En attente' | 'Terminé' | 'Annulé';  // Statut du rendez-vous
}
