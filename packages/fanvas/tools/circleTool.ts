/* eslint-disable @typescript-eslint/no-explicit-any */
import { Canvas, Circle, CircleProps } from "fabric";
import ToolLoader from "../modules/toolLoader";
import { EventPointer, Tool, ToolConfigProps, ToolConstructor } from "../types/tools";

class CircleTool implements Tool {
  static name = 'circle'
  canvas!: Canvas
  config!: ToolConfigProps
  isDrowing: boolean = false
  currentCircle: Circle | null = null
  mounseFrom = {
    x: 0,
    y: 0
  }

  constructor(canvas: Canvas, config: Partial<CircleProps>) {
    this.canvas = canvas
    this.config = config
  }

  active() {
    this.canvas.defaultCursor = 'crosshair'
    this.canvas.on('mouse:down', (e) => {this.onMouseDown(e)})
    this.canvas.on('mouse:move', (e) => {
      // Ensure the event has alreadySelected property for EventPointer type
      const eventWithAlreadySelected = { ...(e as object), alreadySelected: false } as EventPointer;
      return this.onMouseMove(eventWithAlreadySelected);
    })
    this.canvas.on('mouse:up', () => {this.onMouseUp()})
  }
  deactive() {
    this.isDrowing = false
    this.canvas.defaultCursor = 'default'
    this.canvas.off()
  }

  onMouseDown(e: EventPointer) {
    this.isDrowing = true
    const {x, y} = this.canvas.getViewportPoint((e as any))
    this.mounseFrom = {
      x, y
    }
    this.currentCircle = new Circle({
      ...this.config,
      radius: 0,
      left: x,
      top: y
    })
    this.canvas.add(this.currentCircle)
  }
  onMouseMove(e: EventPointer) {
    if (!this.isDrowing || !this.currentCircle) return
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
    const theNum = x > y ? x : y
    const theFrom = x > y ? this.mounseFrom.x : this.mounseFrom.y
    const absSum = Math.abs(theNum - theFrom)
    if(this.isDrowing && this.currentCircle) {
      this.currentCircle.set({
        left,
        top,
        radius: absSum / 2
      })
    }
    this.canvas.renderAll()
  }
  onMouseUp() {
    this.isDrowing = false
    this.currentCircle = null
  }

  static install(toolLoader: ToolLoader) {
    const selectTool = new CircleTool(toolLoader.canvas, toolLoader.config)
    return selectTool
  }
}

const CircleToolInterface: ToolConstructor = CircleTool
export default CircleToolInterface