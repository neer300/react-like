class State {
    constructor() {
        this._internalState = {}
    }

    updateState(key, value) {
        if (this._internalState[key] !== value) {
            this._internalState[key] = value;
            this.emit('statechange', key);
        }
    }
}

export class Component {
    constructor(tag, attrs, eventListeners, innerHTML) {
        this._state = new State();
        this._tag = tag || 'div'
        this._attrs = attrs || {};
        this._eventListeners = eventListeners || {};
        this._innerHTML = innerHTML || '';
        this._childNodes = [];
    }

    addChild(c) {
        if (c instanceof Component) {
            this._childNodes.push(c);
        }
    }

    render(container) {
        this._dom = this._getDOM();
        if (this._dom) {
            container.appendChild(this._dom);
        }
    }

    propagate(evt) {
        const children = this._childNodes;
        if (children.length > 0) {
            children.forEach(child => {
                child.propagate(evt);
            });
        } else {
            this._dom.dispatchEvent(new Event('rerender', {
                bubbles: true,
                cancelable: false
            }));
        }
    }

    _rerender() {
        // To be overriden
    }

    _getDOM() {
        if (this._tag) {
            const el = document.createElement(this._tag);
            const attrsNames = Object.getOwnPropertyNames(this._attrs);
            attrsNames.forEach(name => {
                el.setAttribute(name, this._attrs[name]);
            });

            const eventListeners = Object.getOwnPropertyNames(this._eventListeners);
            eventListeners.forEach(eventName => {
                const val = this._eventListeners[eventName];
                if (typeof val === 'function') {
                    el.addEventListener(eventName, this._eventListeners[eventName]);
                } else if (val.length > 0) {
                    val.forEach(listener => {
                        el.addEventListener(eventName, listener);
                    })
                }
            });

            el.addEventListener('rerender', this._rerender.bind(this), false);

            if (this._innerHTML) {
                el.innerHTML = this._innerHTML;
            }

            this._childNodes.forEach(node => {
                node.render(el);
            });

            return el;
        }

        return null;
    }
}
