// script.js
let burgerButton = document.getElementById('burgerBtn');
let closeButton = document.getElementById('closeBtn');
let mobileMenu = document.getElementById('mobileMenu');

function openMenu() {
    mobileMenu.classList.add('active');
}

function closeMenu() {
    mobileMenu.classList.remove('active');
}

burgerButton.addEventListener('click', openMenu);
closeButton.addEventListener('click', closeMenu);





function toggleFAQ(buttonId, answerId) {
    const button = document.getElementById(buttonId);
    const answer = document.getElementById(answerId);
    const buttonImg = button.querySelector("img");

    button.addEventListener('click', function () {
        if (answer.style.display === 'none') {
            answer.style.display = 'block';
            buttonImg.src = "./img/-.png";
        } else {
            answer.style.display = 'none';
            buttonImg.src = "./img/+.png";
        }
    });
}


toggleFAQ("+butt-1", "answer-1");
toggleFAQ("+butt-2", "answer-2");
toggleFAQ("+butt-3", "answer-3");