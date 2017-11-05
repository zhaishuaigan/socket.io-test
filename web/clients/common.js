function connection(token) {
    var socket = io();
    socket.on('connect-success', function () {
        console.log('connect success');
        socket.emit('login', token);
    });
    socket.on('login', function (userInfo) {
        console.log('login success', userInfo);
    });


    socket.on('private-message', function (fromUserInfo, toUserInfo, message) {
        console.log('收到消息');
        console.log('信息来源', fromUserInfo);
        console.log('消息内容', message);
    });

    socket.on('system-message', function (fromUserInfo, message) {
        console.log('收到消息');
        console.log('信息来源', fromUserInfo);
        console.log('消息内容', message);
    });

    window.socket = socket;
}