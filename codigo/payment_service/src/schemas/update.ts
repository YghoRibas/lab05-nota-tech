export const updateSchema = {
  type: "object",
  properties: {
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
    },
  },
};
