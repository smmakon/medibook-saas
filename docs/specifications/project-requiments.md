# MediBook SaaS — Cahier des Charges Fonctionnel

## Version du document

| Élément      | Valeur              |
| ------------ | ------------------- |
| Projet       | MediBook SaaS       |
| Version      | 1.0                 |
| Auteur       | Saint-Mathieu Makon |
| Méthodologie | Scrum Agile         |
| Date         | 2026                |

---

# 1. Présentation du projet

## 1.1 Contexte

Le secteur médical nécessite des outils numériques modernes permettant :

* la gestion des rendez-vous médicaux ;
* la gestion des patients ;
* la gestion des médecins ;
* l’automatisation des notifications ;
* la sécurisation des données médicales ;
* la centralisation des opérations administratives.

Le projet **MediBook SaaS** vise à développer une plateforme web moderne permettant aux patients de réserver des rendez-vous médicaux en ligne tout en offrant aux médecins et administrateurs des outils de gestion centralisés.

---

# 2. Objectifs du projet

## 2.1 Objectif principal

Développer une plateforme SaaS sécurisée de gestion des rendez-vous médicaux.

---

## 2.2 Objectifs spécifiques

* Permettre aux patients de réserver des rendez-vous ;
* Permettre aux médecins de gérer leurs disponibilités ;
* Permettre aux administrateurs de gérer la plateforme ;
* Sécuriser les données utilisateurs ;
* Fournir une interface moderne et responsive ;
* Automatiser les notifications email ;
* Créer une architecture scalable et professionnelle.

---

# 3. Utilisateurs du système

## 3.1 Administrateur

### Responsabilités

* Gérer les utilisateurs ;
* Voir les statistiques ;
* Superviser la plateforme ;
* Gérer les rendez-vous ;
* Gérer la sécurité ;
* Gérer les rôles et permissions ;
* Accéder aux logs système.

---

## 3.2 Médecin

### Responsabilités

* Gérer les disponibilités ;
* Voir les rendez-vous ;
* Annuler des rendez-vous ;
* Consulter l’historique ;
* Modifier son profil professionnel ;
* Gérer son calendrier médical.

---

## 3.3 Patient

### Responsabilités

* Créer un compte ;
* Réserver des rendez-vous ;
* Modifier des rendez-vous ;
* Annuler des rendez-vous ;
* Voir l’historique ;
* Gérer son profil utilisateur.

---

# 4. Portée du projet

## 4.1 Fonctionnalités incluses

* Authentification sécurisée ;
* Gestion des rôles ;
* Réservation de rendez-vous ;
* Calendrier médical ;
* Notifications email ;
* Dashboards utilisateurs ;
* Historique des rendez-vous ;
* Sécurité API ;
* Déploiement cloud.

---

## 4.2 Hors périmètre V1

* Paiement en ligne ;
* Vidéoconférence ;
* Intelligence artificielle ;
* Application mobile native ;
* Prescription électronique.

---

# 5. Stack technique

## 5.1 Frontend

* Next.js
* React.js
* Tailwind CSS
* TypeScript
* Axios

---

## 5.2 Backend

* Node.js
* Express.js
* Prisma ORM
* JWT
* bcrypt

---

## 5.3 Base de données

* PostgreSQL

---

## 5.4 Déploiement

| Service         | Plateforme       |
| --------------- | ---------------- |
| Frontend        | Vercel           |
| Backend         | Render           |
| Base de données | PostgreSQL Cloud |

---

# 6. Fonctionnalités du système

# 6.1 Authentification

## Fonctionnalités

* Inscription utilisateur ;
* Connexion utilisateur ;
* JWT Authentication ;
* Gestion des rôles ;
* Routes protégées ;
* Gestion des sessions ;
* Gestion des permissions.

## Endpoints API

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
```

---

# 6.2 Gestion des rendez-vous

## Fonctionnalités

* Réserver un rendez-vous ;
* Modifier un rendez-vous ;
* Annuler un rendez-vous ;
* Vérifier disponibilité médecin ;
* Voir historique des rendez-vous ;
* Gestion des statuts.

## Endpoints API

```http
POST /api/appointments
GET /api/appointments
PATCH /api/appointments/:id
PATCH /api/appointments/:id/cancel
DELETE /api/appointments/:id
```

---

# 6.3 Frontend utilisateur

## Fonctionnalités

* Interface responsive ;
* Dashboard patient ;
* Dashboard médecin ;
* Dashboard administrateur ;
* Navigation sécurisée ;
* Gestion des formulaires ;
* Gestion des erreurs ;
* États de chargement.

---

# 6.4 Notifications email

## Fonctionnalités

* Email de confirmation ;
* Email d’annulation ;
* Email de rappel ;
* Templates emails.

---

# 6.5 Sécurité API

## Fonctionnalités

* Helmet ;
* CORS ;
* Rate Limiting ;
* Validation Zod/Joi ;
* Sanitization ;
* Gestion centralisée des erreurs.

---

# 7. Architecture technique

# 7.1 Architecture globale

Le projet suit une architecture Fullstack moderne basée sur :

* séparation frontend/backend ;
* architecture REST API ;
* authentification JWT ;
* architecture modulaire ;
* séparation des responsabilités.

---

# 7.2 Architecture Frontend

```text
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── hooks/
│   ├── layouts/
│   ├── utils/
│   └── styles/
```

---

# 7.3 Architecture Backend

```text
backend/
├── prisma/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
```

---

# 8. Modèles de données principaux

## User

* id
* firstName
* lastName
* email
* password
* role
* createdAt

---

## Appointment

* id
* patientId
* doctorId
* appointmentDate
* status
* notes

---

## DoctorProfile

* id
* specialization
* availability
* bio

---

## PatientProfile

* id
* phone
* address
* medicalHistory

---

## Notification

* id
* type
* message
* isRead

---

## ActivityLog

* id
* action
* userId
* createdAt

---

# 9. Règles métier

## Règles principales

* Un médecin ne peut pas avoir deux rendez-vous simultanément ;
* Un patient doit être connecté pour réserver ;
* Les rendez-vous doivent avoir un statut ;
* Les annulations doivent être enregistrées ;
* Les routes privées nécessitent un JWT valide ;
* Les emails doivent être uniques ;
* Les rendez-vous passés ne peuvent pas être modifiés ;
* Un patient ne peut réserver qu’un créneau disponible ;
* Les administrateurs ont accès à toutes les ressources.

---

# 10. Validation Rules

## Authentification

* Email obligatoire ;
* Email valide ;
* Mot de passe minimum 8 caractères ;
* Confirmation mot de passe obligatoire.

---

## Rendez-vous

* Date obligatoire ;
* Date future uniquement ;
* Médecin obligatoire ;
* Statut valide uniquement.

---

## Uploads

* Taille maximale respectée ;
* Extensions autorisées uniquement ;
* Nom de fichier sécurisé.

---

# 11. Sécurité

## Mesures de sécurité

* Hashage mots de passe avec bcrypt ;
* Authentification JWT ;
* Validation des requêtes ;
* Rate limiting ;
* CORS ;
* Helmet ;
* Protection des routes privées ;
* Validation des rôles ;
* Sanitization des données.

---

# 12. Organisation Agile

## Méthodologie

Scrum Agile

---

## Structure Jira

```text
EPIC
└── STORY
    └── TASK
        └── SUBTASK
```

---

# 13. Planification Sprint

# Sprint 1

## Contenu

* Analyse ;
* GitHub ;
* Architecture ;
* Initialisation environnement ;
* Wireframes.

---

# Sprint 2

## Contenu

* Base de données ;
* Prisma ;
* Authentification ;
* JWT.

---

# Sprint 3

## Contenu

* Gestion rendez-vous backend ;
* API REST ;
* Validation backend.

---

# Sprint 4

## Contenu

* Frontend ;
* Dashboards ;
* Routes protégées.

---

# Sprint 5

## Contenu

* Notifications ;
* Sécurité API ;
* Optimisation.

---

# Sprint 6

## Contenu

* Tests ;
* Déploiement ;
* Portfolio ;
* Documentation.

---

# 14. Livrables attendus

## Livrables techniques

* Application frontend ;
* API backend ;
* Base PostgreSQL ;
* Documentation API ;
* README professionnel ;
* Architecture technique ;
* Tests backend.

---

## Livrables portfolio

* Captures écran ;
* Démo vidéo ;
* Déploiement production ;
* Repository GitHub ;
* Documentation portfolio.

---

# 15. Workflow Git professionnel

## Branches

```text
main
develop
staging
feature/*
```

---

## Workflow

1. Créer une branche feature ;
2. Développer la fonctionnalité ;
3. Commit ;
4. Push ;
5. Pull Request ;
6. Code Review ;
7. Merge vers develop.

---

# 16. Documentation du projet

## Documentation technique

Le projet contiendra les documentations suivantes :

```text
docs/
├── specifications/
├── business-rules/
├── validation-rules/
├── roles-permissions/
├── architecture/
├── database/
├── setup/
└── api/
```

---

# 17. Conclusion

Le projet MediBook SaaS vise à fournir une solution moderne, sécurisée et scalable pour la gestion des rendez-vous médicaux.

Le projet sera développé selon une méthodologie Agile Scrum avec une architecture professionnelle fullstack moderne permettant :

* une maintenance simplifiée ;
* une sécurité renforcée ;
* une évolutivité future ;
* une expérience utilisateur moderne ;
* une forte valeur portfolio pour le recrutement.
