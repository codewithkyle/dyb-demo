declare module 'animejs';

interface IMouse{
    x:      number;
    y:      number;
    prevX:  number;
    prevY:  number;
    active: boolean;
}

interface ICircle{
    x:  number;
    y:  number;
    radius: number;
    color:  string;
}