import { Request, Response } from "express";
import { CriaEmpresaUseCase } from "./CriaEmpresaUseCase";

export class CriaEmpresaController {
    async handle(req: Request, res: Response) {
        const { dadosEmpresa } = req.body
            
        const criaEmpresaUseCase = new CriaEmpresaUseCase()

        const result = await criaEmpresaUseCase.execute(dadosEmpresa)

        return res.status(200).send(result)
    }
}