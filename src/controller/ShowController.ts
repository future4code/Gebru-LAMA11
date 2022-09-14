import { Request, Response } from "express";
import { ShowInputDTO } from "../model/Shows";
import { IdGenerator } from "../services/IdGenerator";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowDatabase } from "../data/ShowDataBase";
import { TokenGenerator } from "../services/tokenGenerator";

const showBusiness = new ShowBusiness(
    new IdGenerator(),
    new TokenGenerator(),
    new ShowDatabase()
)

export class ShowController {

    public createShow = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: string = req.headers.authorization as string
            const input: ShowInputDTO = {
                bandId: req.body.bandId,
                weekDay: req.body.weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                token: token
            }

            await showBusiness.createShow(input)

            res.status(201).send({ message: "Show created" })
        } catch (error:any) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
         }
    }

    public getShowByDay = async (req: Request, res: Response): Promise<void> => {
        try {
          const day = String(req.query.day).toUpperCase();
          const result = await showBusiness.getShowByDay(day);
    
          res.status(200).send({ result })
        } catch (error:any) {
            const { statusCode, message } = error
            res.status(statusCode || 400).send({ message });
         }
      }

}