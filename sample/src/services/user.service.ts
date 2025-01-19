import { HttpStatus, PartData, Response, Service } from "zephyrjs";

@Service()
export class UserService {
  
  private users = [
    { id: "1", name: "John" },
    { id: "2", name: "Jane" },
    { id: "3", name: "Joe" },
    { id: "4", name: "Jack" },
  ];

  getUserById(id: string): Response {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return new Response(HttpStatus.NOT_FOUND, null, "User not found", {});
    }
    return new Response(HttpStatus.OK, user, "User found", {});
  }

  createUser(body: { id: string; name: string }): Response {
    let user = null;
    if (body.id && body.name) {
      user = this.users.find((user) => user.id === body.id);
      if (user) {
        return new Response(
          HttpStatus.BAD_REQUEST,
          null,
          "User already exists",
          {}
        );
      }
    }
    this.users.push(body);
    user = body;
    return new Response(HttpStatus.OK, user, "User created", {});
  }

  updateUser(body: { id: string; name: string }): Response {
    const user = this.users.find((user) => user.id === body.id);
    if (user) {
      user.name = body.name;
      return new Response(HttpStatus.OK, user, "User updated", {});
    }
    return new Response(HttpStatus.NOT_FOUND, null, "User not found", {});
  }

  deleteUser(id: string): Response {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const deletedUser = this.users.splice(userIndex, 1);
      return new Response(HttpStatus.NO_CONTENT, null, "User deleted", {});
    }
    return new Response(HttpStatus.NOT_FOUND, null, "User not found", {});
  }

  getUsersByName(name: string): Response {
    if (name) {
      const filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase())
      );
      if (filteredUsers.length > 0) {
        return new Response(HttpStatus.OK, filteredUsers, "Users found", {});
      }
      return new Response(HttpStatus.NOT_FOUND, null, "User not found", {});
    }
    return new Response(HttpStatus.OK, this.users, "Users found", {});
  }

  getUsersByNameAndId(name: string, id: string) {
    console.log(name, id);
    if (name && id) {
      const filteredUsers = this.users.filter((user) => {
        return (
          user.name.toLowerCase().includes(name.toLowerCase()) && user.id === id
        );
      });
      if (filteredUsers.length > 0) {
        return filteredUsers;
      }
      return filteredUsers;
    }
    return this.users;
  }

  tryFormData(text: string): Response {
    return new Response(HttpStatus.OK, text, "File uploaded", {});
  }

  testFormData(photo: PartData): Response {
    return new Response(HttpStatus.OK, photo.filename, "File uploaded", {});
  }

  getAllUsers(): Response {
    return new Response(HttpStatus.OK, this.users, "Users found", {});
  }
}
