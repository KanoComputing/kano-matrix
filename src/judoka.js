var Judoka = function (canvas, context, fontSize) {
    this.ascii = [
        "             ?KKKKKKKKKKKKKK~           ",
        "          KKKKKK$.        $KKKKD=       ",
        "       ,KKKKI                KKKK:      ",
        "     ~KKKK                     7KKK     ",
        "    KKKK                        .KKK    ",
        "   KKKKKK,                        KK8   ",
        " .KKK  OKKK                       .KK.  ",
        ".KKK    KKKKK.                     8KK. ",
        "KKK    KKK KKKK=                    KK. ",
        "KK.   .KK.   KKKKK                  KKK.",
        "KK.   KKK       KKKKKKK             IKK.",
        "KK. DKKK           KKKKKKKKKK        KK.",
        "KK?KKK                   KKKKKKKK    KK.",
        "DKKK8      KK=           .KK..KKKKK .KK~",
        ".KKKZ     KKKK           ?KKK.   KKK:KK ",
        " .KKK                             ?KKKK.",
        "  .KK?                            8KKKK.",
        "   IKK        KKKKKKKKKKK.        KKKK. ",
        "    KKK.      DKK     KKK        KKK K  ",
        "     KKK.      KKKKIKKKK       :KKK     ",
        "      DKKK      IKKKKK$      .KKK$      ",
        "        KKKK                KKKK        ",
        "         .KKKKKK        KKKKKK          ",
        "            .DKKKKKKKKKKKKD             "
    ];

    /* The mask contains a flag for each line that determines whether
       it should be displayed or not. These flags are randomly changed
       as the face is drawn so it appears to be flickering. */
    this.mask = [];

    this.canvas = canvas;
    this.fontSize = fontSize;

    this.ctx = context;

    this.width = this.ctx.measureText(this.ascii[0]).width;
    this.height = this.ascii.length * fontSize;

    /* Center the face on the screen */
    this.x = (canvas.width - this.width) / 2;
    this.y = (canvas.height - this.height) / 2;

    /*
     * Preproces the text to see where should the background be drawn.
     * We don't want to draw background of any spaces at the beginning
     * or end of the line.
     */
    this.backgroundDimensions = [];
    for (var l = 0; l < this.ascii.length; l++) {
        var startSpace = this.ascii[l].match(/^\s*/)[0],
            offset = this.ctx.measureText(startSpace).width,
            cleanStr = this.ascii[l].replace(/^\s*/g,'').replace(/\s*$/g,''),
            cleanWidth = this.ctx.measureText(cleanStr).width;

        this.backgroundDimensions.push({
            offset: offset, /* where the background starts relative to the
                               start of the image [pixels] */
            width: cleanWidth /* how big is the background [pixels] */
        });
    }
};

Judoka.prototype.uncoverRandomLine = function () {
    this.mask[Math.floor(Math.random()*this.ascii.length)] = true;
};

Judoka.prototype.draw = function () {
    for (var l = 0; l < this.ascii.length; l++) {
        if (this.mask[l] !== true)
            continue; /* This line hasn't been uncovered yet, skip it. */

        /* Draw the background behind the line */
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        this.ctx.rect(this.x + this.backgroundDimensions[l].offset,
                      this.y + (l - 1)*this.fontSize,
                      this.backgroundDimensions[l].width,
                      this.fontSize);
        this.ctx.fill();

        /* Draw the line of text */
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
        this.ctx.fillText(this.ascii[l], this.x, this.y + l*this.fontSize);
    }
};
