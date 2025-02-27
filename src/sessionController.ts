import * as ort from "onnxruntime-web";
import * as Comlink from "comlink";
import { Remote, wrap } from "comlink";
import { Session } from "./session";
import { SessionParams } from "./sessionParams";

import "subworkers"

export const createSession = async (modelPath: string, proxy: boolean): Promise<Session | Comlink.Remote<Session>> => {
  if (proxy && typeof document !== "undefined") {
    ort.env.wasm.proxy = true;
    const url = new URL("./session.worker.js", import.meta.url);
    const worker = new Worker(url.toString(), { type: "module" });
    const Channel = wrap<typeof Session>(worker);
    const session: Remote<Session> = await new Channel(SessionParams);
    await session.init(modelPath);
    return session;
  } else {
    ort.env.wasm.proxy = false;
    const session = new Session(SessionParams);
    await session.init(modelPath);
    return session;
  }
};
