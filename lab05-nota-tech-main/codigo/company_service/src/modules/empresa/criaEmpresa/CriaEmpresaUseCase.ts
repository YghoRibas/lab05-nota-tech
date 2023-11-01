import { prisma } from "../../../database/prismaClient"
import { Empresa } from "@prisma/client"
import * as yup from 'yup';


const empresaSchema = yup.object().shape({
    cnpj: yup
      .string()
      .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ inválido') 
      .required('CNPJ é obrigatório'),
});

export class CriaEmpresaUseCase {
    async execute(dadosEmpresa: Empresa) {
        await empresaSchema.validate(dadosEmpresa, { abortEarly: false });

        const empresa = await prisma.empresa.create({
            data: dadosEmpresa,
        });

        return empresa;
    }
}
