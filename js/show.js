// show.js - 详情页（基于ID渲染，包含点赞功能，无消息通知）
(function() {
    const params = new URLSearchParams(window.location.search);
    const workId = parseInt(params.get('id'));

    const card = document.getElementById('detailCard');

    // ---- 兼容旧版 URL 参数（用于默认数据跳转，无点赞） ----
    if (!workId && params.get('img')) {
        const img = params.get('img');
        const title = params.get('title') || '无标题';
        const desc = params.get('desc') || '';
        const likes = params.get('likes') || '0';
        const views = params.get('views') || '0';
        const owner = params.get('owner') || '未知用户';
        card.innerHTML = `
            <img src="${img}" alt="${title}">
            <h1>${title}</h1>
            <p class="author" style="cursor:pointer; color:#8441b4; font-weight:600; margin: 8px 0;">
                👤 作者：<span>${owner}</span>
            </p>
            <p class="desc">${desc || `👤 ${owner}`}</p>
            <div class="meta">
                <span>❤️ 点赞：${likes}</span>
                <span>👀 浏览：${views}</span>
                <span>📂 来源：${params.get('type') || '热门推荐'}</span>
            </div>
            <a href="javascript:history.back()" class="back-btn">← 返回上一页</a>
        `;
        return;
    }

    // ---- 主逻辑：基于作品ID ----
    if (!workId) {
        card.innerHTML = '<p style="text-align:center;padding:60px;color:#888;">❌ 无效的作品ID</p>';
        return;
    }

    // 读取所有作品
    let allWorks = [];
    try {
        const stored = localStorage.getItem('works');
        allWorks = stored ? JSON.parse(stored) : [];
    } catch (e) {
        allWorks = [];
    }

    const work = allWorks.find(w => w.id === workId);
    if (!work) {
        card.innerHTML = '<p style="text-align:center;padding:60px;color:#888;">❌ 作品不存在或已被删除</p>';
        return;
    }

    // 确保字段存在
    if (!work.comments) work.comments = [];
    if (!work.likedBy) work.likedBy = [];

    const users = JSON.parse(localStorage.getItem('users')) || {};
    const currentUser = localStorage.getItem('loggedUser');
    const author = users[work.owner]?.profile?.nickname || work.owner || '未知用户';
    const authorAvatar = users[work.owner]?.profile?.avatar || 'img/head photo/default.jpg';
    const isLiked = currentUser && work.likedBy.includes(currentUser);

    // ---- 渲染主内容 ----
    let html = `
        <img src="${work.img}" alt="${work.title}">
        <h1>${work.title}</h1>
        <div class="author" style="display:flex;align-items:center;gap:10px;cursor:pointer;color:#8441b4;font-weight:600;margin:8px 0;padding:4px 0;">
            <img src="${authorAvatar}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;flex-shrink:0;display:block;">
            <span style="line-height:32px;">作者：<span id="authorName" data-owner="${encodeURIComponent(work.owner)}">${author}</span></span>
        </div>
        <p class="desc">${work.desc || `👤 ${author}`}</p>
        <div class="meta">
            <span id="likeCount">❤️ 点赞：${work.likes || 0}</span>
            <span>👀 浏览：${work.views || 0}</span>
            <span>📂 标签：${work.tag || '生活'}</span>
        </div>
        <div class="action-buttons" style="display:flex; gap:16px; margin:20px 0 30px;">
            <button id="likeBtn" style="background:${isLiked ? '#ff6b81' : '#eee'}; color:${isLiked ? '#fff' : '#333'}; border:none; padding:10px 28px; border-radius:30px; font-size:18px; cursor:pointer; transition:all 0.3s;">
                ❤️ ${isLiked ? '已赞' : '点赞'}
            </button>
            <a href="javascript:history.back()" class="back-btn" style="background:#ddd; padding:10px 28px; border-radius:30px; text-decoration:none; color:#333; font-size:18px;">← 返回</a>
        </div>
    `;

    // ---- 评论区 ----
    html += `<div class="comment-section" style="margin-top:30px; border-top:2px solid #e8d5f5; padding-top:20px;">`;
    html += `<h3 style="color:#8441b4; font-size:18px; margin-bottom:16px;">💬 评论 (${work.comments.length})</h3>`;

    if (work.comments.length === 0) {
        html += `<p style="color:#999; text-align:center; padding:20px 0;">✨ 暂无评论，来说点什么吧</p>`;
    } else {
        const sortedComments = [...work.comments].reverse();
        sortedComments.forEach(c => {
            const avatar = users[c.username]?.profile?.avatar || 'img/head photo/default.jpg';
            html += `
                <div style="display:flex; gap:12px; padding:12px 0; border-bottom:1px solid #f0e6f5;">
                    <img src="${avatar}" style="width:36px; height:36px; border-radius:50%; object-fit:cover; flex-shrink:0;">
                    <div style="flex:1;">
                        <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
                            <strong style="color:#8441b4; font-size:14px;">${c.username}</strong>
                            <span style="color:#aaa; font-size:12px;">${c.time}</span>
                        </div>
                        <p style="margin:4px 0 0; color:#333; font-size:14px; line-height:1.6; word-break:break-word;">${c.content}</p>
                    </div>
                </div>
            `;
        });
    }

    if (currentUser) {
        html += `
            <div style="margin-top:16px; display:flex; gap:10px; align-items:flex-start;">
                <textarea id="commentInput" placeholder="写下你的评论..." style="flex:1; padding:10px 14px; border:2px solid #e8d5f5; border-radius:12px; resize:vertical; min-height:60px; font-size:14px; outline:none; transition:border-color 0.3s; font-family:inherit;" onfocus="this.style.borderColor='#8441b4'" onblur="this.style.borderColor='#e8d5f5'"></textarea>
                <button id="submitCommentBtn" style="background:linear-gradient(135deg,#8441b4,#4747aa); color:#fff; border:none; border-radius:12px; padding:10px 24px; cursor:pointer; font-weight:600; font-size:14px; white-space:nowrap; height:fit-content; transition:transform 0.2s,box-shadow 0.2s; box-shadow:0 4px 12px rgba(132,65,180,0.25);">发送</button>
            </div>
        `;
    } else {
        html += `
            <p style="text-align:center; color:#888; margin-top:16px; font-size:14px;">
                👉 <a href="login.html" style="color:#8441b4; font-weight:600;">登录</a> 后发表评论
            </p>
        `;
    }
    html += `</div>`;

    card.innerHTML = html;

    // ---- 绑定事件 ----
    // 作者点击跳转
    const authorSpan = document.getElementById('authorName');
    if (authorSpan) {
        authorSpan.addEventListener('click', function() {
            const ownerName = decodeURIComponent(this.dataset.owner);
            if (ownerName && ownerName !== '未知用户') {
                window.location.href = `user.html?id=${encodeURIComponent(ownerName)}`;
            }
        });
    }

    //  点赞按钮
    const likeBtn = document.getElementById('likeBtn');
    if (likeBtn) {
        likeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!checkLogin()) return;
            if (!currentUser) {
                alert('请先登录');
                return;
            }

            // 重新读取最新数据
            let latestWorks = JSON.parse(localStorage.getItem('works')) || [];
            const latestWork = latestWorks.find(w => w.id === workId);
            if (!latestWork) return;

            if (!latestWork.likedBy) latestWork.likedBy = [];

            const idx = latestWork.likedBy.indexOf(currentUser);
            if (idx === -1) {
                // 点赞
                latestWork.likedBy.push(currentUser);
                latestWork.likes = (latestWork.likes || 0) + 1;
                this.textContent = '❤️ 已赞';
                this.style.background = '#ff6b81';
                this.style.color = '#fff';
            } else {
                // 取消点赞
                latestWork.likedBy.splice(idx, 1);
                latestWork.likes = Math.max(0, (latestWork.likes || 0) - 1);
                this.textContent = '❤️ 点赞';
                this.style.background = '#eee';
                this.style.color = '#333';
            }

            localStorage.setItem('works', JSON.stringify(latestWorks));

            // 更新页面显示
            const likeCount = document.getElementById('likeCount');
            if (likeCount) {
                likeCount.textContent = `❤️ 点赞：${latestWork.likes || 0}`;
            }
        });
    }

    // 提交评论
    const submitBtn = document.getElementById('submitCommentBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const input = document.getElementById('commentInput');
            const content = input.value.trim();
            if (!content) { alert('请输入评论内容'); return; }
            if (!currentUser) { alert('请先登录'); return; }

            let latestWorks = JSON.parse(localStorage.getItem('works')) || [];
            const latestWork = latestWorks.find(w => w.id === workId);
            if (!latestWork) return;

            if (!latestWork.comments) latestWork.comments = [];

            const newComment = {
                id: Date.now(),
                username: currentUser,
                content: content,
                time: new Date().toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
            };
            latestWork.comments.push(newComment);
            localStorage.setItem('works', JSON.stringify(latestWorks));
            location.reload();
        });
    }

    // 回车发送
    const commentInput = document.getElementById('commentInput');
    if (commentInput) {
        commentInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                document.getElementById('submitCommentBtn')?.click();
            }
        });
    }
})();