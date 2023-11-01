export const createSchema = {
  type: "object",
  properties: {
    companyId: {
      type: "string",
      format: "uuid",
    },
    clientId: {
      type: "string",
      format: "uuid",
    },
    servico: {
      type: "object",
      properties: {
        valores: {
          type: "object",
          properties: {
            valorServicos: {
              type: "number",
            },
            baseCalculo: {
              type: "number",
            },
            aliquota: {
              type: "number",
            },
          },
          required: ["valorServicos", "baseCalculo"],
        },
        itemListaServico: {
          type: "string",
        },
        codigoCnae: {
          type: "string",
        },
        codigoTributacaoMunicipio: {
          type: "string",
        },
        discriminacao: {
          type: "string",
        },
        codigoMunicipio: {
          type: "string",
        },
      },
      required: [
        "codigoMunicipio",
        "discriminacao",
        "valores",
        "itemListaServico",
      ],
    },
    tipo: {
      type: "string",
      enum: ["NORMAL", "PIX"],
    },
  },
  required: ["clientId", "companyId", "tipo", "servico"],
};
