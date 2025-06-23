// import { Canvas } from "fabric";
import { CanvasLoader } from "../modules/canvasLoader";
import ToolLoader from "../modules/toolLoader";
import { FanvasConfigProps, type FanvasClass } from "../types/core/fanvas";
import {ToolConfigProps, ToolTypes } from "../types/tools";

export default class Fanvas implements FanvasClass {
  _canvasLoader: CanvasLoader
  _toolLoader: ToolLoader
  constructor(el: HTMLCanvasElement | string, config?: FanvasConfigProps) {
    this._canvasLoader = new CanvasLoader(el, config?.canvasConfig)
    this._toolLoader = new ToolLoader(this._canvasLoader.canvas, config?.toolConfig || {})
  }
  useTool(name: ToolTypes) {
    this._toolLoader.switchTool(name)
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
  preStep() {
    this._canvasLoader.preStep()
  }
  setLabel(label = '标签') {
    this._canvasLoader.setLabel(label)
  }
}