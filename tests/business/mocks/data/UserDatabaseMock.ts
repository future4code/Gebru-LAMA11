import { UserRepository } from "../../../../src/business/UserRepository";
import { User, UserRole } from "../../../../src/model/User";

export class UserDatabaseMock implements UserRepository{
    async createUser(user: User): Promise<void> {
       console.log("Usuário criado")
    }
    async getUserByEmail(email: string): Promise<User | undefined> {
        
        if(email === "email@email" ){
            return new User("id", "name", "email@email", "password", UserRole.NORMAL)
        } else {
            return undefined
        }         
    }
    
    async getUserById(id: string): Promise<User | undefined> {
        if(id === "abc"){
            return new User("id", "name", "email@email", "password", UserRole.NORMAL)
        }  
    }

    async getAllUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    
}