// import { Canvas } from "fabric";
import { CanvasLoader } from "../modules/canvasLoader";
import ToolLoader from "../modules/toolLoader";
import { FanvasConfigProps } from "../types/core/fanvas";
import {Tool, ToolConfigProps, ToolTypes } from "../types/tools";

export default class Fanvas {
  private _canvasLoader: CanvasLoader
  private _toolLoader: ToolLoader
  constructor(el: HTMLCanvasElement | string, config?: FanvasConfigProps) {
    this._canvasLoader = new CanvasLoader(el, config?.canvasConfig)
    this._toolLoader = new ToolLoader(this._canvasLoader.canvas, config?.toolConfig || {})
  }
  useTool(name: ToolTypes) {
    this._toolLoader.switchTool(name).then((currentTool?: Tool) => {
      this._canvasLoader.removeEventListener()
      this._canvasLoader.setEventListener(currentTool)
    })
  }
  setToolOptions(options: ToolConfigProps) {
    this._toolLoader.setOptions(options)
  }
  addImage(img: Element | string) {
    this._canvasLoader.addImage(img)
  }
  deleteSelected() {
    this._canvasLoader.deleteSelected()
  }
}