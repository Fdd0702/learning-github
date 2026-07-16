const LOGIN_KEY = 'isLoggedIn';
const USER_KEY = 'loggedUser';


//检查用户是否已登录
function checkLogin() {
    const isLoggedIn = localStorage.getItem(LOGIN_KEY) === 'true';
    if (!isLoggedIn) {
        alert('请先登录再操作！');
        return false;   
    }
    return true;        
}

document.addEventListener('DOMContentLoaded', function() {
    const backTop = document.querySelector('.back-top');
    if (!backTop) return;
    
    function toggleBackTop() {
        const show = window.scrollY > 400;
        backTop.style.opacity = show ? '1' : '0';
        backTop.style.pointerEvents = show ? 'auto' : 'none';
    }
    
    window.addEventListener('scroll', toggleBackTop);
    toggleBackTop(); 
});

