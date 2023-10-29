import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../errors/AppError";


export class BuscaEmpresaUseCase {
    async execute() {
        const empresa = await prisma.empresa.findMany()

        if(!empresa) {
            throw new AppError('Não há empresas cadastradas no momento.', 400)
        }

        return empresa
    }
}