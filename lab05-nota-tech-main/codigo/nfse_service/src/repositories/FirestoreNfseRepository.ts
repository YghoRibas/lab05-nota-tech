import { ListNfseFilter } from "../types/repository";
import EventEmitter from "events";
import { INfse } from "../types/nfse";
import { db } from "../database/firestore";
import { randomUUID } from "crypto";

const docRef = db.collection("nfses");

export default class FirestoreNfseRepository extends EventEmitter {
  async find(id: string): Promise<INfse | undefined> {
    const nfseRef = docRef.doc(id);

    return (await nfseRef.get()).data() as INfse;
  }

  async list<F extends ListNfseFilter>(
    filter: F
  ): Promise<{
    count: number;
    data: INfse[];
    limit: number;
    page: number;
    totalPage: number;
  }> {
    let nfseRef = docRef.where("companyId", "==", filter.companyId);

    if (filter.numero) {
      nfseRef = nfseRef.where("identificacao.numero", "==", filter.numero);
    }
    if (filter.status) {
      nfseRef = nfseRef.where("status", "==", filter.status);
    }
    if (filter.competencia) {
      nfseRef = nfseRef.where(
        "identificacao.competencia",
        "==",
        filter.competencia
      );
    }

    const countQuery = await nfseRef.count().get();
    const { count } = countQuery.data();
    const limit = filter.limit!;
    const totalPage = Math.ceil(count / (limit || 1));

    if (filter.limit) {
      nfseRef = nfseRef.limit(limit);
    }
    if (filter.sortBy) {
      nfseRef = nfseRef.orderBy(filter.sortBy, filter.orderBy);
    }
    if (filter.page) {
      nfseRef = nfseRef.offset(Math.abs(filter.page - 1) * limit);
    }

    const result = await nfseRef.get();
    const data = result.docs
      .filter((doc) => doc.exists)
      .map((doc) => doc.data() as INfse);

    return {
      count: data.length,
      data,
      limit,
      page: filter.page!,
      totalPage,
    };
  }
  async update(
    id: string,
    payload: Partial<INfse>
  ): Promise<INfse | undefined> {
    const nfseRef = docRef.doc(id);

    await nfseRef.update(payload);

    return (await nfseRef.get()).data() as INfse;
  }
  delete(id: string): Promise<INfse | undefined> {
    throw new Error("Method not implemented.");
  }
  close(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  bulkDelete(ids: string[]): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async clear(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(nfse: INfse) {
    const id = randomUUID();
    const nfseRef = docRef.doc(id);

    await nfseRef.set({ ...nfse, id });

    return (await nfseRef.get()).data() as INfse;
  }
}
