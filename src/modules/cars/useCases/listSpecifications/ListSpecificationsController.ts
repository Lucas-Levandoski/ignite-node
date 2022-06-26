import { Request, Response } from "express";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";


export class ListSpecificationsController { 

  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) { }

  handle(req: Request, res: Response) {
    return res.status(200).json(this.listSpecificationsUseCase.execute());
  }

}