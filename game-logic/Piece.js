let BlockColors = require('./block-colors');
let PieceLayouts = require('./piece-layout');

module.exports = {
    create,
    Types: ['J', 'L', 'I', 'O', 'S', 'T', 'Z']
};

function create(options) {
    let config = Object.assign({}, {
        row: options.type === 'I' ? 1 : 0,
        col: 5,
        rotation: 0,
        type: 'J'
    }, options);

    config.rotation %= 360;
    let shape = generateShape(config.row, config.col, config.rotation, config.type);

    return {
        origin() { return { row: config.row, col: config.col }; },
        type() { return config.type; },
        body() { return shape.parts(); },
        fall() {
            return create({
                ...config,
                row: config.row + 1
            });
        },
        rotate() {
            return create({
                ...config,
                rotation: config.rotation + (config.type == 'O' ? 0 : 90)
            });
        },
        left() {
            return create({
                ...config,
                col: config.col - 1
            });
        },
        right() {
            return create({
                ...config,
                col: config.col + 1
            })
        }
    };
}

function generateShape(row, col, rotation, type) {
    let shape = PieceLayouts[type](row, col);
    while (rotation > 0) {
        shape.rotate();
        rotation -= 90;
    }
    return shape;
}

