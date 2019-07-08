import {Component} from './component';

export class Hello extends Component {
    constructor(name) {
        super('div', {}, {}, `Hello ${name}!`);
    }
}
