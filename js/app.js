WebFontConfig = {
    google: { families: ['Inter:400,500,600,700,900&display=swap'] }
};
// 'Cormorant Infant:700&display=swap', 
(function(d) {
    var wf = d.createElement('script'),
        s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);


//loader function
var Loader = function() {}
Loader.prototype = {
    require: function(scripts, callback) {
        this.loadCount = 0;
        this.totalRequired = scripts.length;
        this.callback = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i]);
        }
    },
    loaded: function(evt) {
        this.loadCount++;

        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function(src) {
        var self = this;
        var s = document.createElement('script');
        s.type = "text/javascript";
        s.defer = true;
        s.src = src;
        s.addEventListener('load', function(e) { self.loaded(e); }, false);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(s);
    }
}




Function.prototype.throttle = function(milliseconds, context) {
    var baseFunction = this,
        lastEventTimestamp = null,
        limit = milliseconds;

    return function() {
        var self = context || this,
            args = arguments,
            now = Date.now();

        if (!lastEventTimestamp || now - lastEventTimestamp >= limit) {
            lastEventTimestamp = now;
            baseFunction.apply(self, args);
        }
    };
};



createParalax()

function createParalax() {
    if (window.matchMedia("(min-width: 1024px)").matches) {
        let bg = document.querySelector('.hero-pattern img');
        let fog1 = document.querySelector('.palace-zone');
        let fog2 = document.querySelector('.time-zone');
        let fog3 = document.querySelector('.title-zone');
        let fog4 = document.querySelector('.format-zone');
        document.querySelector('.hero').addEventListener('mousemove', function(e) {
            let x = e.clientX / window.innerWidth;
            let y = e.clientY / window.innerHeight;
            bg.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
            fog1.style.transform = 'translate(+' + x * 50 + 'px, +' + y * 50 + 'px)';
            fog3.style.transform = 'translate(+' + x * 100 + 'px, +' + y * 70 + 'px)';
            fog2.style.transform = 'translate(-' + x * 50 + 'px, -' + y * 50 + 'px)';
            fog4.style.transform = 'translate(+' + x * 50 + 'px, +' + y * 50 + 'px)';
        }.throttle(100));
    }

}

if (document.querySelector('.programm-inner')) {
    function intitDreag() {
        (function(root, factory) {
            if (typeof define === 'function' && define.amd) {
                define(['exports'], factory);
            } else if (typeof exports !== 'undefined') {
                factory(exports);
            } else {
                factory((root.dragscroll = {}));
            }
        }(this, function(exports) {

            var _window = window;
            var _document = document;
            var mousemove = 'mousemove';
            var mouseup = 'mouseup';
            var mousedown = 'mousedown';
            var EventListener = 'EventListener';
            var addEventListener = 'add' + EventListener;
            var removeEventListener = 'remove' + EventListener;
            var newScrollX, newScrollY;

            var dragged = [];
            var reset = function(i, el) {
                for (i = 0; i < dragged.length;) {
                    el = dragged[i++];
                    el = el.container || el;
                    el[removeEventListener](mousedown, el.md, 0);
                    _window[removeEventListener](mouseup, el.mu, 0);
                    _window[removeEventListener](mousemove, el.mm, 0);
                }

                // cloning into array since HTMLCollection is updated dynamically
                dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
                for (i = 0; i < dragged.length;) {
                    (function(el, lastClientX, lastClientY, pushed, scroller, cont) {
                        (cont = el.container || el)[addEventListener](
                            mousedown,
                            cont.md = function(e) {
                                if (!el.hasAttribute('nochilddrag') ||
                                    _document.elementFromPoint(
                                        e.pageX, e.pageY
                                    ) == cont
                                ) {
                                    pushed = 1;
                                    lastClientX = e.clientX;
                                    lastClientY = e.clientY;

                                    e.preventDefault();
                                }
                            }, 0
                        );

                        _window[addEventListener](
                            mouseup, cont.mu = function() {
                                pushed = 0;
                            }, 0
                        );

                        _window[addEventListener](
                            mousemove,
                            cont.mm = function(e) {
                                if (pushed) {
                                    (scroller = el.scroller || el).scrollLeft -=
                                        newScrollX = (-lastClientX + (lastClientX = e.clientX));
                                    scroller.scrollTop -=
                                        newScrollY = (-lastClientY + (lastClientY = e.clientY));
                                    if (el == _document.body) {
                                        (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                        scroller.scrollTop -= newScrollY;
                                    }
                                }
                            }, 0
                        );
                    })(dragged[i++]);
                }
            }


            if (_document.readyState == 'complete') {
                reset();
            } else {
                _window[addEventListener]('load', reset, 0);
            }

            exports.reset = reset;
        }));

        function getTransformValue(element, property) {
            var values = element[0].style.transform.split(")");
            for (var key in values) {
                var val = values[key];
                var prop = val.split("(");
                if (prop[0].trim() == property)
                    return prop[1];
            }
            return false;
        }
    }

    let programm = document.querySelector('.programm-inner');
    if (programm.scrollWidth > window.innerWidth) {
        programm.classList.add('dragscroll');
        intitDreag()
    }

    (function() {
        var throttle = function(type, name, obj) {
            obj = obj || window;
            var running = false;
            var func = function() {
                if (running) { return; }
                running = true;
                requestAnimationFrame(function() {
                    obj.dispatchEvent(new CustomEvent(name));
                    running = false;
                });
            };
            obj.addEventListener(type, func);
        };
        throttle("resize", "optimizedResize");
    })();

    window.addEventListener("optimizedResize", function() {
        if (programm.scrollWidth > window.innerWidth && (!programm.classList.contains('dragscroll'))) {
            programm.classList.add('dragscroll');
            intitDreag()
        }
    });
}



function setCookie(name, value) {
    var expires = "";
    expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


document.addEventListener("DOMContentLoaded", function(event) {



    document.querySelector('body').classList.remove('loading')
        // document.addEventListener('contextmenu', event => event.preventDefault());


    var l = new Loader();
    l.require([
            "./js/lazy-load.js"
        ],
        function() {});

    setTimeout(() => {
        var l = new Loader();
        l.require([
                "./js/galery.js"
            ],
            function() {});

    }, 1000);

    setTimeout(() => {
        var l = new Loader();
        l.require([
                "./js/scroll.js"
            ],
            function() {});

    }, 200);

    if (!getCookie('alert')) {
        setTimeout(() => {
            let cookiesAlert = document.querySelector('.cookies');
            let cookiesBtn = cookiesAlert.querySelector('.cookies-btn')
            cookiesAlert.classList.add('show-alert')
            cookiesBtn.addEventListener('click', function(e) {
                cookiesAlert.classList.remove('show-alert');
                setCookie('alert', 'show-alert')
                setTimeout(() => { cookiesAlert.remove(); }, 300);
            })
        }, 3500);
    }








    setTimeout(() => {
        let slideUp = (target, duration = 500) => {
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.boxSizing = 'border-box';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.style.display = 'none';
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                //alert("!");
            }, duration);
        }

        let slideDown = (target, duration = 500) => {
            target.style.removeProperty('display');
            let display = window.getComputedStyle(target).display;
            if (display === 'none')
                display = 'block';
            target.style.display = display;
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.boxSizing = 'border-box';
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout(() => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
            }, duration);
        }
        var slideToggle = (target, duration = 500) => {
            if (window.getComputedStyle(target).display === 'none') {
                return slideDown(target, duration);
            } else {
                return slideUp(target, duration);
            }
        }

        let openFaqs = document.querySelectorAll('.open-a')
        openFaqs.forEach(function(openFaq) {
            openFaq.addEventListener('click', function(event) {
                if (event.target.closest('.faq-element').classList.contains('active-el')) {
                    slideUp(event.target.closest('.faq-element').querySelector('.hidden-list'), 300);
                    event.target.closest('.faq-element').classList.remove('active-el');
                } else {
                    if (document.querySelector('.active-el')) {
                        slideToggle(document.querySelector('.active-el .hidden-list'), 300);
                        document.querySelector('.active-el').classList.toggle('active-el');
                    }
                    slideDown(event.target.closest('.faq-element').querySelector('.hidden-list'), 300);
                    event.target.closest('.faq-element').classList.add('active-el');
                }
            })
        })


        function getScrollbarWidth() {
            const outer = document.createElement('div');
            outer.style.visibility = 'hidden';
            outer.style.overflow = 'scroll';
            outer.style.msOverflowStyle = 'scrollbar';
            document.body.appendChild(outer);
            const inner = document.createElement('div');
            outer.appendChild(inner);
            const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
            outer.parentNode.removeChild(outer);
            return scrollbarWidth;
        }


        var modals = document.querySelectorAll('[data-modal-open]');
        var modalOverlay = document.querySelector('.modal-overley');

        function openModal(modal) {
            modalOverlay.classList.add('overley-active')
            let modalWindow = document.querySelector('[data-modal=' + modal.getAttribute('data-modal-open') + ']')
            modalWindow.classList.add('modal-open');
            if (document.body.offsetHeight > window.innerHeight) {
                document.body.style.paddingRight = getScrollbarWidth() + 'px';
                document.querySelector('.header').style.paddingRight = getScrollbarWidth() + 'px';
                document.body.classList.add('bodylock');
                modalWindow.scrollTop = 0;
                let tourImg = modal.getAttribute('data-img')
                let tourTitle = modal.closest('.party-card').querySelector('.p-party-title').textContent;
                let fullDescr = modal.getAttribute('full-descr')
                let timeDescr = modal.getAttribute('time-descr')
                let priceDescr = modal.getAttribute('price-descr')
                modalWindow.querySelector('.descr-img img').setAttribute('src', tourImg);
                modalWindow.querySelector('.descr-title').textContent = tourTitle;
                modalWindow.querySelector('.party-time span').textContent = timeDescr;
                modalWindow.querySelector('.party-value span').textContent = priceDescr;
                modalWindow.querySelector('.party-must').innerHTML = fullDescr;

            }

        }


        function closeModal(modal) {
            modal.classList.add('modal-will-close');
            modal.addEventListener("animationend", function() {
                if (modal.classList.contains('modal-will-close')) {
                    modalOverlay.classList.remove('overley-active')
                    this.classList.remove('modal-open');
                    this.classList.remove('modal-will-close');
                    if (document.body.offsetHeight > window.innerHeight) {
                        document.body.classList.remove('bodylock');
                        document.body.style.paddingRight = '0px';
                        document.querySelector('.header').style.paddingRight = '0px'
                    }
                }
            });
        }


        modals.forEach(function(modal) {
            modal.addEventListener('click', function(event) {
                event.preventDefault();
                openModal(modal);
            });
        });


        let writeButton = document.querySelector('.modal .modal-cta')
        if (writeButton) {
            writeButton.addEventListener('click', function(event) {
                closeModal(document.querySelector('.modal'));
            });
        }



        var modalCloseButtons = document.querySelectorAll('.close-modal')
        if (modalCloseButtons) {
            modalCloseButtons.forEach(function(modalCloseButton) {
                modalCloseButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    closeModal(modalCloseButton.closest('.modal'))
                });
            });
        }

        if (document.querySelector('.modal')) {
            document.querySelector('.modal').addEventListener('click', function(event) {
                if (!event.target.matches('.modal-open')) return
                closeModal(this);
            });
        }

        window.onkeydown = function(event) {
            if (event.keyCode == 27 && document.querySelector('.modal-open')) {
                closeModal(document.querySelector('.modal-open'));
            }
        };


        let last_known_scroll_position = 0;
        let ticking = false;

        function doSomething(scroll_pos) {
            if (scroll_pos > 150) {
                document.querySelector('.header').classList.add('header-scroll')
            } else {
                document.querySelector('.header').classList.remove('header-scroll')
            }
        }

        window.addEventListener('scroll', function(e) {
            last_known_scroll_position = window.scrollY;

            if (!ticking) {
                window.requestAnimationFrame(function() {
                    doSomething(last_known_scroll_position);
                    ticking = false;
                });

                ticking = true;
            }
        });

    }, 1500);

});