class Sort {
    constructor(elements, delay, handler) {
        this.elements = elements;
        this.delay = delay;
        this.handler = handler;
        this.event = -1;
    }

    setDelay = (delay) => {
        this.delay = delay;
    }

    start = () => {
        this.event = setTimeout(() => this.sort(), 0);
    }

    stop = () => {
        if (this.event !== -1) {
            clearInterval(this.event);
        }
    }

    sort = () => {
    }
}

export default Sort;