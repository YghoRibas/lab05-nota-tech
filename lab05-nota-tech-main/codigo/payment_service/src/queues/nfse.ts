import { PubSub, PublishError } from "@google-cloud/pubsub";
import { IPayment } from "../types/payment";

const pubsub = new PubSub({ projectId: "nfse-service" });

export async function publishMessage(
  event: string,
  msg: IPayment
): Promise<void> {
  const topic = pubsub.topic(event);
  try {
    const topicExists = await topic.exists();
    if (!topicExists[0]) {
      await topic.create();
    }
    await topic.publishMessage({ json: msg });
  } catch (err) {
    const error = err as PublishError;
    console.log(`Causa: ${error.cause}\nMessage: ${error.message}`);
  }
}
