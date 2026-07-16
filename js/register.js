const USERS_KEY = 'users';

window.addEventListener('load', function () {
    const form = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmPassword');

    const usernameHint = document.getElementById('usernameHint');
    const passwordHint = document.getElementById('passwordHint');
    const confirmHint = document.getElementById('confirmHint');

    // ---------- 实时校验函数 ----------
    function validateUsername() {
        const val = usernameInput.value.trim();
        if (!val) {
            usernameHint.textContent = '⚠️ 用户名不能为空';
            usernameHint.className = 'hint error';
            return false;
        }

        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || {};
        if (users[val]) {
            usernameHint.textContent = '❌ 该用户名已被注册';
            usernameHint.className = 'hint error';
            return false;
        }
        usernameHint.textContent = '✅ 用户名可用';
        usernameHint.className = 'hint success';
        return true;
    }

    function validatePassword() {
        const val = passwordInput.value.trim();
        if (!val) {
            passwordHint.textContent = '⚠️ 密码不能为空';
            passwordHint.className = 'hint error';
            return false;
        }
        if (val.length < 6) {
            passwordHint.textContent = '❌ 密码长度至少6位';
            passwordHint.className = 'hint error';
            return false;
        }
        passwordHint.textContent = '✅ 密码长度符合要求';
        passwordHint.className = 'hint success';
        return true;
    }

    function validateConfirm() {
        const pwd = passwordInput.value.trim();
        const confirm = confirmInput.value.trim();
        if (!confirm) {
            confirmHint.textContent = '⚠️ 请再次输入密码';
            confirmHint.className = 'hint error';
            return false;
        }
        if (pwd !== confirm) {
            confirmHint.textContent = '❌ 两次密码不一致';
            confirmHint.className = 'hint error';
            return false;
        }
        confirmHint.textContent = '✅ 密码匹配';
        confirmHint.className = 'hint success';
        return true;
    }

    // ---------- 绑定 input 事件 ----------
    usernameInput.addEventListener('input', validateUsername);
    passwordInput.addEventListener('input', function () {
        validatePassword();
        // 密码变化时，也要重新校验确认密码
        if (confirmInput.value.trim()) {
            validateConfirm();
        }
    });
    confirmInput.addEventListener('input', validateConfirm);

    // ---------- 提交时再次整体校验 ----------
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // 执行所有校验，并获取结果
        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirm();

        if (!isUsernameValid || !isPasswordValid || !isConfirmValid) {
            alert('请根据提示修正输入');
            return;
        }

        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        let users = JSON.parse(localStorage.getItem(USERS_KEY)) || {};
        // 再次防重复
        if (users[username]) {
            alert('该用户名已被注册，请更换！');
            return;
        }

        users[username] = {
            password: password,
            registerTime: new Date().toISOString(),
            profile: {
                nickname: username,
                avatar: 'img/head photo/11.jpg',
                bio: `✦ ${username} 的生活记录 ✦`,
                fans: 0,
                fansList: [],
            },
            works: []
        };
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        alert('🎉 注册成功！请前往登录。');
        location.href = 'login.html';
    });
});