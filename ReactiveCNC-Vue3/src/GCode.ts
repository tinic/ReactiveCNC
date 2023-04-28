import 'highlightjs/styles/github.css';
import hljs from 'highlightjs';

function insertSpaces(str:string):string {
    const segments = str.split(/(\([^)]*\))/g);
    for (let i = 0; i < segments.length; i++) {
        if (i % 2 === 0) {
            segments[i] = segments[i].replace(/([A-Z])(?![a-z])/g, " $1");
        }
    }
    return segments.join("");
}

function removeLineNumber(line:string):string {
    return line.startsWith('N') ? line.replace(/N\d+/, '') : line;
}

function highlight(line:string):string {
    const code: string = line.startsWith('N') ? line.replace(/N\d+/, '') : line;
    const highlight: string = hljs.highlight("gcode", insertSpaces(code)).value;
    return highlight;
}

export class GCodeLine {

    public originalcode:string = '';
    public editedcode:string = '';
    public highlight:string = '';
    public line:string = '';
    public active:boolean = true;
    public shadowactive:boolean = false;
    public uuid:string = crypto.randomUUID();
    public edited:boolean = false;

    public setEditCode(gcode:string) {
        if (gcode == null || gcode.length == 0) {
            this.editedcode = removeLineNumber(this.originalcode);
            this.edited = false;
        } else {
            this.editedcode = gcode;
            this.edited = true;
        }
        this.highlight = highlight(this.editedcode);
    }

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

    private padWithZeros(num:number, size:number):string {
        let s = "000000000" + num;
        return s.substr(s.length-size);
    }

    public parseGCode(gcode:string) {
        const lines = gcode.split(/\r\n|\r|\n/).filter((str: string) => Boolean(str));
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
            const gcodeLine: GCodeLine = new GCodeLine()
            gcodeLine.line = lineNumber > 0 ? this.padWithZeros(lineNumber, zeros) : "";
            gcodeLine.originalcode = line;
            gcodeLine.editedcode = removeLineNumber(line);
            gcodeLine.highlight = highlight(line);
            this.lines.push(gcodeLine);
        });
    }

    public async loadFromURL(url:string) {
        await this.getURL(url).then((gcode:any) => {
            this.parseGCode(gcode);
        });
    }
}

let gcode:GCode = new GCode();
export default gcode;
