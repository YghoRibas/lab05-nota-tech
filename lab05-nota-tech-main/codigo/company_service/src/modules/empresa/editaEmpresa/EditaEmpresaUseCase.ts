import { prisma } from "../../../database/prismaClient"
import { AppError } from "../../../errors/AppError"
import { Empresa } from "@prisma/client"
import * as yup from 'yup';


const empresaSchema = yup.object().shape({
    cnpj: yup
      .string()
      .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido') 
      .required('CNPJ é obrigatório'),
});

export class EditaEmpresaUseCase {
    async execute(dadosEmpresa: Empresa, id: number) {
        const findEmpresa = await prisma.empresa.findUnique({
            where: {
                id
            }
        })

        if(!findEmpresa) {
            throw new AppError('Empresa não encontrada.', 400)
        }

        await empresaSchema.validate(dadosEmpresa, { abortEarly: false });

        const empresa = prisma.empresa.update({
            where: {
                id
            },
            data: dadosEmpresa
        })

        return empresa
    }
}
