import 'highlightjs/styles/github.css';
import hljs from 'highlightjs';

export class GCodeLine {
    public code:string = "";
    public highlight:string = "";
    public line:number = 0;
    public active:boolean = true;
}

export class GCode {
    lines:Array<GCodeLine> = new Array<GCodeLine>();

    private getURL(url:string): Promise<any[]> {
    return fetch(url)
        .then((res) => res.text())
        .then((res) => {
        return res as any;
    });
    }

    public async loadFromURL(url:string) {
        await this.getURL(url).then((gcode:any) => {
            let a = (gcode as string).split(/\r\n|\r|\n/);
            for (let c = 0; c < a.length; c++) {
                let line = new GCodeLine();
                line.code = a[c];
                line.line = c;
                line.highlight = hljs.highlight("gcode", a[c]).value;
                line.active = true;
                this.lines.push(line);
            }
            console.log(this.lines);
        });
    }
}

let gcode:GCode = new GCode();
export default gcode;
