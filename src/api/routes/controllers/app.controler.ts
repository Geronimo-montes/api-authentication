import { Request, Response, NextFunction } from "express";
import { ResponseData } from "@models/response.model";

export const saludar = (req: Request, res: Response, next: NextFunction) => {
    res
        .status(200)
        .json(new ResponseData(true, 'Hola mundo', null));
}
