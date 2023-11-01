import { server } from "../app";
import { IPayment } from "../interfaces/Payment";

const PAYMENT_SERVICE_URL = process.env.COMPANY_SERVICE;

const getById = async (id: string): Promise<IPayment | undefined> => {
  try {
    const data = await fetch(`${PAYMENT_SERVICE_URL}/${id}`, {
      method: "GET",
    });
    if (data.ok) {
      return data.json();
    }
  } catch (err: any) {
    server.log.error("Erro ao buscar Pagamento ", err);
  }
};

export { getById };
