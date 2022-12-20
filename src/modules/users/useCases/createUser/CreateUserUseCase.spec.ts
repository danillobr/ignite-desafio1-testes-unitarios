import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let repository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create a user", () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(repository);
  });

  it("Should be able create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "userTest",
      email: "email@test",
      password: "test",
    });

    expect(user).toHaveProperty("id");
  });
});
