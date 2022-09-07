import {
    AdminUnauthorized,
    BandNotFound,
    CustomError,
    MissingParameters,
    Unauthorized
} from "../error/CustomError";
import { Band, BandInputDTO } from "../model/Band";
import { BandRepository } from "./BandRepository";
import { IIDGenerator, ITokenGenerator } from "./Ports";

export class BandBusiness {
    constructor(
        private bandDatabase: BandRepository,
        private idGenerator: IIDGenerator,
        private tokenGenerator: ITokenGenerator
    ) { }

    public async createBand(input: BandInputDTO, token: string) {
        try {
            const tokenData = this.tokenGenerator.verify(token)

            const { name, musicGenre, responsible } = input;

            if (!token) {
                throw new MissingParameters()
            };

            if (!tokenData) {
                throw new Unauthorized()
            }

            if (tokenData.role !== "ADMIN") {
                throw new AdminUnauthorized()
            }

            if (!name || !musicGenre || !responsible) {
                throw new MissingParameters()
            }

            const id = this.idGenerator.generate();

            await this.bandDatabase.createBand(
                new Band(id, name, musicGenre, responsible)
            )
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async getBandByName(name: string) {
        try {

            if (!name) {
                throw new MissingParameters();
            };

            const band = await this.bandDatabase.getBandByName(name)

            if (!band) {
                throw new BandNotFound()
            }

            return band;
            
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        };
    }

    public async getBandById(id: string) {
        try {

            if (!id) {
                throw new MissingParameters();
            };

            const band = await this.bandDatabase.getBandById(id)

            if (!band) {
                throw new BandNotFound()
            }

            return band;

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        };
    }
}