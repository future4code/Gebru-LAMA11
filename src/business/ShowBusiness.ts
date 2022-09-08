import { ShowDatabase } from "../data/ShowDataBase";
import { ShowDB, ShowInputDTO } from "../model/Shows";
import { AuthenticationData } from "../services/tokenGenerator";
import { CustomError, MissingParameters, Unauthorized } from "../error/CustomError";
import { TokenGenerator } from "../services/tokenGenerator";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
    constructor(
        private idGenerator: IdGenerator,
        private tokenGenerator: TokenGenerator,
        private showDataBase: ShowDatabase
    ) { }

    public stringToWeekDay(input: string): string {
        switch (input.toUpperCase()) {
            case "FRIDAY":
                return "FRIDAY";
            case "SATURDAY":
                return "SATURDAY";
            case "SUNDAY":
                return "SUNDAY";
            default:
                throw new Error("Invalid week day");
        }
    }

    public async createShow(
        input: ShowInputDTO
    ) {
        try {
            const id = this.idGenerator.generate();
            const tokenData: AuthenticationData = this.tokenGenerator.verify(input.token);

            if (!input.bandId || !input.weekDay || !input.startTime || !input.endTime) {
                throw new MissingParameters();
            }
            if (tokenData.role !== "ADMIN") {
                throw new Unauthorized();
            }

            if (
                input.startTime > input.endTime ||
                input.startTime < 8 ||
                input.endTime > 23 ||
                !Number.isInteger(input.startTime) ||
                !Number.isInteger(input.endTime)
            ) {
                throw new CustomError(400, "Selected time is invalid")
            }

            const showSchedule = await this.showDataBase.getShowByDate(
                input.weekDay,
                input.startTime,
                input.endTime
            )

            if (showSchedule.length > 0) {
                throw new Error("There's a show at this moment");
            }

            await this.showDataBase.createShow(id,
                this.stringToWeekDay(input.weekDay),
                input.startTime,
                input.endTime,
                input.bandId
            )
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

    public async getShowByDay(day: string): Promise<any> {
        try {
            if (!day) {
                throw new CustomError(422, "Invalid day")
            }
            const queryData = await this.showDataBase.getShowByDay(
                this.stringToWeekDay(day)
            )

            const showSchedule = queryData.map((item: ShowDB) => {
                return {
                    id: item.id,
                    weekDay: item.week_day,
                    startTime: item.start_time,
                    endTime: item.end_time,
                    bandId: item.band_id
                }
            })

            return showSchedule
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }

}