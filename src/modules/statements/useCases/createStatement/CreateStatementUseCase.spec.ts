import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let inMemoryUsersRepository: IUsersRepository;
let inMemoryStatementsRepository: IStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

describe("Create a statement", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository;
    inMemoryStatementsRepository = new
  });

  expect(2 === 2);
});
