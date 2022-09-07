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
}