import { Request, Response } from "express";
import { DeletaEmpresaUseCase } from "./DeletaEmpresaUseCase";

export class DeletaEmpresaController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deletaEmpresaUseCase = new DeletaEmpresaUseCase()

        const result = await deletaEmpresaUseCase.execute(parseInt(id))

        return res.status(200).send(result)
    }
}