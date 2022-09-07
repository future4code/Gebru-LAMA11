import BaseDataBase from "./BaseDatabase";
import { Band } from "../model/Band";
import { BandRepository } from "../business/BandRepository";

export class BandDatabase extends BaseDataBase implements BandRepository {

   protected tableName: string = "bands_lama";

   private toModel(dbModel?: any): Band | undefined {
      return (
         dbModel &&
         new Band(
            dbModel.id,
            dbModel.name,
            dbModel.music_genre,
            dbModel.responsible
         )
      );
   }

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

   public async getBandByName(name: string): Promise<Band | undefined> {
      try {
         const result = await BaseDataBase.connection.raw(`
            SELECT * from ${this.tableName} WHERE name = '${name}'
         `);
         return this.toModel(result[0][0]);
      } catch (error:any) {
         throw new Error(error.sqlMessage || error.message)
      }
   }
}