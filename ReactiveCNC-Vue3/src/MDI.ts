import "highlightjs/styles/github.css";
import hljs from "highlightjs";
import { ref } from "vue";

function insertSpaces(str: string): string {
  const segments = str.split(/(\([^)]*\))/g);
  for (let i = 0; i < segments.length; i++) {
    if (i % 2 === 0) {
      segments[i] = segments[i].replace(/([A-Z])(?![a-z])/g, " $1");
    }
  }
  return segments.join("");
}

export class MDILine {
  public gcode: string = "";
  public highlight: string = "";
  public uuid: string = crypto.randomUUID();

  constructor(gcode: string) {
    this.gcode = gcode;
    this.highlight = hljs.highlight("gcode", insertSpaces(gcode)).value;
  }
}

export class MDI {
  lines: Array<MDILine> = new Array<MDILine>();
}

export var mdi = new MDI();
export const mdiLinesRef = ref<Array<MDILine>>(mdi.lines);
