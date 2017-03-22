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