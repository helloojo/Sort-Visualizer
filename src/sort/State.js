class State {
    constructor(height, color) {
        this.height = height;
        this.color = color;
    }

    setHeight = (height) => {
        this.height = height;
    }

    setColor = (color) => {
        this.color = color;
    }
}

export default State