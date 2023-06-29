(async function () {
    // 使用profile方法验证登录信息
    const result = await API.profile();
    // 获取响应码
    const code = result.code;
    // 进入判断表示登录失败
    if (code) {
        alert('登录失败，请重新登录');
        location.href = './login.html';
        return
    }
    // 登陆成功
    const loginId = document.querySelector('#loginId');
    const nickname = document.querySelector('#nickname');
    const chatContainer = document.querySelector('.chat-container');
    const msgContainer = document.querySelector('.msg-container');
    const txtMsg = document.querySelector('#txtMsg');
    const button = document.querySelector('.msg-container button');
    const close = document.querySelector('.close');
    // 1.显示账号信息
    loginId.innerText = result.data.loginId;
    nickname.innerText = result.data.nickname;
    // 2.获取历史消息
    (async function () {
        const result = await API.getHistory();
        for (const item of result.data) {
            creatEleChat(item);
        }
        chatContainer.scrollTop = chatContainer.scrollHeight;
    })();
    // 创建一个聊天
    function creatEleChat(message) {
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        // 如果from有值 证明消息是我发的
        if (message.from) {
            chatItem.classList.add('me');
        }
        const chatAvatar = document.createElement('img');
        chatAvatar.className = 'chat-avatar';
        chatAvatar.src = './asset/avatar.png';
        const chatContent = document.createElement('div');
        chatContent.className = 'chat-content';
        chatContent.innerText = message.content;
        const chatDate = document.createElement('div');
        chatDate.className = 'chat-date';
        chatDate.innerText = dateFormat(message.createdAt);
        chatItem.appendChild(chatAvatar);
        chatItem.appendChild(chatContent);
        chatItem.appendChild(chatDate);
        chatContainer.appendChild(chatItem);
    }
    // 日期格式化
    function dateFormat(timestamp) {
        const curTime = new Date(timestamp);
        const year = curTime.getFullYear();
        const month = (curTime.getMonth() + 1).toString().padStart(2, '0');
        const day = (curTime.getDate()).toString().padStart(2, '0');
        const hour = (curTime.getHours()).toString().padStart(2, '0');
        const minute = (curTime.getMinutes()).toString().padStart(2, '0');
        const second = (curTime.getSeconds()).toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
    // 3.发送消息
    msgContainer.addEventListener('submit', function (e) {
        e.preventDefault();
        sendMes();
    });
    button.addEventListener('click', function (e) {
        e.preventDefault();
        sendMes();
    });
    async function sendMes() {
        const message = txtMsg.value.trim();
        creatEleChat({
            from: result.data.loginId,
            content: message,
            createdAt: Date.now()
        });
        txtMsg.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;
        const reply = await API.sendChat(message);
        creatEleChat({
            from: null,
            content: reply.data.content,
            createdAt: Date.now()
        });
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    // 4.注销账号
    close.addEventListener('click', () => {
        API.loginOut();
        location.href = './login.html';
    });
})();