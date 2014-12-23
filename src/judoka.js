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

    this.mask = [];

    this.canvas = canvas;
    this.fontSize = fontSize;

    this.ctx = context;

    this.width = this.ctx.measureText(this.ascii[0]).width;
    this.height = this.ascii.length * fontSize;

    this.x = (canvas.width - this.width) / 2;
    this.y = (canvas.height - this.height) / 2;

    this.prep_ascii = [];
    for (var l = 0; l < this.ascii.length; l++) {
        var startSpace = this.ascii[l].match(/^\s*/)[0];
        var offset = this.ctx.measureText(startSpace).width;
        var cleanStr = this.ascii[l].replace(/^\s*/g,'').replace(/\s*$/g,'');
        var cleanWidth = this.ctx.measureText(cleanStr).width;

        this.prep_ascii.push({
            offset: offset,
            s: cleanStr,
            w: cleanWidth
        });
    }
};

Judoka.prototype.uncoverRandomLine = function () {
    this.mask[Math.floor(Math.random()*this.ascii.length)] = true;
};

Judoka.prototype.draw = function () {
    for (var l = 0; l < this.ascii.length; l++) {
        if (this.mask[l] !== true)
            continue;

        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        this.ctx.rect(this.x + this.prep_ascii[l].offset,
                      this.y + (l - 1)*this.fontSize,
                      this.prep_ascii[l].w,
                      this.fontSize);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
        this.ctx.fillText(this.ascii[l], this.x, this.y + l*this.fontSize);
    }
};
