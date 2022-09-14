import { ITokenGenerator } from "../../../../src/business/Ports";
import { UserRole } from "../../../../src/model/User";
import { AuthenticationData } from "../../../../src/services/tokenGenerator";

export class TokenGeneratorMock implements ITokenGenerator {
    generate(input: AuthenticationData): string {
        return "token"
    }
    verify(token: string): AuthenticationData {
        return {id: "id", role: UserRole.ADMIN}
    }
    
}