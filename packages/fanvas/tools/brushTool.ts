import { Canvas, FabricObject, PencilBrush, Shadow } from "fabric";
import ToolLoader from "../modules/toolLoader";
import { Tool, ToolConfigProps, ToolConstructor } from "../types/tools";

class BrushTool implements Tool {
  static name = 'brush'
  canvas: Canvas
  config: ToolConfigProps
  defaultConfig: {
    brushColor: string | undefined,
    brushWidth: number | undefined,
    shadow?: Shadow | null
    brush?: PencilBrush
  } = {
    brushColor: 'red',
    brushWidth: 1,
    shadow: null,
  }
  points: Array<{x: number, y: number}> = [] 
  constructor(canvas, config) {
    this.canvas = canvas
    this.defaultConfig = {
      ...this.defaultConfig,
      ...{
        brushColor: config.brushColor,
        brushWidth: config.brushWidth
      }
    }
    this.config = {
      ...config,
      ...this.defaultConfig
    }
  }
  active(): void {
    this.canvas.defaultCursor = 'crosshair'
    this.canvas.isDrawingMode = true
    const freeDrawingBrush = new PencilBrush(this.canvas);
    this.canvas.freeDrawingBrush = freeDrawingBrush
    this.canvas.on('path:created', (e) => {this.onPathCreated(e)})
    // this.setBrushColor(this.defaultConfig.brushColor)
    // this.setBrushWidth(this.defaultConfig.brushWidth)
    // freeDrawingBrush.shadow = new Shadow({
    //   color: 'grey',
    //   blur: 10,
    //   offsetX: 5,
    //   offsetY: 5
    // });
  }
  deactive(): void {
      this.canvas.defaultCursor = 'default'
      this.canvas.isDrawingMode = false
      this.canvas.freeDrawingBrush = undefined
      this.canvas.off()
  }
  setBrushColor(color) {
    if(this.canvas.freeDrawingBrush) {
      this.canvas.freeDrawingBrush.color = color
    }
  }
  setBrushWidth(width) {
    if(this.canvas.freeDrawingBrush) {
      this.canvas.freeDrawingBrush.width = width
    }
  }
  onPathCreated(e) {
    this.canvas.discardActiveObject();
    this.canvas.setActiveObject(e.path as FabricObject)
    this.canvas.requestRenderAll();
  }
  static install = (toolLoader: ToolLoader) => {
    const textTool = new BrushTool(toolLoader.canvas, toolLoader.config)
    return textTool
  }
}

const BrushToolInterface: ToolConstructor = BrushTool
export default BrushToolInterface