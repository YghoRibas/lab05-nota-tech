import { Request, Response } from "express";
import { EditaEmpresaUseCase } from "./EditaEmpresaUseCase";

export class EditaEmpresaController {
    async handle(req: Request, res: Response) {
        const { dadosEmpresa } = req.body
        const { id } = req.params

        const editaEmpresaUseCase = new EditaEmpresaUseCase()

        const result = await editaEmpresaUseCase.execute(dadosEmpresa, parseInt(id))

        return res.status(200).send(result)
    }
}