// 计算机简史科普站 - 交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // 当前页面导航高亮
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // 观察所有卡片和时间线项目
    document.querySelectorAll('.card, .timeline-item, .table-container').forEach(el => {
        observer.observe(el);
    });
    
    // 时间线项目点击跳转
    document.querySelectorAll('.timeline-content').forEach(item => {
        item.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link) {
                window.location.href = link;
            }
        });
    });
    
    // 返回顶部按钮
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTop);
    
    // 滚动显示返回顶部按钮
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.opacity = '0';
        }
    });
    
    // 返回顶部功能
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 移动端触摸滑动
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const deltaX = startX - endX;
        const deltaY = startY - endY;
        
        // 水平滑动检测
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
            const pages = [
                'index.html',
                'vacuum-tube.html', 
                'transistor.html',
                'integrated-circuit.html',
                'microprocessor.html',
                'parallel-cloud.html',
                'ai-era.html',
                'milestones.html',
                'references.html'
            ];
            
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const currentIndex = pages.indexOf(currentPage);
            
            if (deltaX > 0 && currentIndex < pages.length - 1) {
                // 向左滑动，下一页
                window.location.href = pages[currentIndex + 1];
            } else if (deltaX < 0 && currentIndex > 0) {
                // 向右滑动，上一页
                window.location.href = pages[currentIndex - 1];
            }
        }
        
        startX = 0;
        startY = 0;
    });
    
    // 键盘导航
    document.addEventListener('keydown', function(e) {
        const pages = [
            'index.html',
            'vacuum-tube.html', 
            'transistor.html',
            'integrated-circuit.html',
            'microprocessor.html',
            'parallel-cloud.html',
            'ai-era.html',
            'milestones.html',
            'references.html'
        ];
        
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const currentIndex = pages.indexOf(currentPage);
        
        if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
            window.location.href = pages[currentIndex + 1];
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            window.location.href = pages[currentIndex - 1];
        }
    });
});
