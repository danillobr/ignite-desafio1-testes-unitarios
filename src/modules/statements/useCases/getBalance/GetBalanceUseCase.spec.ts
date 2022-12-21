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

let statementsRepository: IStatementsRepository;
let usersRepository: IUsersRepository;
let getBalanceUseCase: GetBalanceUseCase;
let createUserUserCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

describe("Get the balance", () => {
  beforeEach(() => {
    statementsRepository = new StatementsRepository();
    usersRepository = new UsersRepository();
    getBalanceUseCase = new GetBalanceUseCase(
      statementsRepository,
      usersRepository
    );
    createUserUserCase = new CreateUserUseCase(usersRepository);
    createStatementUseCase = new CreateStatementUseCase(
      usersRepository,
      statementsRepository
    );
  });

  it("Should be able to get the user account balance", async () => {
    const user1 = await createUserUserCase.execute({
      name: "user1",
      email: "user1@email",
      password: "user1123",
    });

    const user2 = await createUserUserCase.execute({
      name: "user2",
      email: "user2@email",
      password: "user2123",
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
      amount: 500,
      description: "Withdrawing 500 R$",
    });
  });
});
