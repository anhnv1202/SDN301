const buildSocket = (client) => {
    client.on('event', data => { console.log("hello"); });
    client.on('disconnect', () => { "hello" });
}

module.exports = buildSocket;