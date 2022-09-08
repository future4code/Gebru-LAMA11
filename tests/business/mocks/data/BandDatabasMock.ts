import { BandRepository } from "../../../../src/business/BandRepository";
import { Band } from "../../../../src/model/Band";

export class BandDatabaseMock implements BandRepository{
    async createBand(band: Band): Promise<void> {
       console.log(`Banda ${band.getName()} criada com sucesso`)
    }

    async getBandByName(name: string): Promise<Band | undefined> {
        
        if(name === "name" ){
            return new Band("id", "name", "musicGenre", "responsible")
        } else {
            return undefined
        }         
    }
    
    async getBandById(id: string): Promise<Band | undefined> {
        if(id === "abc"){
            return new Band("id", "name", "musicGenre", "responsible")
        }  
    }
}