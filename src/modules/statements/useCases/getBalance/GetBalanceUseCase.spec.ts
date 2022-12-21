import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { UsersRepository } from "../../../users/repositories/UsersRepository";
import { Statement } from "../../entities/Statement";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { StatementsRepository } from "../../repositories/StatementsRepository";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";

let inMemoryStatementsRepository: IStatementsRepository;
let inMemoryUsersRepository: IUsersRepository;
let getBalanceUseCase: GetBalanceUseCase;
let createUserUserCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

describe("Get the balance", () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );
    createUserUserCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("Should be able to get the user account balance", async () => {
    const user1 = await createUserUserCase.execute({
      name: "user1",
      email: "user1@email",
      password: "user1123",
    });

    await createStatementUseCase.execute({
      user_id: user1.id as string,
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: "Depositing 1000 R$",
    });

    await createStatementUseCase.execute({
      user_id: user1.id as string,
      type: OperationType.WITHDRAW,
      amount: 400,
      description: "Withdrawing 400 R$",
    });

    await createStatementUseCase.execute({
      user_id: user1.id as string,
      type: OperationType.DEPOSIT,
      amount: 500,
      description: "Depositing 500 R$",
    });

    const balance = await getBalanceUseCase.execute({
      user_id: user1.id as string,
    });

    expect(balance).toHaveProperty("balance");
    expect(balance.balance === 1100);
    expect(balance.statement.length).toBe(3);
  });

  it("Should not be able to get the account balance form an inexistent user", () => {
    expect(async () => {
      await getBalanceUseCase.execute({
        user_id: "incorrect id",
      });
    }).rejects.toBeInstanceOf(GetBalanceError);
  });
});
