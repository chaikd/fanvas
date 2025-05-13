import { Canvas, Textbox, TextboxProps } from "fabric";
import { EventPointer, Tool, ToolConfigProps } from "../types/tools";
import ToolLoader from "../modules/toolLoader";
class TextTool implements Tool {
  static name = 'text'
  name = 'text'
  canvas!: Canvas
  config!: ToolConfigProps
  isInput: boolean = false
  mounseFrom = {x: 0, y: 0}
  currentTextBox: null | Textbox = null
  defaultOption: Partial<TextboxProps> = {
    fontSize: 16,
    width: 200,
    selectable: true,
    evented: true
  }

  constructor(canvas: Canvas, config: Partial<TextboxProps>) {
    this.canvas = canvas
    this.config = {
      ...this.defaultOption,
      ...config,
    }
  }

  active() {
    this.canvas.defaultCursor = 'text'
    this.canvas.selection = true
  }
  deactive() {
    this.canvas.selection = false
    this.canvas.defaultCursor = 'default'
    this.currentTextBox = null
  }

  onPointDown(e: EventPointer) {
    if (this.isInput && this.currentTextBox) {
      this.canvas.remove(this.currentTextBox)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {x, y} = this.canvas.getViewportPoint((e as any))
    this.mounseFrom = {x, y}
    this.currentTextBox = new Textbox('在此输入',{
      ...this.config,
      left: x,
      top: y
    })
    this.canvas.add(this.currentTextBox)
    this.canvas.setActiveObject(this.currentTextBox);
    this.currentTextBox.selectAll()
    this.currentTextBox.enterEditing()
    // this.currentTextBox.setCoords()
    this.canvas.requestRenderAll();
    this.isInput = true
  }

  onTextChanged() {
    this.isInput = false
  }

  static install(toolLoader: ToolLoader) {
    const textTool = new TextTool(toolLoader.canvas, toolLoader.config)
    return textTool
  }
}

export default TextTool