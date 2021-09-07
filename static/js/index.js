window.onload = function () {
    var div1 = document.getElementById("remote");
    var eleH = div1.offsetHeight;
    var eleW = div1.offsetWidth;
    console.log('H: ' + eleH + ' W:' + eleW)
    var disX = disY = 0;

    div1.onmousedown = function (e) {
        var evnt = e || event;
        disX = evnt.clientX - div1.offsetLeft;
        disY = evnt.clientY - div1.offsetTop;

        div1.onmousemove = function (e) {
            var evnt = e || event;
            var x = evnt.clientX - div1.offsetLeft;
            var y = evnt.clientY - div1.offsetTop;

            div1.onmouseup = function () {
                if (x || y) {
                    var data = data = {
                        data: JSON.stringify({
                            'disX': (disX / eleW).toFixed(2),
                            'disY': (disY / eleH).toFixed(2),
                            'toX': (x / eleW).toFixed(2),
                            'toY': (y / eleH).toFixed(2)
                        }),
                    }
                    console.log('click: ' + disX + ' , ' + disY + ' to: ' + x + ' , ' + y)
                    $.ajax({
                        url: 'http://localhost:5000/drag',
                        type: 'POST',
                        data: data,
                        dataType: 'json',
                    })
                }
                div1.onmousemove = null;
                div1.onmouup = null;
            };
        };

        div1.onmouseup = function () {
            if (disX || disY) {
                var data = data = {
                    data: JSON.stringify({
                        'disX': (disX / eleW).toFixed(2),
                        'disY': (disY / eleH).toFixed(2)
                    }),
                }
                console.log('click: ' + disX + ' , ' + disY)
                $.ajax({
                    url: 'http://localhost:5000/click',
                    type: 'POST',
                    data: data,
                    dataType: 'json',
                })
            }
            div1.onmousemove = null;
            div1.onmouup = null;
        };

        return false;
    };
};