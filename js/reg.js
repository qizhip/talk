// 验证账号
const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '账号不能为空';
    }
    const resp = await API.exists(val);
    if (resp.data) {
        return '账号已存在，请重新输入'
    }
});

// 验证昵称
const nicknameValidator = new FieldValidator('txtNickname', function (val) {
    if (!val) {
        return '昵称不能为空';
    };
});

// 验证密码
const loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
    if (!val) {
        return '密码不能为空';
    }
});

// 验证再次密码
const txtLoginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm', function (val) {
    if (!val) {
        return '请再次输入密码'
    }
    if (val !== loginIdValidator.input.value) {
        return '两次输入密码不一致'
    }
});

// 表单提交
const form = document.querySelector('.user-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // 在提交时做一次表单验证，验证每一个表单项
    const result = await FieldValidator.validate(loginIdValidator, nicknameValidator, loginPwdValidator, txtLoginPwdConfirmValidator);
    if (result) {
        const result = await API.reg({
            loginId: loginIdValidator.input.value,
            nickname: nicknameValidator.input.value,
            loginPwd: loginPwdValidator.input.value
        });
        if (result.code === 0) {
            alert('恭喜您，注册成功啦！');
            location.href = './login.html';
        }
    } else {
        return
    }
});