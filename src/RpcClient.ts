import { readFileSync } from "fs";
import { Agent } from "https";
import axios from "axios";

type Protocol = "https" | "http";

interface ChiaOptions {
  net: string;
  protocol: Protocol;
  hostname: string;
  port: number;
  caCertPath: string | boolean;
  certPath: string;
  keyPath: string;
  debug?: boolean;
}

class RpcClient {
  private readonly net: string;
  private readonly protocol: Protocol;
  private readonly hostname: string;
  private readonly port: number;
  private readonly agent: Agent;
  private readonly certPath: string;
  private readonly keyPath: string;
  private readonly debug?: boolean;

  public constructor(options: ChiaOptions) {
    this.net = options.net;
    this.protocol = options.protocol;
    this.hostname = options.hostname;
    this.port = options.port;
    this.certPath = options.certPath;
    this.keyPath = options.keyPath;
    this.debug = options.debug;

    this.agent = new Agent({
      ...(typeof options.caCertPath !== 'boolean' ? { ca: readFileSync(options.caCertPath) } : {}),
      cert: readFileSync(options.certPath),
      key: readFileSync(options.keyPath),
      rejectUnauthorized: options.hostname !== "localhost",
      host: options.hostname,
      port: options.port
    });
  }

  private baseUri(): string {
    return `${this.protocol}://${this.hostname}:${this.port}`;
  }

  protected async request<T>(
    route: string,
    body: Record<string, string | number | boolean | string[] | undefined>
  ): Promise<T> {
    if(this.debug) {
      console.log("\x1b[33m", `${route}`);
      console.log("\x1b[32m", `curl --insecure --cert ${this.certPath} --key ${this.keyPath} -d '${JSON.stringify(body)}' -H "Content-Type: application/json" -X POST ${this.baseUri()}/${route} | python -m json.tool`);
    }
    const { data } = await axios.post<T>(`${this.baseUri()}/${route}`, body, {
      httpsAgent: this.agent,
    });
    return data;
  }
}

export { ChiaOptions, RpcClient };
