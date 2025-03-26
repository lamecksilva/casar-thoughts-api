# Documentação da API - Casar Thoughts

## Introdução

Aplicativo de mídia social chamado "Thoughts"

"Thoughts" é muito semelhante ao Twitter, mas com menos funcionalidades.
O "Thoughts" possui apenas duas páginas, a página inicial e a página de perfil do usuário.

## Endpoints

### 1. Feed

#### **Obter feed de posts**

`GET /posts/feed`

**Parâmetros:**

- `page` (número, obrigatório): Número da página.
- `limit` (número, obrigatório): Limite de posts por página.
- `type` (string, obrigatório): Tipo do feed (exemplo: "FOLLOWING", "ALL").
- `userId` (string, opcional): ID do usuário para personalização do feed.

> > Quando o `type` for "FOLLOWING", é preciso enviar o campo `userId`
> >
> > > O campo `userId` é uma forma de simular um usuário autenticado.

**Resposta (200):**

```json
{
  "total": 10,
  "posts": [
    {
      "id": "36b8d4d4-b764-4bb5-9c92-5e5835bb1b7c",
      "text": "Vorax verto supplanto viridis.",
      "userId": "6653adf5-714a-40bf-a2a3-ef0a2d413148",
      "user": {
        "id": "6653adf5-714a-40bf-a2a3-ef0a2d413148",
        "name": "Walter51",
        "displayName": "Walter 51 years"
      },
      "createdAt": "2025-03-26",
      "sentiment": "pos"
    }
  ]
}
```

### 2. Feed de um Usuário

#### **Obter posts de um usuário**

`GET /posts/user/{username}`

**Parâmetros:**

- `username` (string, obrigatório): Nome de usuário.
- `page` (número, obrigatório): Número da página.
- `limit` (número, obrigatório): Limite de posts por página.

**Resposta (200):**

```json
{
  "total": 10,
  "posts": [
    {
      "id": "36b8d4d4-b764-4bb5-9c92-5e5835bb1b7c",
      "text": "Vorax verto supplanto viridis.",
      "userId": "6653adf5-714a-40bf-a2a3-ef0a2d413148",
      "user": {
        "id": "6653adf5-714a-40bf-a2a3-ef0a2d413148",
        "name": "Walter51",
        "displayName": "Walter 51 years"
      },
      "createdAt": "2025-03-26",
      "sentiment": "pos"
    }
  ]
}
```

### 3. Criação de Posts

#### **Criar um post**

`POST /posts`

**Parâmetros:**

- `authenticatedUserId` (string, obrigatório): ID do usuário autenticado.

> > > O campo `authenticatedUserId` é uma forma de simular um usuário autenticado.

**Corpo da requisição:**

```json
{
  "text": "Lorem Ipsum",
  "originalPostId": "02e09ae5-b504-48dd-8944-edaf9c204e56"
}
```

- O usuário só pode criar 5 posts no mesmo dia.
- O campo `text` pode ter até 200 caracteres.

> Os posts podem ser posts normais, reposts e reposts com comentário.
>
> > Para criar um post normal, _NÃO_ deve ser enviado o campo `originalPostId`.
> > Para criar um repost, _DEVE_ ser enviado o campo `originalPostId` com o ID do post original a ser repostado.
> > Para criar um Repost com comentário, _DEVE_ ser enviado os campos `text` e `originalPostId`.

#### Text Sentiment API

Caso ocorra problema na conexão com a Text Processing Sentiment API,
modifique a variável de ambiente (docker-compose.yml) `ALLOW_TEXT_PROCESSING` como `false`.

> > **Resposta (201):**

```json
{
  "id": "36b8d4d4-b764-4bb5-9c92-5e5835bb1b7c",
  "text": "Lorem Ipsum",
  "userId": "6653adf5-714a-40bf-a2a3-ef0a2d413148",
  "user": {
    "id": "6653adf5-714a-40bf-a2a3-ef0a2d413148",
    "name": "Walter51",
    "displayName": "Walter 51 years"
  },
  "createdAt": "2025-03-26",
  "sentiment": "pos"
}
```

### 4. Perfil de Usuário

#### **Obter perfil de um usuário**

`GET /users/{username}`

**Parâmetros:**

- `username` (string, obrigatório): Nome do usuário.
- `authenticatedUserId` (string, opcional): ID do usuário autenticado.

> > > O campo `authenticatedUserId` é uma forma de simular um usuário autenticado.

**Resposta (200):**

```json
{
  "id": "f30c9331-d8b0-4052-be48-df73b4002fdc",
  "username": "Edison56",
  "memberSince": "24/02/2025",
  "followers": 5,
  "following": 12,
  "posts": 15,
  "isFollowing": false
}
```

### 5. Seguir e Deixar de Seguir Usuários

#### **Seguir um usuário**

`POST /users/{id}/follow`

**Parâmetros:**

- `id` (string, obrigatório): ID do usuário a ser seguido.
- `authenticatedUserId` (string, obrigatório): ID do seguidor.

> > > O campo `authenticatedUserId` é uma forma de simular um usuário autenticado.

**Resposta (200):**

```json
{
  "success": true,
  "message": "User followed successfully"
}
```

#### **Deixar de seguir um usuário**

`POST /users/{id}/unfollow`

**Parâmetros:**

- `id` (string, obrigatório): ID do usuário a ser deixado de seguir.
- `authenticatedUserId` (string, obrigatório): ID do seguidor.

> > > O campo `authenticatedUserId` é uma forma de simular um usuário autenticado.

**Resposta (200):** Mesmo formato da resposta de seguir usuário.

```json
{
  "success": true,
  "message": "User unfollowed successfully"
}
```
