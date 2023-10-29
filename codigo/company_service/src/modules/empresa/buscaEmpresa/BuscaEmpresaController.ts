import { Request, Response } from "express";
import { BuscaEmpresaUseCase } from "./BuscaEmpresaUseCase";

export class BuscaEmpresaController {
    async handle(req: Request, res: Response) {
        const buscaEmpresaUseCase = new BuscaEmpresaUseCase()

        const result = await buscaEmpresaUseCase.execute()

        return res.status(200).send(result)
    }
}