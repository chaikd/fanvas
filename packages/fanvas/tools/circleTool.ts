/* eslint-disable @typescript-eslint/no-explicit-any */
import { Canvas, Circle, CircleProps } from "fabric";
import ToolLoader from "../modules/toolLoader";
import { EventPointer, Tool, ToolConfigProps } from "../types/tools";

export default class CircleTool implements Tool {
  static name = 'circle'
  name = 'circle'
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
  }
  deactive() {
    this.isDrowing = false
    this.canvas.defaultCursor = 'default'
  }

  onPointDown(e: EventPointer) {
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
  onPointMove(e: EventPointer) {
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
  onPointUp() {
    this.isDrowing = false
    this.currentCircle = null
  }

  static install(toolLoader: ToolLoader) {
    const selectTool = new CircleTool(toolLoader.canvas, toolLoader.config)
    return selectTool
  }
}