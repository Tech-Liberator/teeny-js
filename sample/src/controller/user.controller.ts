import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  PathParam,
  BodyParam,
  QueryParam,
  Response,
  FormData,
  Multipart,
  PartData,
} from "zephyrjs";
import { UserService } from "../services/user.service.js";

@Controller("/users")
export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get("/:id")
  getUserById(@PathParam("id") id: string): Response {
    return this.userService.getUserById(id);
  }

  // POST request to create a new user
  @Post("/")
  createUser(@BodyParam() body: { id: string; name: string }): Response {
    return this.userService.createUser(body);
  }

  // PUT request to update an existing user by ID
  @Put("/")
  updateUser(@BodyParam() body: { id: string; name: string }): Response {
    return this.userService.updateUser(body);
  }

  // DELETE request to remove a user by ID
  @Delete("/:id")
  deleteUser(@PathParam("id") id: string): Response {
    return this.userService.deleteUser(id);
  }

  @Get("/")
  getUsersByName(@QueryParam("name") name: string): Response {
    return this.userService.getUsersByName(name);
  }

  @Get("/usersByNameAndId")
  getUsersByNameAndId(
    @QueryParam("name") name: string,
    @QueryParam("id") id: string
  ) {
    return this.userService.getUsersByNameAndId(name, id);
  }

  @Post("/formdata")
  tryFormData(@FormData("text") text: string): Response {
    return this.userService.tryFormData(text);
  }

  @Post("/upload")
  testFormData(@Multipart("photo") photo: PartData): Response {
    return this.userService.testFormData(photo);
  }

  @Get("/")
  getAllUsers(): Response {
    return this.userService.getAllUsers();
  }
}
