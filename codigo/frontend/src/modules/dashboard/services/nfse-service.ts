import axios, { Axios } from "axios";
import { NFSE_API_URL } from "src/config";
import { List } from "src/modules/@shared/domain/entities/list";
import { prepare } from "src/modules/@shared/domain/utils/http/prepare";
import { Filterable } from "src/modules/@shared/hooks/use-list-pagination";
import { Nfse } from 'src/modules/dashboard/domain/entities/nfse';

class NfseService {
  constructor() {
    this.axios = axios.create({
      baseURL: NFSE_API_URL
    })
  }

  private axios!: Axios;

  list(nfse: Filterable<Nfse> | Partial<Nfse>): Promise<List<Nfse>> {
    return this.axios
      .get<List<Nfse>>(`api/nfses`, { params: { ...prepare.all(nfse), companyId: 'c5ec6456-268d-4a42-b7ac-0db0949d1ed1' } })
      .then(({ data }) => data)
  }

  get(nfseId: number): Promise<Nfse> {
    return this
      .list({ id: nfseId })
      .then(({ data }) => data)
      .then(itens => itens.at(0)!)
  }

  cancel(nfse: Partial<Nfse>){
    return this.axios
      .post(`api/nfses/${nfse.id}/cancel`);
  }
}

const nfseService = new NfseService();

export default nfseService;

export { nfseService }