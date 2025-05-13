import { Canvas } from "fabric";
import { Tool, ToolConfigProps } from "../types/tools";
import ToolLoader from "../modules/toolLoader";

export class SelectTool implements Tool {
  static name = 'select'
  name = 'select'
  canvas!: Canvas
  config!: ToolConfigProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(canvas: Canvas, config: any) {
    this.canvas = canvas
    this.config = config
  }
  active() {
    this.changeSelectable(true)
  }
  deactive() {
    this.changeSelectable(false)
  }
  changeSelectable(selectable: boolean) {
    this.canvas.set({
      selection: selectable
    })
    this.canvas.getObjects().forEach(obj => {
      obj.set({
        selectable,
        evented: selectable
      })
      obj.setCoords() // 重要：更新拾取坐标
    })
    this.canvas.requestRenderAll()
  }

  onPointDown() {}
  onPointMove() {}
  onPointUp() {}
  

  static install(toolLoader: ToolLoader) {
    const selectTool = new SelectTool(toolLoader.canvas, toolLoader.config)
    return selectTool
  }
}

export default SelectTool