import express from "express"
import { BandBusiness } from "../../business/BandBusiness"
import { BandDatabase } from "../../data/BandDatabase"
import { BandController } from "../BandController"
import { IdGenerator } from "../../services/IdGenerator";
import { TokenGenerator } from "../../services/tokenGenerator";

const idGenerator = new IdGenerator()
const tokenGenerator = new TokenGenerator()

export const bandRouter = express.Router()

const bandDatabase = new BandDatabase()
const bandBusiness = new BandBusiness(bandDatabase, idGenerator, tokenGenerator)
const bandController = new BandController(bandBusiness)

bandRouter.post("/create", (req, res) => bandController.createBand(req, res))