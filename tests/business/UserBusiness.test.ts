import { UserBusiness } from "../../src/business/UserBusiness";
import { HashManagerMock } from "./mocks/services/HashManagerMock";
import { IdGeneratorMock } from "./mocks/services/IdGeneratorMock";
import { TokenGeneratorMock } from "./mocks/services/TokenGeneratorMock";
import { UserDatabaseMock } from "./mocks/data/UserDatabaseMock";

const userDatabaseMock = new UserDatabaseMock();
const idGeneratorMock = new IdGeneratorMock();
const tokenGeneratorMock = new TokenGeneratorMock();
const hashGeneratorMock = new HashManagerMock();

const userBusinessMock = new UserBusiness(
  userDatabaseMock,
  hashGeneratorMock,
  idGeneratorMock,
  tokenGeneratorMock
);

describe("getUserById", () => {
	// (a)
   test("Should catch error when id is not registered", async () => {
    expect.assertions(3)

    try {
      await userBusinessMock.getUserById("abcd", "abc123")
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.statusCode).toBe(404)
      expect(error.message).toBe("Usuário não encontrado")
    }
  })
    
	// (b)
  test("Should return respective user when id is registered", async () => {
    expect.assertions(2)
    
    try {
      const getUserById = jest.fn(
        (id: string) => userBusinessMock.getUserById(id, "abc123")
      )
        
      const result = await getUserById("abc")

      expect(getUserById).toHaveBeenCalledWith("abc")
      expect(result).toEqual({
        id: "id",
        name: "name",
        email: "email@email",
        password: "password",
        role: "NORMAL",
      })
    } catch (error: any) {
      console.log(error.message)
    }
  })
})
