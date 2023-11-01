export const listSchema = {
  title: "List Payment query string",
  type: "object",
  properties: {
    limit: {
      type: "integer",
      default: 20,
      description: "The quantity of items to be returned per page.",
    },
    orderBy: {
      description: "The order in which the data should be listed.",
      type: "string",
      enum: ["asc", "desc"],
      default: "asc",
    },
    sortBy: {
      type: "string",
      enum: ["status", "createdAt"],
      description: "The type of ordering.",
    },
    page: {
      type: "integer",
      default: 1,
      description: "The page o return.",
    },
    status: {
      type: "string",
      enum: ["Processando", "Processado"],
      description: "The `Status` of the payment.",
    },
    companyId: {
      type: "string",
      description: "Date of competencia of payment",
    },
  },
  required: ["companyId"],
};
