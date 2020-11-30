import React, {Component} from 'react';

class BarCanvas extends Component {
    Canvas = document.createElement('canvas');
    ctx = null;
    backCtx = null;

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
        if (this.backCtx === null) {
            this.backCtx = this.Canvas.getContext("2d", {
                alpha: false
            });
        }
        this.backCtx.fillStyle = "black";
        this.backCtx.fillRect(0, 0, width, height);
        const element = this.props.element.arr;
        const w = width / (element.length + 2);
        this.backCtx.beginPath();
        let x = w;
        for (const state of element) {
            this.backCtx.fillStyle = state.color;
            const h = (height * state.height) / 100;
            let y = height - h;
            this.backCtx.fillRect(x, y, w, h);
            this.backCtx.rect(x, y, w, h);
            x += w;
        }
        this.backCtx.strokeStyle = "black";
        this.backCtx.stroke();
    }

    render() {
        const {width, height} = this.props;
        return (
            <canvas ref='canvas' width={width} height={height}/>
        )
    }
}

export default BarCanvas;