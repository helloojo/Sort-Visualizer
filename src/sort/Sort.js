class Sort {
    constructor(elements, delay, handler, stopHandler) {
        this.elements = elements;
        this.delay = delay;
        this.handler = handler;
        this.delayList = [];
        this.stopHandler = stopHandler;
    }

    start = () => {
        this.clearEvent();
        this.delayList.push(setTimeout(() => this.sort(), 0));
    }

    stop = () => {
        this.clearEvent();
        this.handler(this.elements);
    }

    clearEvent = () => {
        for (const event of this.delayList) {
            clearTimeout(event);
        }
        this.delayList = [];
    }

    sort = () => {
    }

    registerCallback = (callback) => {
        this.delayList.push(setTimeout(callback, this.delay));
    }
}

export default Sort;