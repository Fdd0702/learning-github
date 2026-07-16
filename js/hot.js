// ===================== 默认数据（当没有用户作品时使用） =====================
const recommendationsData = [
    // ... 数据不变 ...
];

// ===================== 渲染热门推荐 =====================
function renderRecommendations() {
    const container = document.querySelector('.picks');
    if (!container) return;

    const users = JSON.parse(localStorage.getItem('users')) || {};
    let allWorks = JSON.parse(localStorage.getItem('works')) || [];
    let displayData = [];

    if (allWorks.length > 0) {
        displayData = [...allWorks]
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 16)
            .map(work => {
                const userInfo = users[work.owner] || {};
                return {
                    id: work.id,
                    img: work.img,
                    title: work.title,
                    likes: work.likes || 0,
                    views: work.views || 0,
                    owner: work.owner,
                    likedBy: work.likedBy || [],
                    avatar: userInfo.profile?.avatar || 'img/head photo/default.jpg',
                    nickname: userInfo.profile?.nickname || work.owner || '匿名'
                };
            });
    } else {
        displayData = recommendationsData.map((item, index) => ({
            id: -index - 1,
            img: item.img,
            title: item.title,
            likes: parseInt(item.likes) || 0,
            views: parseInt(item.views) || 0,
            owner: 'LifeHub',
            likedBy: [],
            avatar: 'img/head photo/default.jpg',
            nickname: 'LifeHub'
        }));
    }

    const html = displayData.map(item => `
        <div class="picks-card" data-id="${item.id}">
            <div class="hot">🔥</div>
            <img src="${item.img}" alt="${item.title}" class="card-img1">
            <div class="card-content" style="display:flex;flex-direction:column;align-items:center;padding:10px 12px 14px;">
                <h3 class="work-title" style="font-size:24px;color:#3b2b4a;margin:6px 0 8px;text-align:center;font-weight:600;">${item.title}</h3>
                <div class="author-info" style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
                    <img src="${item.avatar}" class="author-avatar" style="width:42px;height:42px;border-radius:50%;object-fit:cover;">
                    <span class="author-name" style="font-size:24px;color:#6b4a7a;font-weight:700;">${item.nickname}</span>
                </div>
                <div class="quantity" style="display:flex;gap:20px;font-size:14px;color:#888;">
                    <div class="like">❤️ 点赞： ${item.likes}</div>
                    <div class="look">🌏 浏览： ${item.views}</div>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = html;
    bindRecommendationEvents();
}

// ===================== 事件绑定 =====================
function bindRecommendationEvents() {
    const cards = document.querySelectorAll('.picks-card');
    const currentUser = localStorage.getItem('loggedUser');

    cards.forEach(card => {
        let clickTimer = null;
        const workId = parseInt(card.dataset.id);

        let allWorks = JSON.parse(localStorage.getItem('works')) || [];
        let work = allWorks.find(w => w.id === workId);

        let isDefault = false;
        if (!work && workId < 0) {
            const index = Math.abs(workId) - 1;
            if (index < recommendationsData.length) {
                const defaultItem = recommendationsData[index];
                work = {
                    id: workId,
                    img: defaultItem.img,
                    title: defaultItem.title,
                    likes: parseInt(defaultItem.likes) || 0,
                    views: parseInt(defaultItem.views) || 0,
                    owner: 'LifeHub',
                    likedBy: []
                };
                isDefault = true;
            }
        }
        if (!work) return;

        function singleClick() {
            // 浏览量+1
            if (!isDefault) {
                work.views = (work.views || 0) + 1;
                const look = card.querySelector('.look');
                if (look) look.textContent = `🌏 浏览： ${work.views}`;
                let allWorks = JSON.parse(localStorage.getItem('works')) || [];
                const target = allWorks.find(w => w.id === workId);
                if (target) {
                    target.views = work.views;
                    localStorage.setItem('works', JSON.stringify(allWorks));
                }
            }

            // 跳转
            if (isDefault) {
                const query = new URLSearchParams({
                    img: work.img,
                    title: work.title,
                    desc: work.desc || '',
                    likes: work.likes,
                    views: work.views,
                    owner: work.owner,
                    type: '热门推荐'
                });
                location.href = `show.html?${query.toString()}`;
            } else {
                location.href = `show.html?id=${workId}`;
            }
        }

        function doubleClick() {
            if (!checkLogin()) return;
            const like = card.querySelector('.like');
            if (!like) return;
            if (!currentUser) {
                alert('请先登录');
                return;
            }

            if (isDefault) {
                // 默认数据只临时改变显示
                const currentLikes = parseInt(like.textContent.match(/\d+/)?.[0] || 0);
                const newLikes = currentLikes + 1;
                like.textContent = `❤️ 点赞： ${newLikes}`;
                return;
            }

            // 用户作品
            if (!work.likedBy) work.likedBy = [];
            const likedIndex = work.likedBy.indexOf(currentUser);
            let num = work.likes || 0;

            if (likedIndex === -1) {
                work.likedBy.push(currentUser);
                num += 1;
            } else {
                work.likedBy.splice(likedIndex, 1);
                num -= 1;
            }
            work.likes = num;

            let allWorks = JSON.parse(localStorage.getItem('works')) || [];
            const target = allWorks.find(w => w.id === workId);
            if (target) {
                target.likes = num;
                target.likedBy = work.likedBy;
                localStorage.setItem('works', JSON.stringify(allWorks));
            }

            let newLikes;
            if (num >= 10000) {
                newLikes = (num / 10000).toFixed(1) + 'w';
            } else if (num >= 1000) {
                newLikes = (num / 1000).toFixed(1) + 'k';
            } else {
                newLikes = num.toString();
            }
            like.textContent = `❤️ 点赞： ${newLikes}`;
        }

        card.addEventListener('click', function (e) {
            if (e.target.closest('.like')) return;
            if (clickTimer) {
                clearTimeout(clickTimer);
                clickTimer = null;
                doubleClick();
                return;
            }
            clickTimer = setTimeout(() => {
                clickTimer = null;
                singleClick();
            }, 200);
        });
    });
}

window.addEventListener('load', function () {
    renderRecommendations();
});