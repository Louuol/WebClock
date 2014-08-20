
$.fn.clockify = function (options) {
    var s = $(this);
    s.html('');
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
        'time-function': function () { return new Date(); },
        'border': true,
        'border-size': 0.01,
        'border-style': 'solid',
        'border-color': 'black',
        'hand-hour-color': 'black',
        'hand-minute-color': 'black',
        'hand-second-color': 'black',
        'hours-color': 'black',
        'transition-style': 'ease-in-out'
    };
    var options = $.extend({}, defaults, options);

    var max = Math.min(s.height(), s.width());
    s.css({
        
    });
    if (options['border']) {
        s.css({ 'border': max * options['border-size'] + 'px ' + options['border-style'] + ' ' + options['border-color'], 'border-radius': '50%',});
    }

    //show the hour bars
    if (options['hours']) {
        var style = $('<style>.hour-bar { background-color:' + options['hours-color']+ ';position:absolute; transform-origin: center center;}</style>');
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
                left: s.width() / 2 - max * 0.015/ 2,
                transform: 'translate(' + Math.round(Math.cos(angle) * max * 0.46) + 'px,' + Math.round(Math.sin(angle) * max * 0.46) + 'px) rotate(' + (Math.PI / 2 + angle) + 'rad)'
            });
            count++;
            angle += Math.PI / 6;
        });
    }
    //show the clock hands
    if (options['hands']) {
        var style = $('<style>.hand { position:absolute;transform-origin: 50% ' + (100 - options['hands-origin']) + '%}</style>');
        $('html > head').append(style);
         if (options['hand-second']) {
            s.append('<div class="hand hand-second"></div>');
            s.children('.hand-second').css({
                height: max * 0.40,
                width: max * 0.005,
                top: s.height() / 2 - max * 0.40 + options['hands-origin'] * (max * 0.40) / 100,
                left: s.width() / 2 - max * 0.015 / 2,
                'margin-left': (max * 0.005),
                'background-color': options['hand-second-color']
            });
        }if (options['hand-minute']) {
            s.append('<div class="hand hand-minute"></div>');
            s.children('.hand-minute').css({
                height: max * 0.33,
                width: max * 0.015,
                top: s.height() / 2 - max * 0.33 + options['hands-origin'] * (max * 0.33) / 100,
                left: s.width() / 2 - max * 0.015 / 2,
                'background-color': options['hand-minute-color']
            });
        }
        if (options['hand-hour']) {
            s.append('<div class="hand hand-hour"></div>');
            s.children('.hand-hour').css({
                height: max * 0.20,
                width: max * 0.015,
                top: s.height() / 2 - max * 0.20 + options['hands-origin'] * (max * 0.20) / 100,
                left: s.width() / 2 - max * 0.015 / 2,
                'background-color': options['hand-hour-color']
            });
        }
        var date = options['time-function']();
        var t = date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 3600;
        var h = (t * (360 / 12 / 3600));
        var m = (t * (360 / 3600));
        var sec = (t * (360 / 60));
        s.children('.hand-second').css('transform', 'rotate(' + sec.toString() + 'deg)');
        s.children('.hand-minute').css('transform', 'rotate(' + m.toString() + 'deg)');
        s.children('.hand-hour').css('transform', 'rotate(' + h.toString() + 'deg)');
        if (options['animate']) {
            var first = true;
            setInterval(function () {
                if (first) {
                    $('.hand').css('transition', 'all ' + options['transition'] + 's ' + options['transition-style']);
                    first = false;
                }
                var date = options['time-function']();
                var t = date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 3600;
                var h = (t * (360 / 12 / 3600));
                var m = (t * (360 / 3600));
                var sec = (t * (360 / 60));
                s.children('.hand-second').css('transform', 'rotate(' + sec.toString() + 'deg)');
                s.children('.hand-minute').css('transform', 'rotate(' + m.toString() + 'deg)');
                s.children('.hand-hour').css('transform', 'rotate(' + h.toString() + 'deg)');
            }, 1000);
        }
    }


    return this;
}