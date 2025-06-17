import { Canvas, FabricObject, Rect } from "fabric";
import { EventPointer, RectToolConfig, Tool, ToolConfigProps } from "../types/tools";
import ToolLoader from "../modules/toolLoader";
import drawLabel from "./utils/drawLabel";
class RectTool implements Tool {
  static name = 'rect'
  name = 'rect'
  canvas!: Canvas
  config!: ToolConfigProps
  isDrowing = false
  currentRect: Rect | null = null
  mounseFrom = {x: 0, y: 0}
  // install!: (toolLoader: ToolLoader) => void

  constructor(canvas: Canvas, config: RectToolConfig) {
    this.canvas = canvas
    this.config = config
  }

  active() {
    this.canvas.defaultCursor = 'crosshair'
  }
  deactive() {
    this.isDrowing = false
    this.canvas.defaultCursor = 'default'
  }

  onPointDown(e: EventPointer) {
    this.isDrowing = true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {x, y} = this.canvas.getViewportPoint((e as any))
    this.mounseFrom = {x, y}
    this.currentRect = new LabelRect({
      ...this.config,
      left: x,
      top: y,
      width: 0,
      height: 0,
    })
    this.canvas.add(this.currentRect)
  }

  onPointMove(e: EventPointer) {
    if (!this.isDrowing || !this.currentRect) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let {x, y} = this.canvas.getViewportPoint((e as any))
    let left, top
    if (this.mounseFrom.x > x) {
      x = Math.max(x, 0)
      left = x
    }
    if (this.mounseFrom.y > y) {
      y = Math.max(y, 0)
      top = y
    }
    if (this.mounseFrom.x < x) {
      x = Math.min(x, this.canvas.width - 2)
      left = this.mounseFrom.x
    }
    if (this.mounseFrom.y < y) {
      y = Math.min(y, this.canvas.height - 2)
      top = this.mounseFrom.y
    }
    const width = Math.abs(x - this.mounseFrom.x)
    const height = Math.abs(y - this.mounseFrom.y)
    this.currentRect.set({
      left,
      top,
      width,
      height
    })
    this.canvas.renderAll()
  }

  onPointUp() {
    this.isDrowing = false
    this.canvas.discardActiveObject();
    this.canvas.setActiveObject(this.currentRect as FabricObject)
    if(this.currentRect && this.currentRect?.width <= 1 && this.currentRect?.height <= 1) {
      this.canvas.remove(this.currentRect)
    }
    this.canvas.requestRenderAll();
    this.currentRect = null
  }

  static install(toolLoader: ToolLoader) {
    const rectTool = new RectTool(toolLoader.canvas, toolLoader.config)
    return rectTool
  }
}

export default RectTool


class LabelRect extends Rect {
  label: string
  constructor(options) {
    super(options)
    this.label = options.label || ''
  }

  // 在矩形上方绘制 label
  _render(ctx: CanvasRenderingContext2D) {
    super._render(ctx)
    if (this.label) {
      drawLabel({
        ctx,
        label: this.label,
        x: this.width / 2 - ((this.label.length / 2) * 14),
        y: -this.height / 2
      })
    }
  }

  setLabel(label: string) {
    this.label = label
  }
}