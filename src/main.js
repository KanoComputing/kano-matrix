function darkenCanvas(canvas, context, ratio) {
    context.fillStyle = "rgba(0, 0, 0, " + ratio + ")";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function matrix() {
    var canvas = document.getElementById("canvas"),
        ctx,
        fontSize = 12,
        elapsed = 0, /* seconds */
        dt = 53, /* miliseconds */
        numberOfDrops,
        drops = [],
        judoka;

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx = canvas.getContext("2d");
    ctx.font = fontSize + "px courier new";

    /* Initialise the drops */
    numberOfDrops = canvas.width / fontSize;
    for(var x = 0; x < numberOfDrops; x++)
        drops.push(new Drop(x, canvas, ctx, fontSize));

    /* Initialise the judoka */
    judoka = new Judoka(canvas, ctx, fontSize);

    setInterval(function () {
        /* Draw black translucent overlay over the whole image to create the trail. */
        darkenCanvas(canvas, ctx, 0.03);

        /* Update each drop */
        for (var i = 0; i < drops.length; i++)
            drops[i].update();

        elapsed += dt / 1000;
        /* Show the Judoka face 5 seconds in the animation */
        if (elapsed > 5) {
            judoka.uncoverRandomLine();
            judoka.draw();
        }
    }, dt);
};
