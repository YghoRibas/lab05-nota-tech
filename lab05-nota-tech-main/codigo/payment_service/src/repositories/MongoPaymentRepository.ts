import { db } from "../database/mongo";
import { ObjectId } from "mongodb";
import { IPayment } from "../types/payment";
import { CreatePaymentPayload } from "../types/createPaymentPayload";
import { ListPaymentFilter } from "../types/repository";

export default class MongoPaymentRepository {
  async find(id: string): Promise<IPayment | undefined> {
    return db
      .collection("payments")
      .findOne({ _id: new ObjectId(id) }) as unknown as IPayment;
  }

  async list<F extends ListPaymentFilter>(
    filter: F
  ): Promise<{
    count: number;
    data: IPayment[];
    limit: number;
    page: number;
    totalPage: number;
  }> {
    const query: any = {
      companyId: filter.companyId,
    };

    if (filter.status) {
      query.status = filter.status;
    }

    let paymentRef = db.collection("payments").find(query);

    const count = await db.collection("payments").countDocuments(query);
    const limit = Number(filter.limit);

    if (filter.limit) {
      paymentRef = paymentRef.limit(limit);
    }
    if (filter.sortBy) {
      paymentRef = paymentRef.sort({
        [filter.sortBy]: filter.orderBy !== "asc" ? -1 : 1,
      });
    }
    if (filter.page) {
      paymentRef = paymentRef.skip(Math.abs(Number(filter.page) - 1) * limit);
    }

    const data = (await paymentRef.toArray()) as IPayment[];

    const totalPage = Math.ceil(count / (limit || 1));
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
    payload: Partial<IPayment>
  ): Promise<IPayment | undefined> {
    const paymentRef = await db
      .collection("payments")
      .updateOne({ _id: new ObjectId(id) }, { $set: payload });

    if (paymentRef) {
      return db
        .collection("payments")
        .findOne({ _id: paymentRef.upsertedId! }) as any;
    }
  }
  async delete(id: string): Promise<IPayment | undefined> {
    const payment = await db
      .collection("payments")
      .findOne({ _id: new ObjectId(id) });
    await db.collection("payments").deleteOne({ _id: new ObjectId(id) });

    return payment as IPayment;
  }

  async create(payment: CreatePaymentPayload) {
    const paymentRef = await db.collection("payments").insertOne(payment);

    return db.collection("payments").findOne({ _id: paymentRef.insertedId });
  }
}
