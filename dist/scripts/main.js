// awesome abstract affect by https://codepen.io/anon/pen/rbyVVK
var canvas = document.getElementById('nokey'),
    can_w = parseInt(canvas.getAttribute('width')),
    can_h = parseInt(canvas.getAttribute('height')),
    ctx = canvas.getContext('2d');

// console.log(typeof can_w);

var ball = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 0,
    alpha: 1,
    phase: 0
},
    ball_color = {
        r: 71,
        g: 25,
        b: 33
    },
    R = 2,
    balls = [],
    alpha_f = 0.03,
    alpha_phase = 0,

    // Line
    link_line_width = 0.8,
    dis_limit = 260,
    add_mouse_point = true,
    mouse_in = false,
    mouse_ball = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        r: 0,
        type: 'mouse'
    };

// Random speed
function getRandomSpeed(pos) {
    var min = -1,
        max = 1;
    switch (pos) {
        case 'top':
            return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
            break;
        case 'right':
            return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
            break;
        case 'bottom':
            return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
            break;
        case 'left':
            return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
            break;
        default:
            return;
            break;
    }
}
function randomArrayItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function randomNumFrom(min, max) {
    return Math.random() * (max - min) + min;
}
console.log(randomNumFrom(0, 10));
// Random Ball
function getRandomBall() {
    var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
    switch (pos) {
        case 'top':
            return {
                x: randomSidePos(can_w),
                y: -R,
                vx: getRandomSpeed('top')[0],
                vy: getRandomSpeed('top')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'right':
            return {
                x: can_w + R,
                y: randomSidePos(can_h),
                vx: getRandomSpeed('right')[0],
                vy: getRandomSpeed('right')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'bottom':
            return {
                x: randomSidePos(can_w),
                y: can_h + R,
                vx: getRandomSpeed('bottom')[0],
                vy: getRandomSpeed('bottom')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'left':
            return {
                x: -R,
                y: randomSidePos(can_h),
                vx: getRandomSpeed('left')[0],
                vy: getRandomSpeed('left')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
    }
}
function randomSidePos(length) {
    return Math.ceil(Math.random() * length);
}

// Draw Ball
function renderBalls() {
    Array.prototype.forEach.call(balls, function (b) {
        if (!b.hasOwnProperty('type')) {
            ctx.fillStyle = 'rgba(' + ball_color.r + ',' + ball_color.g + ',' + ball_color.b + ',' + b.alpha + ')';
            ctx.beginPath();
            ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    });
}

// Update balls
function updateBalls() {
    var new_balls = [];
    Array.prototype.forEach.call(balls, function (b) {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x > -(50) && b.x < (can_w + 50) && b.y > -(50) && b.y < (can_h + 50)) {
            new_balls.push(b);
        }

        // alpha change
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
        // console.log(b.alpha);
    });

    balls = new_balls.slice(0);
}

// Draw lines
function renderLines() {
    var fraction, alpha;
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {

            fraction = getDisOf(balls[i], balls[j]) / dis_limit;

            if (fraction < 1) {
                alpha = (1 - fraction).toString();

                ctx.strokeStyle = 'rgba(150,150,150,' + alpha + ')';
                ctx.lineWidth = link_line_width;

                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// calculate distance between two points
function getDisOf(b1, b2) {
    var delta_x = Math.abs(b1.x - b2.x),
        delta_y = Math.abs(b1.y - b2.y);

    return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
}

// add balls if there a little balls
function addBallIfy() {
    if (balls.length < 20) {
        balls.push(getRandomBall());
    }
}

// Render
function render() {
    ctx.clearRect(0, 0, can_w, can_h);

    renderBalls();

    renderLines();

    updateBalls();

    addBallIfy();

    window.requestAnimationFrame(render);
}

// Init Balls
function initBalls(num) {
    for (var i = 1; i <= num; i++) {
        balls.push({
            x: randomSidePos(can_w),
            y: randomSidePos(can_h),
            vx: getRandomSpeed('top')[0],
            vy: getRandomSpeed('top')[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10)
        });
    }
}
// Init Canvas
function initCanvas() {
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    can_w = parseInt(canvas.getAttribute('width'));
    can_h = parseInt(canvas.getAttribute('height'));
}
window.addEventListener('resize', function (e) {
    console.log('Window Resize...');
    initCanvas();
});

function goMovie() {
    initCanvas();
    initBalls(30);
    window.requestAnimationFrame(render);
}
goMovie();
// END OF awesome affect

// My Javascript
$(document).ready(function(){
    // Add smooth scrolling to all links
    $(".smooth-scrolling").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top + 1
            }, 1000);
        } // End if
    });
    // sticky menu using jquery
    function sticktothetop() {
    var window_top = $(window).scrollTop();
    var top = $('#stick-here').offset().top;
        if (window_top > top) {
            $('#stickThis').slideDown('fast');
            $('.bars').fadeIn('slow');

            // on load
            if ($(window).width() +20 <= 900) {
                $('.menu-container').fadeIn(500);
            } else {
                $('.menu-container').css('display', 'none');
            }
            // on window resize
            $( window ).resize( () => {
                if ($(window).width() + 20 <= 900) {
                    $('.menu-container').fadeIn(500);
                } else {
                    $('.menu-container').css('display', 'none');
                }
            });
        } else {
            $('#stickThis').css('display', 'none');
            $('.menu-container').css('display', 'none');
        }
    }
    $(function() {
        $(window).scroll(sticktothetop);
        sticktothetop();
    });
});
// menu js
$('.menu-container').on('click', () => {
    $(".menu-container").toggleClass('is-menu-open');
});
  
// arrow call to action variables
let arrow = document.querySelector('.arrow'),
    arrowText = document.querySelector('.arrow-text');

// functions to change arrow's text color too!
arrow.addEventListener('mouseover', () => {
    arrowText.style.color = '#B63F55';
});
arrow.addEventListener('mouseout', () => {
    arrowText.style.color = '#222';
});
// function to remove all active
function removeActiveAll() {
    $('.portfolio').removeClass('active');
    $('.contact').removeClass('active');
    $('.about').removeClass('active');
    $('.home').removeClass('active');
}
// function to check condition
const checkCondition = (id) => $(this).scrollTop() >= $('#'+id).position().top;
// on scroll, check condition, add active based on condition bool value
$(document).on('scroll', () => {
    removeActiveAll();
    if( checkCondition('contact') ) {
        $('.contact').addClass('active');
    } 
    else if( checkCondition('portfolio') ) {
        $('.portfolio').addClass('active');
    }
    else if( checkCondition('about') ) {
        $('.about').addClass('active');
    } 
    else if( checkCondition('home') ) {
        $('.home').addClass('active');
    } 
});
// animation of progress bars
let progressBars = document.querySelectorAll('.bar');
// went from 200 lines of code to this! (DRY code)
function move() {
    for (let i=0; i < progressBars.length; i++) {
        let bar = progressBars[i];
        let width = 10;
        let moveBar = setInterval(checkBar, 20);
        function checkBar() {
            if (width >= bar.getAttribute('data-percent')) {
                clearInterval(moveBar);
            } else {
                width++; 
                bar.style.width = width + '%'; 
                bar.innerHTML = width * 1 + '%';
            }
        }
    }
}
// typing effect
var options = {
  stringsElement: '#typed-sub', 
  typeSpeed: 50,
  smartBackspace: true
}
var typed = new Typed(".header-sub-title", options);

// open menu
$('.menu-container').on('click', () => {
    $('.mobile-menu').slideToggle();
});

// click items mobile menu
let mobileHome = $('.mobile-home'),
    mobileAbout = $('.mobile-about'),
    mobilePortfolio = $('.mobile-portfolio');
    mobileContact = $('.mobile-contact');

let mobileMenuItems = $('.mobile-menu-item');

mobileMenuItems.on('click', () => {
    $('.mobile-menu').slideToggle();

    if ($('.menu-container').hasClass('is-menu-open')) {
        $('.menu-container').removeClass('is-menu-open');
    }
});