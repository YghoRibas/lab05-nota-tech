import { server } from "../app";
import { Company } from "../interfaces/Company";

const COMPANY_SERVICE_URL = process.env.COMPANY_SERVICE;

const getById = async (id: string): Promise<Company | undefined> => {
  try {
    const data = await fetch(`${COMPANY_SERVICE_URL}/${id}`, {
      method: "GET",
    });
    if (data.ok) {
      return data.json();
    }
  } catch (err: any) {
    server.log.error("Erro ao buscar Empresa ", err);
  }
};

export { getById };
