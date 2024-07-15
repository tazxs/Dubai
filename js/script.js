document.getElementById('menuBtn').addEventListener('click', function () {
    toggleMenu('open');
});

document.getElementById('closeBtn').addEventListener('click', function () {
    toggleMenu('close');
});

function toggleMenu(action) {
    var menu = document.getElementById('fullscreenMenu');
    if (action === 'open') {
        menu.style.visibility = 'visible';
        menu.style.opacity = '1';
        anime({
            targets: '.menu-panel.left-panel',
            left: '0',
            duration: 500,
            easing: 'easeInOutQuad'
        });
        anime({
            targets: '.menu-panel.right-panel',
            right: '0',
            duration: 500,
            easing: 'easeInOutQuad'
        });
        anime({
            targets: '.fullscreen-menu a',
            opacity: [0, 1],
            delay: anime.stagger(100, {
                start: 500
            }),
            duration: 500
        });
    } else {
        anime({
            targets: '.menu-panel.left-panel',
            left: '-50%',
            duration: 500,
            easing: 'easeInOutQuad'
        });
        anime({
            targets: '.menu-panel.right-panel',
            right: '-50%',
            duration: 500,
            easing: 'easeInOutQuad'
        });
        anime({
            targets: '.fullscreen-menu a',
            opacity: [1, 0],
            duration: 500
        }).finished.then(() => {
            menu.style.visibility = 'hidden';
            menu.style.opacity = '0';
        });
    }
}

document.querySelectorAll('.nav_link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        anime({
            targets: link,
            duration: 300,
            backgroundColor: '#f0f0f0',
            easing: 'easeInOutQuad'
        });
    });

    link.addEventListener('mouseleave', () => {
        anime({
            targets: link,
            duration: 300,
            backgroundColor: '#ffffff',
            easing: 'easeInOutQuad'
        });
    });

    link.addEventListener('mousedown', () => {
        anime({
            targets: link,
            duration: 100,
            scale: 0.95,
            easing: 'easeInOutQuad'
        });
    });

    link.addEventListener('mouseup', () => {
        anime({
            targets: link,
            duration: 100,
            scale: 1.0,
            easing: 'easeInOutQuad'
        });
    });

    link.addEventListener('focus', () => {
        anime({
            targets: link,
            duration: 300,
            borderColor: '#00ff00',
            easing: 'easeInOutQuad'
        });
    });
});

document.querySelectorAll('.selectable').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

document.querySelectorAll('.selectable').forEach(selectable => {
    const dropdown = selectable.querySelector('.dropdown');
    selectable.addEventListener('click', function () {
        if (dropdown.style.display === "none") {
            dropdown.style.display = "block";
            anime({
                targets: dropdown,
                translateY: [-20, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 300
            });
        } else {
            anime({
                targets: dropdown,
                translateY: [0, -20],
                opacity: [1, 0],
                easing: 'easeInExpo',
                duration: 300,
                complete: function (anim) {
                    dropdown.style.display = "none";
                }
            });
        }
    });
});

document.querySelectorAll('.selectable').forEach(selectable => {
    const dropdown = document.getElementById(selectable.dataset.dropdown);
    if (dropdown) {
        selectable.addEventListener('click', function () {
            if (dropdown.style.display === "none") {
                dropdown.style.display = "block";
                anime({
                    targets: dropdown,
                    translateY: [20, 0],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 300
                });
            }
        });

        dropdown.querySelectorAll('p').forEach(item => {
            item.addEventListener('click', function (e) {
                e.stopPropagation();
                selectable.querySelector('p').textContent = item.textContent;
                anime({
                    targets: dropdown,
                    translateY: [0, 20],
                    opacity: [1, 0],
                    easing: 'easeInExpo',
                    duration: 300,
                    complete: function (anim) {
                        dropdown.style.display = "none";
                    }
                });
                const notification = document.getElementById('notification');
                notification.textContent = 'Выбрано: ' + item.textContent;
                notification.style.display = 'block';
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(-50%) translateY(-20px)';
                anime({
                    targets: notification,
                    translateY: [0, -20],
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 500,
                    delay: 3000,
                    complete: function (anim) {
                        notification.style.opacity = '0';
                        notification.style.transform = 'translateX(-50%) translateY(0px)';
                        setTimeout(() => {
                            notification.style.display = 'none';
                        }, 600);
                    }
                });
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.selectable');
    selects.forEach(selectable => {
        const dropdown = document.getElementById(selectable.dataset.dropdown);
        if (dropdown) {
            selectable.addEventListener('click', function (e) {
                e.stopPropagation();
                const isAlreadyOpen = dropdown.style.display === "block";
                document.querySelectorAll('.dropdown').forEach(d => d.style.display = 'none');
                if (!isAlreadyOpen) {
                    dropdown.style.display = "block";
                    anime({
                        targets: dropdown,
                        translateY: [20, 0],
                        opacity: [0, 1],
                        easing: 'easeOutExpo',
                        duration: 300
                    });
                }
            });

            dropdown.querySelectorAll('p').forEach(item => {
                item.addEventListener('click', function (e) {
                    e.stopPropagation();
                    selectable.querySelector('p').textContent = item.textContent;
                    showNotification('Выбрано: ' + item.textContent);
                    dropdown.style.display = "none";
                });
            });
        }
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown').forEach(d => {
            d.style.display = 'none';
        });
    });
});

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(-50%) translateY(-20px)';

    anime({
        targets: notification,
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 500,
        complete: function () {
            setTimeout(() => {
                anime({
                    targets: notification,
                    translateY: [0, 20],
                    opacity: [1, 0],
                    easing: 'easeInExpo',
                    duration: 500,
                    complete: function () {
                        notification.style.display = 'none';
                    }
                });
            }, 3000);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.selectable');

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown').forEach(d => {
            d.style.display = 'none';
        });
    }

    selects.forEach(selectable => {
        const dropdown = document.getElementById(selectable.dataset.dropdown);
        if (dropdown) {
            selectable.addEventListener('click', function (e) {
                e.stopPropagation();
                const isAlreadyOpen = dropdown.style.display === "block";
                closeAllDropdowns();
                if (!isAlreadyOpen) {
                    dropdown.style.display = "block";
                    anime({
                        targets: dropdown,
                        translateY: [-20, 0],
                        opacity: [0, 1],
                        easing: 'easeOutExpo',
                        duration: 300
                    });
                }
            });

            dropdown.querySelectorAll('p').forEach(item => {
                item.addEventListener('click', function (e) {
                    e.stopPropagation();
                    selectable.querySelector('p').textContent = item.textContent;
                    closeAllDropdowns();
                    showNotification('Выбрано: ' + item.textContent);
                });
            });
        }
    });

    document.addEventListener('click', closeAllDropdowns);
});

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    notification.style.opacity = '1';
    anime({
        targets: notification,
        translateY: [0, -20],
        opacity: [1, 0],
        duration: 3000,
        easing: 'easeInExpo',
        complete: function () {
            notification.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.getElementById('menuBtn');
    const closeButton = document.getElementById('closeBtn');
    const fullscreenMenu = document.getElementById('fullscreenMenu');

    menuButton.addEventListener('click', function () {
        fullscreenMenu.style.visibility = 'visible';
        fullscreenMenu.style.opacity = '0';
        anime({
            targets: fullscreenMenu,
            opacity: [0, 1],
            translateY: ['-100%', '0%'],
            easing: 'easeOutExpo',
            duration: 700,
            begin: function () {
                fullscreenMenu.style.display = 'block';
            }
        });

        const menuItems = fullscreenMenu.querySelectorAll('.mobile_link, .menu_footer__block');
        anime({
            targets: menuItems,
            translateY: [20, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            easing: 'easeOutExpo',
            duration: 800,
        });
    });

    closeButton.addEventListener('click', function () {
        anime({
            targets: fullscreenMenu,
            opacity: [1, 0],
            translateY: ['0%', '-100%'],
            easing: 'easeInExpo',
            duration: 700,
            complete: function () {
                fullscreenMenu.style.visibility = 'hidden';
                fullscreenMenu.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const footerLinks = document.querySelectorAll('.footer_link, .buttons_link');

    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                scale: 1.1,
                duration: 500,
                easing: 'easeOutExpo'
            });
        });

        link.addEventListener('mouseleave', () => {
            anime({
                targets: link,
                scale: 1,
                duration: 500,
                easing: 'easeOutExpo'
            });
        });

        link.addEventListener('click', () => {
            anime({
                targets: link,
                scale: 0.9,
                duration: 300,
                easing: 'easeOutExpo',
                complete: function (anim) {
                    anime({
                        targets: link,
                        scale: 1,
                        duration: 300,
                        easing: 'easeOutExpo'
                    });
                }
            });
        });
    });

    const phoneLink = document.querySelector('.footer_top__phone');
    phoneLink.addEventListener('click', () => {
        anime({
            targets: phoneLink,
            translateY: -10,
            duration: 300,
            direction: 'alternate',
            easing: 'easeInOutSine'
        });
    });
});