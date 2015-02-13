var Drop = function (x, canvas, ctx, fontSize) {
    /* A pool of characters that are used for the threads */
    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" +
                  "甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥";
    this.charset = charset.split("");

    this.canvas = canvas;
    this.ctx = ctx;
    this.fontSize = fontSize;

    this.x = x;

    /* Random starting Y position */
    this.y = Math.floor(Math.random() * (canvas.height / fontSize));

    this.last_char = this.getRandomChar();
    this.speed = this.getRandomSpeed();

    this.cycle = 0;
};

Drop.prototype.getRandomChar = function () {
    return this.charset[Math.floor(Math.random()*this.charset.length)];
};

Drop.prototype.getRandomSpeed = function () {
    if (Math.random() > 0.75)
        return 'slow';

    return 'normal';
};

Drop.prototype.update = function () {
    var x_px, y_px;

    this.cycle = ++this.cycle % 2;

    /* Slow threads should skip cycles */
    if (this.speed === 'slow' && this.cycle != 0)
        return;

    /* The latest character is always drawn white, we need to make it orange. */
    x_px = this.x * this.fontSize;
    y_px = (this.y - 1) * this.fontSize;

    /* Cover it with black first */
    this.ctx.fillStyle = "#000";
    this.ctx.fillText(this.last_char, x_px, y_px);

    /* Redraw it orange */
    this.ctx.fillStyle = "#eb722b";
    this.ctx.fillText(this.last_char, x_px, y_px);


    /* Draw a new white character */
    this.last_char = this.getRandomChar();

    /* x_px stays the same */
    y_px = this.y * this.fontSize;

    this.ctx.fillStyle = "#eee";
    this.ctx.fillText(this.last_char, x_px, y_px);

    /* When the drop is off the screen return it back to the top at an random moment. */
    if (y_px > this.canvas.height && Math.random() > 0.925) {
        this.y = 0;
        this.speed = this.getRandomSpeed();
    }

    this.y++;
};
