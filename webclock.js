
$.fn.clockify = function (options) {
    var s = $(this);
    // set up default options 
    var defaults = {
        hours: true,
        hands: true,
        'hand-hour': true,
        'hands-origin': 5,
        transition: 0.5,
        'hand-minute': true,
        'hand-second': true,
        animate: true,
        'time-function': function () { return new Date(); }
    };
    var options = $.extend({}, defaults, options);

    var max = Math.min(s.height(), s.width());

    //show the hour bars
    if (options['hours']) {
        var style = $('<style>.hour-bar { background-color: black;position:absolute; }</style>');
        $('html > head').append(style);

        //create the hour bars
        for (var i = 0; i < 12; i++) {
            s.append('<div class="hour-bar"></div>');
        }
        //style the hour bars
        var angle = -Math.PI / 2;
        var count = 0;
        s.children('.hour-bar').each(function () {
            $(this).css({
                height: max * 0.08,
                width: max * 0.015,
                top: s.height() / 2 - max * 0.08 / 2,
                left: s.width() / 2 - max * 0.015 / 2,
                transform: 'translate(' + parseInt(Math.cos(angle) * max * 0.46) + 'px,' + parseInt(Math.sin(angle) * max * 0.46) + 'px) rotate(' + (Math.PI / 2 + angle) + 'rad)'
            });
            count++;
            angle += Math.PI / 6;
        });
    }
    //show the clock hands
    if (options['hands']) {
        var style = $('<style>.hand { background-color: black;position:absolute;transform-origin: 50% ' + (100 - options['hands-origin']) + '%}</style>');
        $('html > head').append(style);
        if (options['hand-hour']) {
            s.append('<div class="hand hand-hour"></div>');
            s.children('.hand-hour').css({
                height: max * 0.20,
                width: max * 0.015,
                top: s.height() / 2 - max * 0.20 + options['hands-origin'] * (max * 0.20) / 100,
                left: s.width() / 2 - max * 0.015 / 2
            });
        }
        if (options['hand-minute']) {
            s.append('<div class="hand hand-minute"></div>');
            s.children('.hand-minute').css({
                height: max * 0.33,
                width: max * 0.015,
                top: s.height() / 2 - max * 0.33 + options['hands-origin'] * (max * 0.33) / 100,
                left: s.width() / 2 - max * 0.015 / 2
            });
        }
        if (options['hand-second']) {
            s.append('<div class="hand hand-second"></div>');
            s.children('.hand-second').css({
                height: max * 0.40,
                width: max * 0.005,
                top: s.height() / 2 - max * 0.40 + options['hands-origin'] * (max * 0.40) / 100,
                left: s.width() / 2 - max * 0.015 / 2,
                'margin-left': (max * 0.005)
            });
        }
        if (options['animate']) {
            var date = options['time-function']();
            var t = date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 3600;
            var h = (t * (360 / 12 / 3600) + 180);
            var m = (t * (360 / 3600) + 180);
            var sec = (t * (360 / 60) + 180);
            s.children('.hand-second').css('transform', 'rotate(' + sec.toString() + 'deg)');
            s.children('.hand-minute').css('transform', 'rotate(' + m.toString() + 'deg)');
            s.children('.hand-hour').css('transform', 'rotate(' + h.toString() + 'deg)');
            var first = true;
            setInterval(function () {
                if (first)
                    $('.hand').css('transition', 'all ' + options['transition'] + 's');
                var date = options['time-function']();
                var t = date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 3600;
                var h = (t * (360 / 12 / 3600) + 180);
                var m = (t * (360 / 3600) + 180);
                var sec = (t * (360 / 60) + 180);
                s.children('.hand-second').css('transform', 'rotate(' + sec.toString() + 'deg)');
                s.children('.hand-minute').css('transform', 'rotate(' + m.toString() + 'deg)');
                s.children('.hand-hour').css('transform', 'rotate(' + h.toString() + 'deg)');
            }, 1000);
        }
    }


    return this;
}