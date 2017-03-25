import { createSelector } from 'reselect';

const linesSelector = state => state.lines;

export const level = createSelector(
    linesSelector,
    lines => Math.floor(lines / 10)
);

export const tickInterval = createSelector(
    level,
    level => Math.max(100, 1000 - (level * 50))
);