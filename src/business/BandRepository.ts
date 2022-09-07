import { Band } from "../model/Band";

export interface BandRepository {
  createBand(band: Band): Promise<void>;
  getBandByName(name: string): Promise<Band | undefined>;
  getBandById(id: string): Promise<Band | undefined>;
}
