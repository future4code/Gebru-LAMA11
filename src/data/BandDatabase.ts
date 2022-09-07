import BaseDataBase from "./BaseDatabase";
import { Band } from "../model/Band";
import { BandRepository } from "../business/BandRepository";

export class BandDatabase extends BaseDataBase implements BandRepository {

   protected tableName: string = "bands_lama";

   public async createBand(band: Band): Promise<void> {
      try {
         await BaseDataBase.connection.raw(`
            INSERT INTO ${this.tableName} (id, name, music_genre, responsible)
            VALUES (
            '${band.getId()}', 
            '${band.getName()}', 
            '${band.getMusicGenre()}',
            '${band.getResponsible()}'
            )`
         );
      } catch (error:any) {
         throw new Error(error.sqlMessage || error.message)
      }
   }
}