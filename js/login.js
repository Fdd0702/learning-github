// 登录状态存储 key
const LOGIN_KEY = 'isLoggedIn';
const USER_KEY = 'loggedUser';
const USERS_KEY = 'users';

// ==================== 自定义弹窗（弹窗位置靠上） ====================
function showCustomModal(title, message, callback) {
    const oldModal = document.querySelector('.lh-custom-modal');
    if (oldModal) oldModal.remove();

    const overlay = document.createElement('div');
    overlay.className = 'lh-custom-modal';
    overlay.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.3);
        backdrop-filter: blur(4px);
        display: flex; 
        align-items: flex-start;      /* 改为靠上对齐 */
        justify-content: center; 
        padding-top: 120px;           /* 距顶部距离，可调整 */
        z-index: 99999;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
        background: #fff;
        border-radius: 24px;
        padding: 30px 36px;
        max-width: 420px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        text-align: center;
        animation: lhSlideUp 0.3s ease;
    `;

    let html = `<h3 style="color:#8441b4; margin-bottom:12px; font-size:22px;">${title}</h3>`;
    html += `<p style="color:#555; font-size:16px; line-height:1.6; margin-bottom:24px;">${message}</p>`;
    html += `<button id="modalConfirmBtn" style="background:linear-gradient(135deg,#8441b4,#4747aa); color:#fff; border:none; padding:12px 40px; border-radius:30px; font-size:16px; cursor:pointer; transition:all 0.3s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">确定</button>`;
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const confirmBtn = box.querySelector('#modalConfirmBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            overlay.remove();
            if (typeof callback === 'function') {
                callback();
            }
        });
    }

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

window.addEventListener('load', function () {
    // ---------- 1. 检查是否已登录 ----------
    const isLoggedIn = localStorage.getItem(LOGIN_KEY) === 'true';
    if (isLoggedIn) {
        showCustomModal('提示', '您已登录，自动跳转首页！', function() {
            location.href = 'index.html';
        });
        return;
    }

    // ---------- 2. 未登录则绑定登录表单事件 ----------
    const user = document.getElementById('username');
    const pas = document.getElementById('password');
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = user.value.trim();
        const password = pas.value.trim();

        if (username === '' || password === '') {
            showCustomModal('提示', '账号或密码不能为空');
            return;
        }

        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || {};
        const userData = users[username];

        if (userData && userData.password === password) {
            localStorage.setItem(LOGIN_KEY, 'true');
            localStorage.setItem(USER_KEY, username);

            showCustomModal('成功', '🎉 登录成功！即将跳转首页！', function() {
                location.href = 'index.html';
            });
        } else {
            showCustomModal('错误', '❌ 账号或密码错误');
        }
    });
});