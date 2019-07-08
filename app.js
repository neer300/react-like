import {Hello} from './hello';
import {Component} from './component';
import {Counter} from './counter';

class App extends Component {
    constructor() {
        super();
        this._childNodes = [new Hello('Neeraj'), new Counter('My Counter')];
    }
}
new App().render(document.getElementById('container'));
