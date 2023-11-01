-- CreateEnum
CREATE TYPE "RegimeEspecialTributacao" AS ENUM ('Microempresa_Municipal', 'Estimativa', 'Sociedade_de_Profissionais', 'Cooperativa');

-- CreateTable
CREATE TABLE "empresa" (
    "id" SERIAL NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "registroMunicipal" TEXT,
    "regimeEspecialTributacao" "RegimeEspecialTributacao" NOT NULL,
    "optanteSimplesNacional" BOOLEAN NOT NULL,

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "registroMunicipal" TEXT,
    "fk_idEmpresa" INTEGER NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endereco" (
    "id" SERIAL NOT NULL,
    "rua" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "bairro" TEXT,
    "codigoMunicipio" TEXT NOT NULL,
    "cidade" TEXT,
    "uf" TEXT,
    "cep" TEXT,
    "fk_idEmpresa" INTEGER NOT NULL,
    "fk_idCliente" INTEGER NOT NULL,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contato" (
    "id" SERIAL NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fk_idEmpresa" INTEGER NOT NULL,
    "fk_idCliente" INTEGER NOT NULL,

    CONSTRAINT "contato_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "endereco_fk_idEmpresa_key" ON "endereco"("fk_idEmpresa");

-- CreateIndex
CREATE UNIQUE INDEX "endereco_fk_idCliente_key" ON "endereco"("fk_idCliente");

-- CreateIndex
CREATE UNIQUE INDEX "contato_fk_idEmpresa_key" ON "contato"("fk_idEmpresa");

-- CreateIndex
CREATE UNIQUE INDEX "contato_fk_idCliente_key" ON "contato"("fk_idCliente");

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_fk_idEmpresa_fkey" FOREIGN KEY ("fk_idEmpresa") REFERENCES "empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_fk_idEmpresa_fkey" FOREIGN KEY ("fk_idEmpresa") REFERENCES "empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_fk_idCliente_fkey" FOREIGN KEY ("fk_idCliente") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contato" ADD CONSTRAINT "contato_fk_idEmpresa_fkey" FOREIGN KEY ("fk_idEmpresa") REFERENCES "empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contato" ADD CONSTRAINT "contato_fk_idCliente_fkey" FOREIGN KEY ("fk_idCliente") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
