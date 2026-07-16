// ==================== 登录状态检查 ====================
const LOGIN_KEY = 'isLoggedIn';
const USER_KEY = 'loggedUser';

// ★ 修改：只有查看自己的主页时才要求登录
const viewingUser = localStorage.getItem('viewingUser');
const currentUser = localStorage.getItem(USER_KEY);

// 如果查看的是自己的主页（没有 id 参数），但未登录 → 跳转
if (!viewingUser && localStorage.getItem(LOGIN_KEY) !== 'true') {
    alert('请先登录！');
    location.href = 'login.html';
}

// ==================== 退出登录函数 ====================
function logout() {
    if (confirm('确定要退出登录吗？')) {
        localStorage.removeItem(LOGIN_KEY);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem('viewingUser');
        location.href = 'login.html';
    }
}

// 决定要显示哪个用户
function getTargetUser() {
    const viewingUser = localStorage.getItem('viewingUser');
    const currentUser = localStorage.getItem(USER_KEY);
    return viewingUser || currentUser || null;
}

// ==================== 数据 ====================

let works = [];

// ==================== 自定义弹窗 ====================
function showCustomModal(title, message, callback) {
    const oldModal = document.querySelector('.lh-custom-modal');
    if (oldModal) oldModal.remove();

    const overlay = document.createElement('div');
    overlay.className = 'lh-custom-modal';
    overlay.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.3);
        backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
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
    html += `
        <button onclick="this.closest('.lh-custom-modal').remove(); if(typeof callback === 'function') callback();"
                style="background:linear-gradient(135deg,#8441b4,#4747aa); color:#fff; border:none; padding:12px 40px; border-radius:30px; font-size:16px; cursor:pointer; transition:all 0.3s;"
                onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
            确定
        </button>
    `;
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) overlay.remove();
    });
}

// ==================== 标签选择弹窗 ====================
function showTagSelector(callback) {
    const oldModal = document.querySelector('.lh-tag-modal');
    if (oldModal) oldModal.remove();

    const overlay = document.createElement('div');
    overlay.className = 'lh-tag-modal';
    overlay.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.3);
        backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
        z-index: 99999;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
        background: #fff;
        border-radius: 24px;
        padding: 30px 36px;
        max-width: 380px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        text-align: center;
    `;

    const tagOptions = ['穿搭', '美食', '旅行', '摄影', '露营', '数码', '运动', '咖啡', '生活'];

    let html = `<h3 style="color:#8441b4; margin-bottom:16px;">选择作品标签</h3>`;
    html += `<select id="tagSelect" style="width:100%; padding:12px 16px; border:2px solid #e8d5f5; border-radius:12px; font-size:16px; outline:none; margin-bottom:20px;">`;
    tagOptions.forEach(t => {
        html += `<option value="${t}">${t}</option>`;
    });
    html += `</select>`;
    html += `
        <div style="display:flex; gap:10px; justify-content:center;">
            <button id="tagConfirm" style="background:linear-gradient(135deg,#8441b4,#4747aa); color:#fff; border:none; padding:10px 30px; border-radius:30px; font-size:16px; cursor:pointer;">确定</button>
            <button id="tagCancel" style="background:#eee; color:#333; border:none; padding:10px 30px; border-radius:30px; font-size:16px; cursor:pointer;">取消</button>
        </div>
    `;
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const confirmBtn = box.querySelector('#tagConfirm');
    const cancelBtn = box.querySelector('#tagCancel');
    const select = box.querySelector('#tagSelect');

    function close() {
        overlay.remove();
    }

    confirmBtn.addEventListener('click', function() {
        const selected = select.value;
        close();
        if (typeof callback === 'function') callback(selected);
    });

    cancelBtn.addEventListener('click', function() {
        close();
        if (typeof callback === 'function') callback(null);
    });

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            close();
            if (typeof callback === 'function') callback(null);
        }
    });
}

// ==================== 描述输入弹窗 ====================
function showDescInput(callback) {
    const oldModal = document.querySelector('.lh-desc-modal');
    if (oldModal) oldModal.remove();

    const overlay = document.createElement('div');
    overlay.className = 'lh-desc-modal';
    overlay.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.3);
        backdrop-filter: blur(4px);
        display: flex; align-items: flex-start; justify-content: center;
        padding-top: 120px;
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

    let html = `<h3 style="color:#8441b4; margin-bottom:12px; font-size:22px;">✏️ 作品描述（可选）</h3>`;
    html += `<p style="color:#888; font-size:14px; margin-bottom:12px;">简单描述一下你的作品吧</p>`;
    html += `<textarea id="descInput" placeholder="请输入作品描述..." style="width:100%; padding:12px 16px; border:2px solid #e8d5f5; border-radius:12px; font-size:16px; outline:none; resize:vertical; min-height:80px; font-family:inherit; margin-bottom:16px;" onfocus="this.style.borderColor='#8441b4'" onblur="this.style.borderColor='#e8d5f5'"></textarea>`;
    html += `
        <div style="display:flex; gap:10px; justify-content:center;">
            <button id="descConfirm" style="background:linear-gradient(135deg,#8441b4,#4747aa); color:#fff; border:none; padding:10px 30px; border-radius:30px; font-size:16px; cursor:pointer;">确定</button>
            <button id="descCancel" style="background:#eee; color:#333; border:none; padding:10px 30px; border-radius:30px; font-size:16px; cursor:pointer;">跳过</button>
        </div>
    `;
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const confirmBtn = box.querySelector('#descConfirm');
    const cancelBtn = box.querySelector('#descCancel');
    const inputField = box.querySelector('#descInput');

    function close() {
        overlay.remove();
    }

    confirmBtn.addEventListener('click', function() {
        const val = inputField.value.trim();
        close();
        if (typeof callback === 'function') callback(val || '');
    });

    cancelBtn.addEventListener('click', function() {
        close();
        if (typeof callback === 'function') callback('');
    });

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            close();
            if (typeof callback === 'function') callback('');
        }
    });

    // 自动聚焦
    setTimeout(() => inputField.focus(), 100);
}

// ==================== 加载数据 ====================
function loadWorks() {
    const targetUser = getTargetUser();
    if (!targetUser) {
        works = [];
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userData = users[targetUser];
    if (!userData) {
        works = [];
        return;
    }

    const allWorks = JSON.parse(localStorage.getItem('works')) || [];
    works = allWorks.filter(w => userData.works.includes(w.id));

}

// ==================== 弹出用户列表弹窗 ====================
function showUserList(title, userArray) {
    const oldModal = document.querySelector('.lh-userlist-modal');
    if (oldModal) oldModal.remove();

    if (!userArray || userArray.length === 0) {
        showCustomModal('提示', '暂无' + title);
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'lh-userlist-modal';
    overlay.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(255,255,255,0.3);
        backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
        z-index: 99999;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
        background: rgba(255,255,255,0.92);
        border: 2px solid #c9a8d4;
        border-radius: 24px;
        padding: 28px 32px;
        max-width: 400px;
        width: 90%;
        max-height: 70vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(132,65,180,0.25);
        animation: lhSlideUp 0.3s ease;
        color: #3b2b4a;
    `;

    // 读取用户数据以获取头像
    const users = JSON.parse(localStorage.getItem('users')) || {};

    let html = `<h3 style="color:#8441b4; text-align:center; margin-bottom:16px; font-size:22px; font-weight:700;">${title}</h3>`;
    userArray.forEach(name => {
        // 获取用户头像，若无则使用默认头像
        const avatar = users[name]?.profile?.avatar || 'img/head photo/default.jpg';
        html += `
            <div style="display:flex; align-items:center; gap:12px; padding:10px 12px; border-bottom:1px solid rgba(132,65,180,0.1); cursor:pointer; transition:all 0.2s; border-radius:8px;"
                 onmouseover="this.style.background='#f3e8fa'; this.style.paddingLeft='18px';"
                 onmouseout="this.style.background='transparent'; this.style.paddingLeft='12px';"
                 onclick="window.location.href='user.html?id=${encodeURIComponent(name)}'">
                <img src="${avatar}" style="width:36px; height:36px; border-radius:50%; object-fit:cover; flex-shrink:0;">
                <span>${name}</span>
            </div>
        `;
    });
    html += `
        <button onclick="this.closest('.lh-userlist-modal').remove()"
                style="margin-top:20px; width:100%; padding:14px; border:none; border-radius:30px;
                       background: linear-gradient(135deg, #8441b4, #4747aa);
                       color:#fff; font-size:16px; font-weight:600; cursor:pointer;
                       transition:all 0.3s; box-shadow: 0 4px 12px rgba(132,65,180,0.3);"
                onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 6px 20px rgba(132,65,180,0.5)';"
                onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(132,65,180,0.3)';">
            关闭
        </button>
    `;
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) overlay.remove();
    });
}

// ==================== 渲染用户信息 ====================

function renderUserInfo() {
    const targetUser = getTargetUser();
    const currentUser = localStorage.getItem(USER_KEY);
    if (!targetUser) return;
    
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userData = users[targetUser];
    if (!userData) return;

    const profile = userData.profile;
    if (!profile.fansList) profile.fansList = [];

    document.getElementById('userName').textContent = profile.nickname || targetUser;
    document.getElementById('userAvatar').src = profile.avatar || 'img/head photo/default.jpg';
    document.getElementById('userBio').textContent = profile.bio || '✦ 欢迎来到 LifeHub ✦';
    
    // ★ 如果是本人主页，显示编辑按钮
    const isOwnPage = (targetUser === currentUser);
    const editArea = document.getElementById('editArea');
    if (editArea) {
        editArea.style.display = isOwnPage ? 'block' : 'none';
    }
    
    const fansEl = document.getElementById('fansCount');
    fansEl.textContent = `粉丝：${profile.fansList.length}`;
    fansEl.style.cursor = 'pointer';
    fansEl.onclick = function() {
        showUserList('粉丝列表', profile.fansList);
    };

    const followKey = `followList_${targetUser}`;
    const followList = JSON.parse(localStorage.getItem(followKey)) || [];
    const followEl = document.getElementById('followCount');
    followEl.textContent = `关注：${followList.length}`;
    followEl.style.cursor = 'pointer';
    followEl.onclick = function() {
        showUserList('关注列表', followList);
    };

    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.style.display = isOwnPage ? '' : 'none';
    }
    
    const followArea = document.getElementById('followArea');
    const followBtn = document.getElementById('followUserBtn');
    if (followArea && followBtn && currentUser && targetUser !== currentUser) {
        followArea.style.display = 'block';
        
        function updateFollowButton() {
            const key = `followList_${currentUser}`;
            const list = JSON.parse(localStorage.getItem(key)) || [];
            const isFollowing = list.includes(targetUser);
            followBtn.textContent = isFollowing ? '✦ 已关注' : '+ 关注';
            followBtn.style.background = isFollowing ? 'linear-gradient(135deg, #b388c8, #9a6fb0)' : 'linear-gradient(135deg, #8441b4, #4747aa)';
            followBtn.style.color = isFollowing ? '#4a2d5a' : '#ddd';
            return isFollowing;
        }
        
        let isFollowing = updateFollowButton();
        
        followBtn.onclick = function() {
            const key = `followList_${currentUser}`;
            let list = JSON.parse(localStorage.getItem(key)) || [];
            
            if (isFollowing) {
                list = list.filter(name => name !== targetUser);
                localStorage.setItem(key, JSON.stringify(list));
                if (userData.profile.fansList) {
                    userData.profile.fansList = userData.profile.fansList.filter(name => name !== currentUser);
                    userData.profile.fans = userData.profile.fansList.length;
                    localStorage.setItem('users', JSON.stringify(users));
                    fansEl.textContent = `粉丝：${userData.profile.fansList.length}`;
                }
            } else {
                list.push(targetUser);
                localStorage.setItem(key, JSON.stringify(list));
                if (!userData.profile.fansList) userData.profile.fansList = [];
                userData.profile.fansList.push(currentUser);
                userData.profile.fans = userData.profile.fansList.length;
                localStorage.setItem('users', JSON.stringify(users));
                fansEl.textContent = `粉丝：${userData.profile.fansList.length}`;
            }
            
            isFollowing = !isFollowing;
            followBtn.textContent = isFollowing ? '✦ 已关注' : '+ 关注';
            followBtn.style.background = isFollowing ? 'linear-gradient(135deg, #b388c8, #9a6fb0)' : 'linear-gradient(135deg, #8441b4, #4747aa)';
            followBtn.style.color = isFollowing ? '#4a2d5a' : '#ddd';
            
            const newFollowList = JSON.parse(localStorage.getItem(`followList_${targetUser}`)) || [];
            followEl.textContent = `关注：${newFollowList.length}`;
        };
    } else if (followArea) {
        followArea.style.display = 'none';
    }
}

// ==================== 修改头像（自定义弹窗） ====================
function editAvatar() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function() {
        const file = this.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            showCustomModal('提示', '图片太大，请选择小于 2MB 的图片');
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgUrl = e.target.result;
            // 更新用户数据
            const users = JSON.parse(localStorage.getItem('users')) || {};
            const username = localStorage.getItem(USER_KEY);
            if (users[username]) {
                users[username].profile.avatar = imgUrl;
                localStorage.setItem('users', JSON.stringify(users));
                // 刷新页面
                location.reload();
            }
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

// ==================== 修改昵称（自定义弹窗） ====================
function editNickname() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const username = localStorage.getItem(USER_KEY);
    if (!users[username]) return;

    const currentNickname = users[username].profile.nickname || username;

    // 创建自定义弹窗
    const oldModal = document.querySelector('.lh-edit-modal');
    if (oldModal) oldModal.remove();

    const overlay = document.createElement('div');
    overlay.className = 'lh-edit-modal';
    overlay.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.3);
        backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
        z-index: 99999;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
        background: #fff;
        border-radius: 24px;
        padding: 30px 36px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        text-align: center;
    `;

    let html = `<h3 style="color:#8441b4; margin-bottom:16px;">修改昵称</h3>`;
    html += `<input id="nicknameInput" type="text" value="${currentNickname}" style="width:100%; padding:12px 16px; border:2px solid #e8d5f5; border-radius:12px; font-size:16px; outline:none; margin-bottom:20px;" onfocus="this.style.borderColor='#8441b4'" onblur="this.style.borderColor='#e8d5f5'">`;
    html += `
        <div style="display:flex; gap:10px; justify-content:center;">
            <button id="editConfirm" style="background:linear-gradient(135deg,#8441b4,#4747aa); color:#fff; border:none; padding:10px 30px; border-radius:30px; font-size:16px; cursor:pointer;">确定</button>
            <button id="editCancel" style="background:#eee; color:#333; border:none; padding:10px 30px; border-radius:30px; font-size:16px; cursor:pointer;">取消</button>
        </div>
    `;
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const confirmBtn = box.querySelector('#editConfirm');
    const cancelBtn = box.querySelector('#editCancel');
    const inputField = box.querySelector('#nicknameInput');

    function close() {
        overlay.remove();
    }

    confirmBtn.addEventListener('click', function() {
        const val = inputField.value.trim();
        if (!val) {
            showCustomModal('提示', '昵称不能为空');
            return;
        }
        const usersData = JSON.parse(localStorage.getItem('users')) || {};
        const uname = localStorage.getItem(USER_KEY);
        if (usersData[uname]) {
            usersData[uname].profile.nickname = val;
            localStorage.setItem('users', JSON.stringify(usersData));
            close();
            location.reload();
        }
    });

    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) close();
    });

    // 回车确认
    inputField.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            confirmBtn.click();
        }
    });
    setTimeout(() => inputField.focus(), 100);
}

// ==================== 修改签名（自定义弹窗） ====================
function editBio() {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const username = localStorage.getItem(USER_KEY);
    if (!users[username]) return;

    const currentBio = users[username].profile.bio || '';

    const oldModal = document.querySelector('.lh-edit-modal');
    if (oldModal) oldModal.remove();

    const overlay = document.createElement('div');
    overlay.className = 'lh-edit-modal';
    overlay.style.cssText = `
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: rgba(0,0,0,0.3);
        backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
        z-index: 99999;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
        background: #fff;
        border-radius: 24px;
        padding: 30px 36px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        text-align: center;
    `;

    let html = `<h3 style="color:#8441b4; margin-bottom:16px;">修改签名</h3>`;
    html += `<textarea id="bioInput" style="width:100%; padding:12px 16px; border:2px solid #e8d5f5; border-radius:12px; font-size:16px; outline:none; resize:vertical; min-height:80px; font-family:inherit; margin-bottom:20px;" onfocus="this.style.borderColor='#8441b4'" onblur="this.style.borderColor='#e8d5f5'">${currentBio}</textarea>`;
    html += `
        <div style="display:flex; gap:10px; justify-content:center;">
            <button id="editConfirm" style="background:linear-gradient(135deg,#8441b4,#4747aa); color:#fff; border:none; padding:10px 30px; border-radius:30px; font-size:16px; cursor:pointer;">确定</button>
            <button id="editCancel" style="background:#eee; color:#333; border:none; padding:10px 30px; border-radius:30px; font-size:16px; cursor:pointer;">取消</button>
        </div>
    `;
    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const confirmBtn = box.querySelector('#editConfirm');
    const cancelBtn = box.querySelector('#editCancel');
    const inputField = box.querySelector('#bioInput');

    function close() {
        overlay.remove();
    }

    confirmBtn.addEventListener('click', function() {
        const val = inputField.value.trim() || '✦ 欢迎来到 LifeHub ✦';
        const usersData = JSON.parse(localStorage.getItem('users')) || {};
        const uname = localStorage.getItem(USER_KEY);
        if (usersData[uname]) {
            usersData[uname].profile.bio = val;
            localStorage.setItem('users', JSON.stringify(usersData));
            close();
            location.reload();
        }
    });

    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) close();
    });
    setTimeout(() => inputField.focus(), 100);
}

// ==================== 渲染作品（我的作品） ====================
function renderWorks() {
    const container = document.getElementById('workContainer');
    if (!container) return;

    if (works.length === 0) {
        container.innerHTML = `<p class="empty-tip">还没有作品，点击"上传作品"添加吧 🎨</p>`;
        updateTotalViews();
        return;
    }

    const currentUser = localStorage.getItem(USER_KEY);

    let html = '';
    works.forEach(work => {
        const isOwner = (currentUser && work.owner === currentUser);
        html += `
            <div class="work-card" data-id="${work.id}">
                <div class="work">
                    <img src="${work.img}" alt="${work.title}">
                    ${isOwner ? `<button class="delete-btn" data-id="${work.id}">✕</button>` : ''}
                </div>
                <div class="browse">▶ ${work.views}</div>
            </div>
        `;
    });
    container.innerHTML = html;

    container.querySelectorAll('.work-card').forEach(card => {
        const id = parseInt(card.dataset.id, 10);
        const img = card.querySelector('.work img');
        if (img) {
            img.addEventListener('click', function (e) {
                e.stopPropagation();
                const work = works.find(w => w.id === id);
                if (!work) return;

                work.views += 1;
                card.querySelector('.browse').textContent = `▶ ${work.views}`;
                updateTotalViews();

                let allWorks = JSON.parse(localStorage.getItem('works')) || [];
                const target = allWorks.find(w => w.id === id);
                if (target) {
                    target.views = work.views;
                    localStorage.setItem('works', JSON.stringify(allWorks));
                }

                location.href = `show.html?id=${id}`;
            });
        }
    });

    container.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const id = parseInt(this.dataset.id, 10);
            const work = works.find(w => w.id === id);
            if (!work) return;

            if (currentUser !== work.owner) {
                showCustomModal('提示', '您没有权限删除此作品');
                return;
            }

            if (!confirm('确定删除此作品？')) return;

            let allWorks = JSON.parse(localStorage.getItem('works')) || [];
            allWorks = allWorks.filter(w => w.id !== id);
            localStorage.setItem('works', JSON.stringify(allWorks));

            const users = JSON.parse(localStorage.getItem('users')) || {};
            const ownerData = users[work.owner];
            if (ownerData) {
                ownerData.works = ownerData.works.filter(wid => wid !== id);
                localStorage.setItem('users', JSON.stringify(users));
            }

            loadWorks();
            renderWorks();
            updateTotalViews();
        });
    });

    updateTotalViews();
}

// ==================== 更新总播放量 ====================
function updateTotalViews() {
    const playEl = document.querySelector('.play');
    if (!playEl) return;
    const total = works.reduce((sum, w) => sum + w.views, 0);
    playEl.textContent = `播放量：${total}`;
}

// ==================== 渲染“我的点赞”（仅本人可见） ====================
function renderMyLikes() {
    const container = document.getElementById('myLikesContainer');
    const section = document.getElementById('myLikesSection');
    if (!container || !section) return;

    const targetUser = getTargetUser();
    const currentUser = localStorage.getItem(USER_KEY);

    // 只有查看自己的主页才显示
    if (targetUser !== currentUser) {
        section.style.display = 'none';
        return;
    }
    section.style.display = 'block';

    if (!currentUser) {
        container.innerHTML = `<p class="empty-tip">请先登录</p>`;
        return;
    }

    const allWorks = JSON.parse(localStorage.getItem('works')) || [];
    const likedWorks = allWorks.filter(w => w.likedBy && w.likedBy.includes(currentUser));

    if (likedWorks.length === 0) {
        container.innerHTML = `<p class="empty-tip">还没有点赞过任何作品 💔</p>`;
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    let html = '';
    likedWorks.forEach(work => {
        const author = users[work.owner]?.profile?.nickname || work.owner || '匿名';
        html += `
            <div class="work-card like-card" data-id="${work.id}" style="cursor:pointer;">
                <div class="work">
                    <img src="${work.img}" alt="${work.title}">
                </div>
                <div style="padding:10px 12px;">
                    <p style="font-weight:600; color:#3b2b4a;">${work.title}</p>
                    <p style="font-size:13px; color:#888;">👤 ${author}</p>
                    <p style="font-size:13px; color:#8441b4;">❤️ ${work.likes || 0} 次点赞</p>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;

    container.querySelectorAll('.like-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.dataset.id;
            location.href = `show.html?id=${id}`;
        });
    });
}

// ==================== 上传作品 ====================
function uploadWork() {
    console.log('uploadWork called');
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function () {
        console.log('file selected');
        const file = this.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            showCustomModal('提示', '图片太大，请选择小于 2MB 的图片');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const imgUrl = e.target.result;
                const title = prompt('作品标题（可选）：') || '未命名';

                // 第一步：选择标签
                showTagSelector(function(tag) {
                    if (!tag) {
                        // 用户取消，终止上传
                        return;
                    }

                    // ★ 第二步：输入描述（使用自定义弹窗）
                    showDescInput(function(desc) {
                        // desc 可能为空字符串，表示用户跳过了

                        // 创建作品
                        let allWorks = [];
                        try {
                            const stored = localStorage.getItem('works');
                            allWorks = stored ? JSON.parse(stored) : [];
                        } catch (e) {
                            allWorks = [];
                        }
                        const newId = allWorks.length ? Math.max(...allWorks.map(w => w.id)) + 1 : 1;

                        const newWork = {
                            id: newId,
                            owner: localStorage.getItem(USER_KEY),
                            img: imgUrl,
                            title: title.trim() || '未命名',
                            tag: tag,                      //  保存标签（可为空）
                            desc: desc || '',              //  保存描述（可为空）
                            views: 0,
                            likes: 0,
                            likedBy: [],
                            comments: [],
                            createTime: Date.now()
                        };
                        allWorks.push(newWork);
                        localStorage.setItem('works', JSON.stringify(allWorks));

                        const users = JSON.parse(localStorage.getItem('users') || '{}');
                        const userData = users[localStorage.getItem(USER_KEY)];
                        if (userData) {
                            if (!userData.works) userData.works = [];
                            userData.works.push(newId);
                            localStorage.setItem('users', JSON.stringify(users));
                        } else {
                            showCustomModal('错误', '用户数据异常，请重新登录');
                            return;
                        }

                        loadWorks();
                        renderWorks();
                        showCustomModal('成功', '✅ 上传成功！');
                    });
                });
            } catch (err) {
                console.error('上传出错:', err);
                showCustomModal('错误', '上传失败，请查看控制台错误');
            }
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

// ==================== 更新关注数 ====================
function updateFollowCount() {
    const targetUser = getTargetUser();
    if (!targetUser) return;

    const followKey = `followList_${targetUser}`;
    const followList = JSON.parse(localStorage.getItem(followKey)) || [];
    const count = followList.length;
    const followEl = document.getElementById('followCount');
    if (followEl) {
        followEl.textContent = `关注：${count}`;
    }
}

// ==================== 页面初始化 ====================
window.addEventListener('load', function () {
    loadWorks();
    renderWorks();
    renderMyLikes();
    updateFollowCount();
    renderUserInfo();

    document.getElementById('uploadBtn')?.addEventListener('click', uploadWork);

    // ★ 编辑按钮绑定
    document.getElementById('editAvatarBtn')?.addEventListener('click', editAvatar);
    document.getElementById('editNicknameBtn')?.addEventListener('click', editNickname);
    document.getElementById('editBioBtn')?.addEventListener('click', editBio);

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            logout();
        });
    }
});