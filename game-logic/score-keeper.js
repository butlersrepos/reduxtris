import GameConfig from './game-config';

export default function award(lines) {
    return GameConfig.POINTS[lines.toString()];
}