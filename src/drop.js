var Drop = function (x, canvas, ctx, fontSize) {
    /* A pool of characters that are used for the threads */
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" +
                  "畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
    this.charset = charset.split("");

    this.canvas = canvas;
    this.ctx = ctx;
    this.fontSize = fontSize;

    this.x = x;
    this.y = Math.floor(Math.random()*(canvas.height/fontSize));

    this.last_char = this.getRandomChar();
    this.speed = Math.floor(Math.random()*3) + 1; /* cycles per move */

    this.cycle = 0;
};

Drop.prototype.getRandomChar = function () {
    return this.charset[Math.floor(Math.random()*this.charset.length)];
};

Drop.prototype.getRandomSpeed = function () {
    if (Math.random() > 0.80)
        return 'slow';

    return 'normal';
};

Drop.prototype.update = function () {
    this.cycle = ++this.cycle % 2;
    if (this.speed === 'slow' && this.cycle == 1)
        return;

    /* Make the previous character orange*/
    this.ctx.fillStyle = "#000";
    this.ctx.fillText(this.last_char, this.x*this.fontSize, (this.y - 1)*this.fontSize);

    this.ctx.fillStyle = "#eb722b";
    this.ctx.fillText(this.last_char, this.x*this.fontSize, (this.y - 1)*this.fontSize);

    this.last_char = this.getRandomChar();

    this.ctx.fillStyle = "#eee";
    this.ctx.fillText(this.last_char, this.x*this.fontSize, this.y*this.fontSize);

    if(this.y*this.fontSize > this.canvas.height && Math.random() > 0.975) {
        this.y = 0;
        this.speed = this.getRandomSpeed();
    }

    this.y++;
};
