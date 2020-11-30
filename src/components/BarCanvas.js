import React, {Component} from 'react';

class BarCanvas extends Component {
    Canvas = document.createElement('canvas');
    ctx = null;

    componentDidMount() {
        if (this.ctx === null) {
            this.ctx = this.refs.canvas.getContext("2d", {
                alpha: false
            });
        }
        const Draw = () => {
            this.ctx.drawImage(this.Canvas, 0, 0);
            requestAnimationFrame(Draw);
        };
        Draw();
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            width,
            height
        } = this.props;
        this.Canvas.width = width;
        this.Canvas.height = height;
        if (this.ctx === null) {
            this.ctx = this.Canvas.getContext("2d", {
                alpha: false
            });
        }
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        const element = this.props.element.arr;
        const w = width / (element.length + 2);
        let x = w;
        for (const state of element) {
            this.ctx.fillStyle = state.color;
            const h = (height * state.height) / 100;
            let y = height - h;
            this.ctx.fillRect(x, y, w, h);
            this.ctx.rect(x, y, w, h);
            x += w;
        }
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
    }

    render() {
        const {width, height} = this.props;
        return (
            <canvas ref='canvas' width={width} height={height}/>
        )
    }
}

export default BarCanvas;