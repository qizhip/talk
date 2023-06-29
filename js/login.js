// 验证账号
const loginIdValidator = new FieldValidator('txtLoginId', async function (val) {
    if (!val) {
        return '账号不能为空1';
    }
});

// 验证密码
const loginPwdValidator = new FieldValidator('txtLoginPwd', function (val) {
    if (!val) {
        return '密码不能为空1';
    }
});

// 表单提交
const form = document.querySelector('.user-form');
form.addEventListener('submit', async (e) => {
    console.log(1);
    e.preventDefault();
    // 在提交时做一次表单验证，验证每一个表单项
    const result = await FieldValidator.validate(loginIdValidator, loginPwdValidator);
    if (result) {
        const result = await API.login({
            loginId: loginIdValidator.input.value,
            loginPwd: loginPwdValidator.input.value
        });
        if (result.code === 0) {
            alert('恭喜您，登录成功啦！');
            location.href = './index.html';
        }
    } else {
        return
    }
});