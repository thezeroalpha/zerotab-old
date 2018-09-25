function eventWindowLoaded() {
    canvasApp();
}

function canvasSupport(e) {
    return !!e.getContext;
}

function canvasApp() {
    var canvas = document.getElementById('myCanvas');
    if (!canvasSupport(myCanvas)) {
        return;
    }
    var ctx = canvas.getContext('2d');
    var w = canvas.width = window.innerWidth;
    var h = canvas.height = window.innerHeight;
    var yPositions = Array(300).join(0).split('');

    function runMatrix() {
        if (typeof Game_Interval != 'undefined') clearInterval(Game_interval);
        Game_Interval = setInterval(drawScreen, 45);
    }

    function drawScreen() {
        ctx.fillStyle = 'rgba(0,0,0,.07)';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#1A8D98';
        ctx.font = '12px Courier';
        yPositions.map(function (y, index) {

            //text = String.fromCharCode(Math.floor(Math.random()*(49-48+1)+48);
            //Use above to print 0 and 1 Matrix from charmap.

            var randtxt = "神神秘人宇宙";
            text = randtxt.charAt(Math.floor(Math.random() * randtxt.length));

            x = (index * 10);
            ctx.fillText(text, x, y);
            if (y > 1 + Math.random() * 30000) {
                yPositions[index] = 0;
            } else {
                yPositions[index] = y + 10;
            }
        })
    }
    runMatrix();
}
