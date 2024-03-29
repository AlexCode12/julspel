const levelKey = {
    "0,0,0": "empty",
    "255,0,255": "clip",
    "0,0,255": "platformC",
    "100,0,255": "platformL",
    "0,100,255": "platformR",
    "255,255,0": "grass",
    "0,155,100": "mountain",
    "255,255,255": "cloud",
    "155,55,0": "ground",
    "100,100,100": Rock,
    "255,255,100": Lava,
    "255,255,155": Lava2,
    "0,255,0": Player,
    "255,0,100": Item,
    "255,100,255": Enemy
};

const groundTypes = ["grass", "ground", "platformC", "platformR", "platformL"];

let sources = {
    player: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 1600,
        srcHeight: 1200,
        width: 65,
        height: 96,
        offsetX: 7.5,
        offsetY: 608
    },
    enemy: {
        src: 'img/sprites/skurk.png',
        srcWidth: 864,
        srcHeight: 192,
        width: 96,
        height: 96,
        offsetX: 0,
        offsetY: 0
    },
    item: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 32,
        srcHeight: 32,
        width: 32,
        height: 32,
        offsetX: 192,
        offsetY: 480
    },
    grass: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 32,
        srcHeight: 32,
        width: 32,
        height: 32,
        offsetX: 64,
        offsetY: 0
    },
    lava: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 64,
        srcHeight: 32,
        width: 32,
        height: 32,
        offsetX: 96,
        offsetY: 0
    },
    Lava2:{
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 64,
        srcHeight: 32,
        width: 32,
        height: 31,
        offsetX: 127,
        offsetY: 0
    },
    ground: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 32,
        srcHeight: 32,
        width: 32,
        height: 32,
        offsetX: 32,
        offsetY: 0
    },
    platformC: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 32,
        srcHeight: 32,
        width: 32,
        height: 32,
        offsetX: 33,
        offsetY: 480
    },
    platformL: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 32,
        srcHeight: 32,
        width: 32,
        height: 32,
        offsetX: 0,
        offsetY: 480
    },
    platformR: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 32,
        srcHeight: 32,
        width: 32,
        height: 32,
        offsetX: 128,
        offsetY: 480
    },
    rock: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 32,
        srcHeight: 32,
        width: 32,
        height: 32,
        offsetX: 320,
        offsetY: 480
    },
    mountains: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 352,
        srcHeight: 288,
        width: 352,
        height: 288,
        offsetX: 0,
        offsetY: 320,
        repeat: "repeat-x"
    },
    mountain: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 160,
        srcHeight: 320,
        width: 160,
        height: 320,
        offsetX: 0,
        offsetY: 160
    },
    cloud: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 96,
        srcHeight: 128,
        width: 224,
        height: 96,
        offsetX: 79.5,
        offsetY: 329
    },
    cloud2: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 128,
        srcHeight: 64,
        width: 128,
        height: 64,
        offsetX: 224,
        offsetY: 320
    },
    cloud3: {
        src: 'img/sprites/cavedude_side2.png',
        srcWidth: 384,
        srcHeight: 128,
        width: 384,
        height: 128,
        offsetX: 352,
        offsetY: 320
    },
    map1: {src: 'img/maps/tower.png'},
};

let maps = [sources.map1];
