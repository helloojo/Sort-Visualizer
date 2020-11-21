import React, {Component} from 'react';

class BarCanvas extends Component {
    Canvas = document.createElement('canvas');

    componentDidMount() {
        const ctx = this.refs.canvas.getContext("2d", {
            alpha: false
        });
        const Draw = () => {
            ctx.drawImage(this.Canvas, 0, 0);
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
        const ctx = this.Canvas.getContext("2d", {
            alpha: false
        });
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "white";
        ctx.beginPath();
        const heightList = this.props.heightList.arr;
        const w = width / (heightList.length + 2);
        let x = w;
        for (const state of heightList) {
            ctx.fillStyle = state.color;
            // ctx.fillStyle = ((sorting && prevheightList[idx] !== heightList[idx]) ? "red" : "white");
            const h = (height * state.height) / 100;
            let y = height - h;
            ctx.fillRect(x, y, w, h);
            ctx.rect(x, y, w, h);
            x += w;
        }
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    render() {
        const {width, height} = this.props;
        return (
            <canvas ref='canvas' width={width} height={height}/>
        )
    }
}

export default BarCanvas;