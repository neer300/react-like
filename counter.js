import { Component } from './component';
class CounterDisplay extends Component {
    constructor(getCounter, increment, decrement) {
        super('div');
        this._getCounter = getCounter;
        this._innerHTML = `<div>${this._getCounter()}</div>`;
        // this.addChild(new Component('div'), {}, {});
        this.addChild(new Component('button', {}, {
            click: increment
        }, '+'));
        this.addChild(new Component('button', {}, {
            click: decrement
        }, '-'));
    }

    _rerender() {
        const firstChild = this._dom.childNodes[0];
        firstChild.innerHTML = this._getCounter();
    }
}

export class Counter extends Component {
    constructor(name) {
        super();
        this._counter = 0;
        this._tag = 'div';
        this._innerHTML = `<h2>${name}</h2>`;
        this._childNodes = [new CounterDisplay(
                () => {
                    return this._counter
                },
                this._handleIncrement.bind(this),
                this._handleDecrement.bind(this))];
    }

    _handleIncrement() {
        this._counter = this._counter + 1;
        this.propagate();
    }

    _handleDecrement() {
        this._counter = this._counter - 1;
        this.propagate();
    }
}
