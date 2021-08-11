import { Router } from "express";
import passport from "passport";
import { GetImgPerfil } from "../controllers/file.controler";
import { Erol } from "../models/model.model";

const router = Router();

router.get(
	'/perfil',
	passport.authenticate(
		[Erol.DIRECTOR, Erol.JEFATURA, Erol.AUXILIAR],
		{ session: false }
	),
	GetImgPerfil
)

export default router;