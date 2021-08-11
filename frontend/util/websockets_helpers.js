
export const createSubscription = (thread_type, thread_id, receiveAllMessages, receiveMessage, deleteMessage) => {
    console.log(thread_id)
    App.cable.subscriptions.create(
        { channel: "ChatChannel", thread_type: thread_type, thread_id: thread_id },
        {
            received: data => {
                switch (data.type) {
                    case "index":
                        receiveAllMessages(data.messages);
                        break;

                    case "create":
                        receiveMessage(data.message);
                        break;

                    case "update":
                        receiveMessage(data.message);
                        break;

                    case "destroy":
                        deleteMessage(data.messageId);
                        break;

                    default:
                        break;
                }
            },
            create: function (data) { return this.perform("create", data) },
            update: function (data) { return this.perform("update", data) },
            destroy: function (data) { return this.perform("destroy", data) }
        }
    )
}


export const findCurrentSubscription = () => {
    let currentLocation = window.location.hash;

    let chatRoomType;
    if (currentLocation.includes("servers")) chatRoomType = "tc";
    if (currentLocation.includes("conversations")) chatRoomType = "dm";

    const chatRoomId = parseInt(currentLocation.split("/").slice(-1).pop());

    for (let i = 0; i < App.cable.subscriptions.subscriptions.length; i++) {
        let parsedIdentifier = JSON.parse(App.cable.subscriptions.subscriptions[i].identifier);
        if (parsedIdentifier.thread_type === chatRoomType && parseInt(parsedIdentifier.thread_id) === chatRoomId) {
            return i;
        }
    }
}
