import { prisma } from "../../../database/prismaClient";
import { AppError } from "../../../errors/AppError";


export class DeletaEmpresaUseCase {
    async execute(id: number) {
        const findEmpresa = await prisma.empresa.findUnique({
            where: {
                id
            }
        })
        
        if(!findEmpresa) {
            throw new AppError('Empresa não encontrada.', 400)
        }

        const empresa = await prisma.empresa.delete({
            where: {
                id
            }
        })

        return empresa
    }
}