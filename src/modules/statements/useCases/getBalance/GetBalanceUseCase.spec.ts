import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { UsersRepository } from "../../../users/repositories/UsersRepository";
import { Statement } from "../../entities/Statement";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { StatementsRepository } from "../../repositories/StatementsRepository";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let statementsRepository: IStatementsRepository;
let usersRepository: IUsersRepository;
let getBalanceUseCase: GetBalanceUseCase;

describe("Get the balance", ()=>{

    beforeEach(()=>{
        statementsRepository = new StatementsRepository();
        usersRepository = new UsersRepository();
        getBalanceUseCase = new GetBalanceUseCase(
            statementsRepository,
            usersRepository
        );
    });

    

})