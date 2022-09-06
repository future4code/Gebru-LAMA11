import { BaseDatabase } from "./BaseDatabase"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

class Migrations extends BaseDatabase {

   private closeConnection = () => { BaseDatabase.connection.destroy() }
   private createTables = () => BaseDatabase.connection
   .raw(`
      CREATE TABLE IF NOT EXISTS bandas_lama (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) UNIQUE NOT NULL,
         music_genre VARCHAR(255) NOT NULL,
        responsible VARCHAR(255) UNIQUE NOT NULL 
      );
      CREATE TABLE IF NOT EXISTS shows_lama (
         id VARCHAR(255) PRIMARY KEY,
         week_day VARCHAR(255) NOT NULL,
         start_time INT NOT NULL,
         end_time INT NOT NULL,
         band_id VARCHAR(255) NOT NULL,
         FOREIGN KEY(band_id) REFERENCES bandas_lama(id)
      );
      CREATE TABLE IF NOT EXISTS users_lama (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL,
         role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
      );
`)
   .then(() => { console.log("Tabelas criadas") })
   .catch(printError)
   .finally(this.closeConnection)

   public createDB = () => {
      return this.createTables()
   }
   static createDB: any
   
}

const newDatabase = new Migrations;

newDatabase.createDB();