import getDistance from './utils/distance';

export default class CanvasManager{
    
    // Canvas
    public canvas:      HTMLCanvasElement;
    private _context:   CanvasRenderingContext2D;

    // Timing
    private _time:  number;

    // Booklet Image
    private _booklet:   CanvasImageSource;

    // Mouse Tracking
    private _mouse:     IMouse;

    /**
     * 0 = highlighter
     * 1 = red pen
     */
    private _drawingType:   number;
    private _buttons:       Array<HTMLButtonElement>;
    private _highlightes:   Array<ICircle>;
    private _penMarks:      Array<ICircle>;
    
    constructor(){
        this.canvas = document.body.querySelector('.js-canvas');
        if(this.canvas === null){ console.log(`%c[Canvas Manager] %ccouldn't find the canvas element`, 'color:#f4f94f', 'color:#eee'); }else{ console.log(`%c[Canvas Manager] %cfound the canvas element`, 'color:#f4f94f', 'color:#eee'); }
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this._context = this.canvas.getContext('2d');
        console.log(`%c[Canvas Manager] %csetting the context to 2d`, 'color:#f4f94f', 'color:#eee');

        this._time = null;

        // Sets booklet image
        this._booklet           = new Image();
        this._booklet.src       = 'assets/booklet.png';
        this._booklet.width     = 860;
        this._booklet.height    = 660;

        // Mouse Tracking
        this._mouse = { x:0, y:0, prevX:0, prevY:0, active:false };

        // Drawing
        this._drawingType   = 0;
        this._buttons       = Array.from(document.body.querySelectorAll('.js-button'));
        this._highlightes   = [];
        this._penMarks      = [];

        this.init();
    }

    /**
     * Called when the `CanvasManager` is constructed.
     */
    private init():void{
        this.canvas.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mouseup', this.handleMouseUp);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);

        for(let i = 0; i < this._buttons.length; i++){
            this._buttons[i].addEventListener('click', this.switchDrawingType);
        }

        this._time = performance.now();
        requestAnimationFrame(this.loop);
    }

    private switchDrawingType:EventListener = (e:Event)=>{
        const target        = <HTMLButtonElement>e.currentTarget;
        const newType       = parseInt(target.getAttribute('data-type'));
        this._drawingType   = newType;
    }

    private handleMouseDown:EventListener = (e:MouseEvent)=>{
        this._mouse.active  = true;
        this._mouse.prevX   = this._mouse.x,
        this._mouse.prevY   = this._mouse.y;
        this._mouse.x       = e.x;
        this._mouse.y       = e.y;
    }

    private handleMouseUp:EventListener = (e:MouseEvent)=>{
        this._mouse.active  = false;
        this._mouse.prevX   = this._mouse.x,
        this._mouse.prevY   = this._mouse.y;
        this._mouse.x       = e.x;
        this._mouse.y       = e.y;
    }

    private handleMouseMove:EventListener = (e:MouseEvent)=>{
        this._mouse.prevX   = this._mouse.x,
        this._mouse.prevY   = this._mouse.y;
        this._mouse.x       = e.x;
        this._mouse.y       = e.y;
    }

    private draw():void{
        // Clear the canvas at the beginning of each frame
        this._context.clearRect(0,0,this.canvas.width, this.canvas.height);

        // Draw booklet
        let position = {
            x: ((this.canvas.width - 860) / 2),
            y: ((this.canvas.height - 660) / 2)
        };
        this._context.shadowOffsetX = 0;
        this._context.shadowOffsetY = 4;
        this._context.shadowColor   = 'rgba(41,41,41,0.15)';
        this._context.shadowBlur    = 8;
        this._context.drawImage(this._booklet, position.x, position.y, 860, 660);

        // Reset shadow
        this._context.shadowOffsetX = 0;
        this._context.shadowOffsetY = 0;
        this._context.shadowColor   = 'none';
        this._context.shadowBlur    = 0;

        // Draw highlights
        this._context.save();
        this._context.globalCompositeOperation  = 'multiply';
        for(let i = 0; i < this._highlightes.length; i++){
            this._context.beginPath();
            this._context.arc(this._highlightes[i].x, this._highlightes[i].y, this._highlightes[i].radius, 0, (2 * Math.PI));
            this._context.fillStyle = this._highlightes[i].color;
            this._context.fill();
            this._context.closePath();
        }
        this._context.restore();

        for(let i = 0; i < this._penMarks.length; i++){
            this._context.beginPath();
            this._context.arc(this._penMarks[i].x, this._penMarks[i].y, this._penMarks[i].radius, 0, (2 * Math.PI));
            this._context.fillStyle = this._penMarks[i].color;
            this._context.fill();
            this._context.closePath();
        }
        
    }

    private update(deltaTime:number):void{
        if(this._mouse.active){
            const mouseMoveDistance = getDistance(this._mouse.x, this._mouse.y, this._mouse.prevX, this._mouse.prevY);
            let newCircle:ICircle = null;
            if(this._drawingType === 0 && mouseMoveDistance >= 3){
                newCircle = {
                    x: (this._mouse.x + 6),
                    y: (this._mouse.y + 6),
                    radius: 12,
                    color:  'rgb(251,255,48,1)'
                }
                this._highlightes.push(newCircle);
            }
            else if(this._drawingType === 1){
                newCircle = {
                    x: (this._mouse.x + 1),
                    y: (this._mouse.y + 1),
                    radius: 2,
                    color:  'rgba(255,56,56,0.87)'
                }
                this._penMarks.push(newCircle);
            }
        }
    }

    /**
     * Called on the DOMs reapaint using `requestAnimationFrame`.
     */
    private loop:FrameRequestCallback = ()=>{
        const newTime:number    = performance.now();
        const deltaTime:number  = (newTime - this._time) / 1000;
        this._time               = newTime;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.loop);
    }
}