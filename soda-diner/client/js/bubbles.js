$(() => {
////// animated bubbles background //////
    let bubble = '<div class="bubble"></div>'
    // create bubbles
    for (let i = 0; i < 45; i++) {
        let randomX = Math.floor(Math.random() * (window.innerWidth)) // adjusts for window width
        let randomY = Math.floor(Math.random() * (window.innerHeight + 2000)) // adjusts for window height
        // append bubbles to page with styling
        $('body').append(
            $(bubble).css({
                borderRadius: '50%',
                height: '20px',
                width: '20px',
                position: 'absolute',
                top: randomY,
                left: randomX,
                zIndex: '-1',
                backgroundImage: "url(img/bubble.png)",
                backgroundSize: '20px 20px',
            })
        ) // end append bubbles
    } // end create bubbles
    // bubble animation loop
    anime.timeline({
        targets: '.bubble',
        loop: true,
        duration: 12000
    }).add({
        // each bubble floats at different speed
        translateY: function (el, i, l) {
            return (l - i + 50) * -25;
        },
        easing: 'linear'
    }) // end bubble animation loop
}) // end document ready