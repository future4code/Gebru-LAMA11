import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";

export class BandController {
   constructor(
      private bandBusiness: BandBusiness
   ){}

   public async createBand(req: Request, res: Response) {
      try {
         const token = req.headers.authorization as string;
         const { name, musicGenre, responsible } = req.body

         const input: BandInputDTO = {
            name,
            musicGenre,
            responsible
         }
         
         await this.bandBusiness.createBand(
            input,
            token
         );

         res.status(200).send({ message: `Banda ${name} adicionada com sucesso!` });
      } catch (error:any) {
         const { statusCode, message } = error
         res.status(statusCode || 400).send({ message });
      }
   }

   public async getBandByName(req: Request, res: Response) {
      try {
        const name = req.query.name as string

        const band = await this.bandBusiness.getBandByName(name);

        res.status(200).send(band)
      } catch (error: any) {
        const { statusCode, message } = error
        res.status(statusCode || 400).send({ message });
      }
   }

   public async getBandById(req: Request, res: Response) {
      try {
        const id = req.query.id as string

        const band = await this.bandBusiness.getBandById(id);

        res.status(200).send(band)
      } catch (error: any) {
        const { statusCode, message } = error
        res.status(statusCode || 400).send({ message });
      }
   }
}