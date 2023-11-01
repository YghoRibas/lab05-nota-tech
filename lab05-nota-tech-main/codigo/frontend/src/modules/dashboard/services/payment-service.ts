import axios, { Axios } from "axios";
import { PAYMENT_API_URL } from "src/config";
import { List } from "src/modules/@shared/domain/entities/list";
import { prepare } from "src/modules/@shared/domain/utils/http/prepare";
import { Filterable } from "src/modules/@shared/hooks/use-list-pagination";
import { Payment } from 'src/modules/dashboard/domain/entities/payment';

class PaymentService {
  constructor() {
    this.axios = axios.create({
      baseURL: PAYMENT_API_URL
    })
  }

  private axios!: Axios;

  list(payment: Filterable<Payment> | Partial<Payment>): Promise<List<Payment>> {
    return this.axios
      .get<List<Payment>>(`api/payments`, { params: { ...prepare.all(payment), companyId: 'c5ec6456-268d-4a42-b7ac-0db0949d1ed1' } })
      .then(({ data }) => data)
  }

  get(paymentId: number): Promise<Payment> {
    return this
      .list({ _id: paymentId })
      .then(({ data }) => data)
      .then(itens => itens.at(0)!)
  }

  cancel(payment: Partial<Payment>){
    return this.axios
      .post(`api/payments/${payment._id}/cancel`);
  }
}

const paymentService = new PaymentService();

export default paymentService;

export { paymentService }