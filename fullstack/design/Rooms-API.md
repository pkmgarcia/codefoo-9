# Rooms Back End API

## User

### `POST /users`
Creates a User.
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
| user_name | string | User name. |
| password | string | Plaintext password (hashed before stored). |

### `GET /users/:user_id`
Returns a User.

### `DELETE /users/:user_id`
Deletes a User.

### `GET /users/:user_id/rooms`
Returns a list of Room IDs belonging to a User.

### `POST /users/login`
Authenticates a User.
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
| user_name | string | User name. |
| password | string | Plaintext password (hashed before compared). |

<hr>

## Room

### `POST /rooms`
Creates a Room.
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
| display_name | string | Room name. |
| capacity | int | Maximum number of Users. |

### `GET /rooms/:room_id`
Returns a Room.

### `PUT /rooms/:room_id`
Updates a Room.

### `DELETE /rooms/:room_id`
Deletes a Room.

### `GET /rooms/:room_id/messages`
Returns a list of Message IDs belonging to a Room.

### `GET /rooms/:room_id/users`
Returns a list of User IDs belonging to a Room.

<hr>

## Message

### `POST /messages`
Creates a Message.
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
| user_name | string | User name. |
| password | string | Plaintext password (hashed before stored). |

### `GET /messages/:message_id`
Returns a message.

