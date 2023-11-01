export const uuidSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      format: "uuid",
    },
  },
  required: ["id"],
};

export const stringIdSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
    },
  },
  required: ["id"],
};
