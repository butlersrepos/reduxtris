import GameGrid from '../game-logic/game-grid';
import GameConfig from '../game-logic/game-config';

export function $(selector) {
    return document.querySelector(selector);
}

export function $$(selector) {
    return document.querySelectorAll(selector);
}

export function create(markup) {
    return document.createElement(markup);
}

export function triggerClick(selector) {
    document.querySelector(selector).dispatchEvent(new Event('click'));
}

export function emptyGrid() {
    return GameGrid.generateBaseGrid();
}

export function emptyRow() {
    return new Array(10).fill(GameConfig.DEFAULT_GRID_SPACE);
}