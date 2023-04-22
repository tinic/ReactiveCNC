import 'highlightjs/styles/github.css';
import hljs from 'highlightjs';

export class GCodeLine {
    public code:string = '';
    public highlight:string = '';
    public line:string = '';
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

    private pad(num:number, size:number):string {
        let s = "000000000" + num;
        return s.substr(s.length-size);
    }

    public async loadFromURL(url:string) {
        await this.getURL(url).then((gcode:any) => {
            const lines = gcode.split(/\r\n|\r|\n/);
            const hasLineNumbers = lines.some((line: string): boolean => line.startsWith('N'));
            let zeros: number = 0;
            if (hasLineNumbers) {
              const maxLineNumber: number = lines.reduce((max: number, line: string): number => {
                const lineNumber: number = parseInt(line.match(/\d+/)?.[0] ?? '0');
                return Math.max(max, lineNumber);
              }, 0);
              zeros = Math.floor(Math.log10(maxLineNumber)) + 1;
            } else {
              zeros = Math.floor(Math.log10(lines.length)) + 1;
            }
            lines.forEach((line: string): void => {
                const lineNumber: number = line.startsWith('N') ? parseInt(line.match(/\d+/)?.[0] ?? '0') : 0;
                const code: string = line.startsWith('N') ? line.replace(/N\d+/, '') : line;
                const highlight: string = hljs.highlight("gcode", code).value;
                const gcodeLine: GCodeLine = new GCodeLine()
                gcodeLine.line = lineNumber > 0 ? this.pad(lineNumber, zeros) : "";
                gcodeLine.code = line;
                gcodeLine.highlight = highlight;
                this.lines.push(gcodeLine);
            });
        });
    }
}

let gcode:GCode = new GCode();
export default gcode;
