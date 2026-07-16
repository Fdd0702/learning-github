// ======================== 默认数据定义 ============================
const defaultCategoriesData = [
    {
        name: '穿搭',
        cards: [
            { img: 'img/index/outfit1.JPG', title: '春日温柔风穿搭分享' },
            { img: 'img/index/outfit2.JPG', title: '一周通勤穿搭不重样' },
            { img: 'img/index/outfit3.JPG', title: '复古港风搭配指南' },
            { img: 'img/index/outfit4.JPG', title: '极简主义日常穿搭' }
        ]
    },
    {
        name: '美食',
        cards: [
            { img: 'img/index/food1.JPG', title: '藏在巷子里的宝藏面馆' },
            { img: 'img/index/food2.JPG', title: '周末Brunch自制指南' },
            { img: 'img/index/food3.JPG', title: '这家日料店的寿司绝了' },
            { img: 'img/index/food4.JPG', title: '夏日必备清凉甜品合集' }
        ]
    },
    {
        name: '旅行',
        cards: [
            { img: 'img/index/travle1.JPG', title: '大理洱海环湖骑行记' },
            { img: 'img/index/travle2.JPG', title: '京都古寺巡礼之旅' },
            { img: 'img/index/travle3.JPG', title: '登峰体会仙气渺渺' },
            { img: 'img/index/travle4.JPG', title: '青岛老城区漫步指南' }
        ]
    },
    {
        name: '摄影',
        cards: [
            { img: 'img/index/photo1.JPG', title: '落日时分的城市剪影' },
            { img: 'img/index/photo2.JPG', title: '胶片里的旧时光' },
            { img: 'img/index/photo3.JPG', title: '矗立的红白玫瑰' },
            { img: 'img/index/photo4.JPG', title: '雨后街头的倒影世界' }
        ]
    },
    {
        name: '露营',
        cards: [
            { img: 'img/index/camping1.JPG', title: '夕阳下的帐篷之夜' },
            { img: 'img/index/camping2.JPG', title: '山谷溪流边的野餐' },
            { img: 'img/index/camping3.JPG', title: '篝火旁的温暖时光' },
            { img: 'img/index/camping4.JPG', title: '秋日森林露营记' }
        ]
    },
    {
        name: '数码',
        cards: [
            { img: 'img/index/digital1.JPG', title: '我的极简桌面好物分享' },
            { img: 'img/index/digital2.JPG', title: '新入Macbook开箱体验' },
            { img: 'img/index/digital3.JPG', title: '极致画质的美' },
            { img: 'img/index/digital4.JPG', title: '无线耳机深度测评' }
        ]
    },
    {
        name: '运动',
        cards: [
            { img: 'img/index/exercise1.JPG', title: '瑜伽让人身心合一' },
            { img: 'img/index/exercise2.JPG', title: '晨跑打卡第100天' },
            { img: 'img/index/exercise3.JPG', title: '健身馆挥洒汗水' },
            { img: 'img/index/exercise4.JPG', title: '骑行穿梭山田之间' }
        ]
    },
    {
        name: '咖啡',
        cards: [
            { img: 'img/index/coffce1.JPG', title: '周末咖啡馆探店日记' },
            { img: 'img/index/coffce2.JPG', title: '手冲咖啡入门指南' },
            { img: 'img/index/coffce3.JPG', title: '拿铁拉花练习日常' },
            { img: 'img/index/coffce4.JPG', title: '耐人寻味的咖啡' }
        ]
    }
];

const defaultPicksData = [
    {
        img: "img/index/Today's Picks1.JPG",
        avatar: "img/head photo/1.JPG",
        name: '芬朵朵',
        title: '上海最值得逛的5条小马路',
        likes: '0',
        views: '0',
        likedBy: [],
        owner: '芬朵朵'
    },
    {
        img: "img/index/Today's Picks2.JPG",
        avatar: "img/head photo/2.JPG",
        name: '山野日记',
        title: '川西自驾游攻略全记录',
        likes: '0',
        views: '0',
        likedBy: [],
        owner: '小鹿斑比'
    },
    {
        img: "img/index/Today's Picks3.JPG",
        avatar: "img/head photo/3.JPG",
        name: '咖啡与书',
        title: '我的家庭咖啡馆布置分享',
        likes: '0',
        views: '0',
        likedBy: [],
        owner: '小鹿斑比'
    },
    {
        img: "img/index/Today's Picks4.JPG",
        avatar: "img/head photo/4.JPG",
        name: '早安茉莉',
        title: '秋季胶囊衣橱搭配指南',
        likes: '0',
        views: '0',
        likedBy: [],
        owner: '小鹿斑比'
    },
    {
        img: "img/index/Today's Picks5.JPG",
        avatar: "img/head photo/6.JPG",
        name: '光影捕手',
        title: '如何拍出电影感人像',
        likes: '0',
        views: '0',
        likedBy: [],
        owner: '小鹿斑比'
    },
    {
        img: "img/index/Today's Picks6.JPG",
        avatar: "img/head photo/7.JPG",
        name: '露营小白',
        title: '第一次露营需要准备什么',
        likes: '0',
        views: '0',
        likedBy: [],
        owner: '小鹿斑比'
    },
    {
        img: "img/index/Today's Picks7.JPG",
        avatar: "img/head photo/8.JPG",
        name: '城市漫游者',
        title: '杭州24小时citywalk路线',
        likes: '0',
        views: '0',
        likedBy: [],
        owner: '小鹿斑比'
    },
    {
        img: "img/index/Today's Picks8.JPG",
        avatar: "img/head photo/9.JPG",
        name: '面包与汤',
        title: '治愈系一人食vlog合集',
        likes: '0',
        views: '0',
        likedBy: [],
        owner: '小鹿斑比'
    }
];

// ======================== 数据持久化 ============================
const CATEGORIES_KEY = 'categoriesData';
const PICKS_KEY = 'picksData';

// 加载数据（若存储不存在则使用默认值并保存）
function loadData() {
    let categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY));
    if (!categories) {
        // 初次使用，初始化随机浏览量
        categories = JSON.parse(JSON.stringify(defaultCategoriesData));
        categories.forEach(cat => {
            cat.cards.forEach(card => {
                card.views = Math.floor(Math.random() * 100000 + 10000);
            });
        });
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    }

    let picks = JSON.parse(localStorage.getItem(PICKS_KEY));
    if (!picks) {
        picks = JSON.parse(JSON.stringify(defaultPicksData));
        localStorage.setItem(PICKS_KEY, JSON.stringify(picks));
    } else {
        // 确保每个 pick 有 likedBy 字段，并修正 likes
        picks = picks.map(pick => {
            if (!pick.likedBy) pick.likedBy = [];
            // 将 likes 与 likedBy.length 同步
            pick.likes = pick.likedBy.length;
            return pick;
        });
        localStorage.setItem(PICKS_KEY, JSON.stringify(picks));
    }

    return { categories, picks };
}

// 保存数据
function saveData() {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categoriesData));
    localStorage.setItem(PICKS_KEY, JSON.stringify(picksData));
}

// 加载数据并赋值给全局变量
let { categories: categoriesData, picks: picksData } = loadData();

// ======================== 渲染“分类”模块（仅展示，不可点击跳转） ============================
function renderCategories() {
    const container = document.getElementById('classifications');
    if (!container) return;

    //  优先使用用户作品（有 tag 的作品），若没有则回退到默认分类
    let allWorks = JSON.parse(localStorage.getItem('works')) || [];
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // 如果有用户作品且包含 tag，则按 tag 分组展示
    const hasUserWorks = allWorks.some(w => w.tag);
    if (hasUserWorks) {
        // 按 tag 分组
        const groups = {};
        allWorks.forEach(work => {
            const tag = work.tag || '生活';
            if (!groups[tag]) groups[tag] = [];
            groups[tag].push(work);
        });

        const categoryOrder = ['穿搭', '美食', '旅行', '摄影', '露营', '数码', '运动', '咖啡', '生活'];
        let html = '';
        categoryOrder.forEach(tag => {
            const works = groups[tag];
            if (!works || works.length === 0) return;
            const cardsHtml = works.slice(0, 4).map(work => {
                const author = users[work.owner]?.profile?.nickname || work.owner || '匿名';
                return `
                    <div class="show-card" style="cursor:default;">
                        <img src="${work.img}" alt="${work.title}">
                        <p class="title">${work.title}</p>
                        <p style="font-size:20px;color:#8441b4;font-weight:700"> ${author}</p>
                    </div>
                `;
            }).join('');
            html += `
                <div class="classification" id="cat-${tag}">
                    <h3>${tag}</h3>
                    <div class="show">
                        ${cardsHtml}
                    </div>
                </div>
            `;
        });
        container.innerHTML = html || '<p style="text-align:center;color:#888;padding:40px;">暂无分类作品</p>';
        return;
    }

    // 使用默认分类
    const html = categoriesData.map(cat => {
        const cardsHtml = cat.cards.map((card, idx) => `
            <div class="show-card" style="cursor:default;">
                <img src="${card.img}" alt="${card.title}">
                <p class="title">${card.title}</p>
            </div>
        `).join('');
        return `
            <div class="classification" id="cat-${cat.name}">
                <h3>${cat.name}</h3>
                <div class="show">
                    ${cardsHtml}
                </div>
            </div>
        `;
    }).join('');
    container.innerHTML = html;
}

// ======================== 渲染“Today's Picks”（单击跳转 + 双击点赞） ============================
function renderPicks() {
    const container = document.querySelector('.picks');
    if (!container) return;

    //  优先从用户作品读取，若无则使用默认 picksData
    let allWorks = JSON.parse(localStorage.getItem('works')) || [];
    let displayWorks = [];

    if (allWorks.length > 0) {
        // 按浏览量降序取前8个
        displayWorks = [...allWorks].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 8);
    } else {
        // 回退到默认 picksData
        displayWorks = picksData.map(item => ({
            id: item.id || Date.now() + Math.random(),
            img: item.img,
            title: item.title,
            owner: item.owner || item.name,
            views: parseInt(item.views) || 0,
            likes: parseInt(item.likes) || 0,
            likedBy: item.likedBy || [],
            avatar: item.avatar || 'img/head photo/default.jpg',
            name: item.name || '匿名'
        }));
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    const html = displayWorks.map(item => {
        const author = users[item.owner]?.profile?.nickname || item.owner || item.name || '匿名';
        const avatar = users[item.owner]?.profile?.avatar || item.avatar || 'img/head photo/default.jpg';
        return `
            <div class="picks-card" data-id="${item.id}">
                <div class="hot">🔥</div>
                <img src="${item.img}" alt="${item.title}" class="card-img1">
                <img src="${avatar}" alt="" class="card-img2">
                <p>${author}</p>
                <h3>${item.title}</h3>
                <div class="quantity">
                    <div class="like">❤️ 点赞：${item.likes || 0}</div>
                    <div class="look">🌏 浏览：${item.views || 0}</div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
    bindPicksCardEvents();
}

function bindPicksCardEvents() {
    const cards = document.querySelectorAll('.picks-card');
    const currentUser = localStorage.getItem('loggedUser');

    cards.forEach(card => {
        let clickTimer = null;
        const workId = card.dataset.id ? parseInt(card.dataset.id) : null;
        if (!workId) return;

        let allWorks = JSON.parse(localStorage.getItem('works')) || [];
        let work = allWorks.find(w => w.id === workId);
        if (!work) return;

        let isLiked = currentUser && work.likedBy && work.likedBy.includes(currentUser);

        function singleClick() {
            // 浏览 +1
            work.views = (work.views || 0) + 1;
            const look = card.querySelector('.look');
            if (look) look.textContent = `🌏 浏览：${work.views}`;
            localStorage.setItem('works', JSON.stringify(allWorks));

            // 跳转详情页（只传 id）
            location.href = `show.html?id=${workId}`;
        }

        function doubleClick() {
            if (!checkLogin()) return;
            const like = card.querySelector('.like');
            if (!like) return;

            if (!currentUser) {
                alert('请先登录');
                return;
            }

            if (!work.likedBy) work.likedBy = [];
            const likedIndex = work.likedBy.indexOf(currentUser);
            let num = work.likes || 0;

            if (likedIndex === -1) {
                work.likedBy.push(currentUser);
                num += 1;
                isLiked = true;
            } else {
                work.likedBy.splice(likedIndex, 1);
                num -= 1;
                isLiked = false;
            }
            work.likes = num;
            localStorage.setItem('works', JSON.stringify(allWorks));

            let newLikes;
            if (num >= 10000) {
                newLikes = (num / 10000).toFixed(1) + 'w';
            } else if (num >= 1000) {
                newLikes = (num / 1000).toFixed(1) + 'k';
            } else {
                newLikes = num.toString();
            }
            like.textContent = `❤️ 点赞：${newLikes}`;
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

// ======================== 关注功能 ============================
// 获取当前用户的关注列表存储键名
function getFollowKey() {
    const user = localStorage.getItem('loggedUser') || 'guest';
    return `followList_${user}`;
}

function bindFollowEvents() {
    const followButtons = document.querySelectorAll('.users-card button');
    followButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            if (!checkLogin()) return;
            const card = this.closest('.users-card');
            const userName = card.querySelector('.title')?.textContent;

            const followKey = getFollowKey();
            let followList = JSON.parse(localStorage.getItem(followKey)) || [];

            if (this.textContent === '关注') {
                this.textContent = '✦ 已关注';
                this.style.background = 'linear-gradient(135deg, #b388c8, #9a6fb0)';
                this.style.color = '#4a2d5a';
                if (!followList.includes(userName)) {
                    followList.push(userName);
                }
            } else {
                this.textContent = '关注';
                this.style.background = 'linear-gradient(135deg, #8441b4, #4747aa)';
                this.style.color = '#ddd';
                followList = followList.filter(name => name !== userName);
            }
            localStorage.setItem(followKey, JSON.stringify(followList));
        });
    });
}

function restoreFollowButtons() {
    const followKey = getFollowKey();
    const followList = JSON.parse(localStorage.getItem(followKey)) || [];
    const buttons = document.querySelectorAll('.users-card button');
    buttons.forEach(btn => {
        const card = btn.closest('.users-card');
        const userName = card.querySelector('.title')?.textContent;
        if (userName && followList.includes(userName)) {
            btn.textContent = '✦ 已关注';
            btn.style.background = 'linear-gradient(135deg, #b388c8, #9a6fb0)';
            btn.style.color = '#4a2d5a';
        } else {
            btn.textContent = '关注';
            btn.style.background = 'linear-gradient(135deg, #8441b4, #4747aa)';
            btn.style.color = '#ddd';
        }
    });
}

// ======================== 页面初始化 ============================
window.addEventListener('load', function () {
    renderCategories();
    renderPicks();
    restoreFollowButtons();
    bindFollowEvents();
});
