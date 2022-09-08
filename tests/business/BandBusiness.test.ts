import { BandBusiness } from "../../src/business/BandBusiness";
import { IdGeneratorMock } from "./mocks/services/IdGeneratorMock";
import { TokenGeneratorMock } from "./mocks/services/TokenGeneratorMock";
import { BandDatabaseMock } from "./mocks/data/BandDatabasMock";

const bandDatabaseMock = new BandDatabaseMock();
const idGeneratorMock = new IdGeneratorMock();
const tokenGeneratorMock = new TokenGeneratorMock();

const bandBusinessMock = new BandBusiness(
  bandDatabaseMock,
  idGeneratorMock,
  tokenGeneratorMock
);

describe("Testing createBand o BandBusiness", () => {
    test("1. Error case: missing parameters", async () => {
        expect.assertions(3);
        try {
            const token = "abd"
            const input = { id: "123", name: "Iron Maiden", musicGenre: "Heavy Metal", responsible: "" }

            await bandBusinessMock.createBand(input, token)
        } catch (error: any) {
            expect(error).toBeDefined();
            expect(error.statusCode).toBe(422);
            expect(error.message).toBe("Parâmetros faltando, verifique a documentação.");
        }
    })

    test("2. Success case: Band created", async () => {
        expect.assertions(1);
        try {
            const token = "abd"
            const input = { id: "123", name: "Iron Maiden", musicGenre: "Heavy Metal", responsible: "Bruce Dickinson" }

            const result = await bandBusinessMock.createBand(input, token)

            expect(result).toBeUndefined();
        } catch (error: any) {
        }
    })
})