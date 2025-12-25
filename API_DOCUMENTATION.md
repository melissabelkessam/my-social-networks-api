# Documentation API - My Social Networks

## URL de base
```
http://localhost:3000/api
```

---

## 👥 UTILISATEURS

### Créer un utilisateur
- **POST** `/users`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "motdepasse",
  "first_name": "Prénom",
  "last_name": "Nom",
  "phone": "0123456789",
  "avatar": "url_avatar"
}
```

### Obtenir tous les utilisateurs
- **GET** `/users`

### Obtenir un utilisateur
- **GET** `/users/:id`

### Modifier un utilisateur
- **PUT** `/users/:id`

### Supprimer un utilisateur
- **DELETE** `/users/:id`

---

## 👥 GROUPES

### Créer un groupe
- **POST** `/groups`
- **Body:**
```json
{
  "name": "Nom du groupe",
  "description": "Description",
  "type": "public|private|secret",
  "allow_members_post": true,
  "allow_members_create_events": true
}
```

### Obtenir tous les groupes
- **GET** `/groups`

### Obtenir un groupe
- **GET** `/groups/:id`

### Modifier un groupe
- **PUT** `/groups/:id`

### Supprimer un groupe
- **DELETE** `/groups/:id`

### Ajouter un membre
- **POST** `/groups/:id/members`
- **Body:** `{ "user_id": 1 }`

### Retirer un membre
- **DELETE** `/groups/:id/members/:userId`

### Obtenir les membres
- **GET** `/groups/:id/members`

### Ajouter un admin
- **POST** `/groups/:id/admins`
- **Body:** `{ "user_id": 1 }`

### Retirer un admin
- **DELETE** `/groups/:id/admins/:userId`

---

## 🎉 ÉVÉNEMENTS

### Créer un événement
- **POST** `/events`
- **Body:**
```json
{
  "name": "Nom événement",
  "description": "Description",
  "start_date": "2025-01-15 18:00:00",
  "end_date": "2025-01-15 23:00:00",
  "location": "Adresse",
  "is_private": false,
  "group_id": 1
}
```

### Obtenir tous les événements
- **GET** `/events`

### Obtenir un événement
- **GET** `/events/:id`

### Modifier un événement
- **PUT** `/events/:id`

### Supprimer un événement
- **DELETE** `/events/:id`

### Ajouter un organisateur
- **POST** `/events/:id/organizers`
- **Body:** `{ "user_id": 1 }`

### Retirer un organisateur
- **DELETE** `/events/:id/organizers/:userId`

### Obtenir les organisateurs
- **GET** `/events/:id/organizers`

### Ajouter un participant
- **POST** `/events/:id/participants`
- **Body:** `{ "user_id": 1 }`

### Retirer un participant
- **DELETE** `/events/:id/participants/:userId`

### Obtenir les participants
- **GET** `/events/:id/participants`

---

## 💬 FILS DE DISCUSSION

### Créer un fil de discussion
- **POST** `/discussions`
- **Body:** `{ "group_id": 1 }` OU `{ "event_id": 1 }`

### Obtenir le fil d'un groupe
- **GET** `/discussions/group/:groupId`

### Obtenir le fil d'un événement
- **GET** `/discussions/event/:eventId`

### Supprimer un fil
- **DELETE** `/discussions/:id`

### Ajouter un message
- **POST** `/discussions/:threadId/messages`
- **Body:**
```json
{
  "user_id": 1,
  "content": "Message",
  "parent_message_id": null
}
```

### Obtenir les messages
- **GET** `/discussions/:threadId/messages`

### Supprimer un message
- **DELETE** `/discussions/messages/:messageId`

---

## 📸 ALBUMS PHOTO

### Créer un album
- **POST** `/albums`
- **Body:** `{ "event_id": 1, "name": "Album photos" }`

### Obtenir les albums d'un événement
- **GET** `/albums/event/:eventId`

### Supprimer un album
- **DELETE** `/albums/:id`

### Ajouter une photo
- **POST** `/albums/:albumId/photos`
- **Body:**
```json
{
  "user_id": 1,
  "photo_url": "url_photo",
  "caption": "Légende"
}
```

### Obtenir les photos d'un album
- **GET** `/albums/:albumId/photos`

### Supprimer une photo
- **DELETE** `/albums/photos/:photoId`

### Commenter une photo
- **POST** `/albums/photos/:photoId/comments`
- **Body:** `{ "user_id": 1, "comment": "Super photo!" }`

### Obtenir les commentaires
- **GET** `/albums/photos/:photoId/comments`

### Supprimer un commentaire
- **DELETE** `/albums/comments/:commentId`

---

## 📊 SONDAGES

### Créer un sondage
- **POST** `/polls`
- **Body:**
```json
{
  "event_id": 1,
  "organizer_id": 1,
  "title": "Sondage repas"
}
```

### Obtenir les sondages d'un événement
- **GET** `/polls/event/:eventId`

### Supprimer un sondage
- **DELETE** `/polls/:id`

### Ajouter une question
- **POST** `/polls/:pollId/questions`
- **Body:** `{ "question_text": "Quel plat préférez-vous ?" }`

### Obtenir les questions
- **GET** `/polls/:pollId/questions`

### Ajouter une option
- **POST** `/polls/questions/:questionId/options`
- **Body:** `{ "option_text": "Pizza" }`

### Répondre à une question
- **POST** `/polls/questions/:questionId/responses`
- **Body:** `{ "user_id": 1, "option_id": 1 }`

### Obtenir les résultats
- **GET** `/polls/:pollId/results`

---

## 🎫 BILLETTERIE

### Créer un type de billet
- **POST** `/tickets/types`
- **Body:**
```json
{
  "event_id": 1,
  "name": "VIP",
  "price": 50.00,
  "quantity": 100
}
```

### Obtenir les types de billets
- **GET** `/tickets/event/:eventId/types`

### Modifier un type de billet
- **PUT** `/tickets/types/:id`

### Supprimer un type de billet
- **DELETE** `/tickets/types/:id`

### Acheter un billet
- **POST** `/tickets/purchase`
- **Body:**
```json
{
  "ticket_type_id": 1,
  "first_name": "Prénom",
  "last_name": "Nom",
  "address": "Adresse complète"
}
```

### Obtenir les achats d'un événement
- **GET** `/tickets/event/:eventId/purchases`

---

## 🛒 SHOPPING LIST (BONUS)

### Ajouter un item
- **POST** `/shopping`
- **Body:**
```json
{
  "event_id": 1,
  "user_id": 1,
  "item_name": "Chips",
  "quantity": 3,
  "arrival_time": "18:30:00"
}
```

### Obtenir les items d'un événement
- **GET** `/shopping/event/:eventId`

### Modifier un item
- **PUT** `/shopping/:id`

### Supprimer un item
- **DELETE** `/shopping/:id`

---

## 🚗 COVOITURAGE (BONUS)

### Créer une offre
- **POST** `/carpools`
- **Body:**
```json
{
  "event_id": 1,
  "driver_id": 1,
  "departure_location": "Paris",
  "departure_time": "2025-01-15 16:00:00",
  "price": 10.00,
  "available_seats": 3,
  "max_time_difference": 30
}
```

### Obtenir les covoiturages
- **GET** `/carpools/event/:eventId`

### Modifier un covoiturage
- **PUT** `/carpools/:id`

### Supprimer un covoiturage
- **DELETE** `/carpools/:id`

---

## 📝 Notes importantes

- Tous les champs requis doivent être fournis
- Les dates doivent être au format : `YYYY-MM-DD HH:MM:SS`
- Les heures au format : `HH:MM:SS`
- Les prix au format décimal : `10.50`
- Un événement peut avoir soit `group_id`, soit être indépendant (null)
- Un fil de discussion doit avoir soit `group_id` soit `event_id`, pas les deux