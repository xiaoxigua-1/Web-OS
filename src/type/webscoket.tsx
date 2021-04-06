import { sleep } from "../methods/sleep"

export abstract class WSConnect {

    private ws: WebSocket;
    private url: string;

    
    constructor(url: string) {
        this.url = url;
        this.ws = new WebSocket(url);
        this.ws.onclose = (event: CloseEvent) => { this.onClose(event) };
        this.ws.onerror = (event: Event) => { this.onError(event) };
        this.ws.onmessage = (data: MessageEvent<any>) => { this.onMessage(data) };
        this.ws.onopen = (event: Event) => { this.onOpen(event) };
    }

    abstract onOpen(event: Event): void;

    abstract onMessage(msg: MessageEvent<any>): void;

    abstract onClose(event: CloseEvent): void;

    abstract onError(event: Event): void;

    send(data: any): void {
        try {
            this.ws.send(data);
        } catch (error) {
            console.error(error);
        }
    }

    close(): void {
        this.ws.close()
    }

    returnWS(): WebSocket {
        return this.ws;
    }

    protected reConnect(time: number): void {
        (async () => {
            await sleep(time);
            this.ws = new WebSocket(this.url);
            this.ws.onclose = (event: CloseEvent) => { this.onClose(event) };
            this.ws.onerror = (event: Event) => { this.onError(event) };
            this.ws.onmessage = (data: MessageEvent<any>) => { this.onMessage(data) };
            this.ws.onopen = (event: Event) => { this.onOpen(event) };
        })();

    }
}