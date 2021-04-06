import { WSConnect } from "../type/webscoket";

export class MessageWS extends WSConnect {

    constructor(url: string) {
        super(url);
    }

    onClose(event: Event) {
        console.log("Close")
        this.reConnect(1000);
    }

    onError() {
        console.log("Error")
        //this.reConnect(1000);
    }

    onMessage(data: MessageEvent<any>) {
        console.log(data)
    }

    onOpen() {

    }

}
