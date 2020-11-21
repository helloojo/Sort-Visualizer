import ElementMakeType from "./ElementMakeType";
import State from "./State";
import Color from "./Color";

class Element {
    constructor() {
        this.arr = null;
    }

    initElements = (length, type) => {
        this.arr = [];
        let offset;
        switch (type) {
            case ElementMakeType.RANDOM:
                for (let i = 0; i < length; i++) {
                    const height = Math.random() * 100;
                    this.arr.push(new State(height, Color.WHITE));
                }
                break;
            case ElementMakeType.ASCENDING:
                offset = 100 / (length + 1);
                this.arr.push(new State(offset, Color.WHITE));
                for (let i = 0; i < length - 1; i++) {
                    this.arr.push(new State(this.arr[i] + offset, Color.WHITE));
                }
                break;
            case ElementMakeType.DESCENDING:
                offset = 100 / (length + 1);
                this.arr.push(new State(100 - offset, Color.WHITE));
                for (let i = 0; i < length - 1; i++) {
                    this.arr.push(new State(this.arr[i] - offset, Color.WHITE));
                }
                break;
            default:
                break;
        }
    }
}

export default Element;