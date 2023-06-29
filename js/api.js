var API = (
    function () {
        const BASE_URL = 'https://study.duyiedu.com';
        const TOKEN_KEY = 'token';

        // 封装get方法
        function get(path) {
            let headers = { 'Content-Type': 'application/json' };
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
                headers.authorization = `Bearer ${token}`;
            }
            return fetch(BASE_URL + path, { headers });
        }

        // 封装path方法
        function path(path, bodyObj) {
            let headers = { 'Content-Type': 'application/json' };
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
                headers.authorization = `Bearer ${token}`;
            }
            return fetch(BASE_URL + path, {
                method: 'POST',
                headers,
                body: JSON.stringify(bodyObj)
            });
        }

        // 用户注册
        async function reg(userInfo) {
            const resp = await path('/api/user/reg', userInfo);
            return await resp.json();
        }


        // 用户登录
        async function login(loginInfo) {
            const resp = await path('/api/user/login', loginInfo);
            const result = await resp.json();
            if (result.code === 0) {
                localStorage.setItem(TOKEN_KEY, resp.headers.get('authorization'));
            }
            return result;
        }
        // 账号验证
        async function exists(loginId) {
            const resp = await get(`/api/user/exists?loginId=${loginId}`);
            return await resp.json();
        }
        // 当前用户信息
        async function profile() {
            const resp = await get('/api/user/profile');
            return await resp.json();
        }
        // 发送聊天记录
        async function sendChat(content) {
            const resp = await path('/api/chat', { 'content': content });
            return await resp.json();
        }
        // 获取聊天记录
        async function getHistory() {
            const resp = await get('/api/chat/history');
            return await resp.json();
        }

        // 注销
        function loginOut() {
            localStorage.removeItem(TOKEN_KEY);
        }

        return {
            reg,
            login,
            exists,
            profile,
            sendChat,
            getHistory,
            loginOut
        }
    }
)();