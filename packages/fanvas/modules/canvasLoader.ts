import { Canvas, FabricImage, FabricObject } from "fabric";
import { canvasLoaderOptions } from "../types/modules/canvasLoader";
import { Tool } from "../types/tools";

export class CanvasLoader {
  canvas!: Canvas
  defaultOptions: Partial<canvasLoaderOptions> = {
    selection: false,
    renderOnAddRemove: true
  }
  currentToolListener: null | {
    _onMounseDown?,
    _onMounseMove?,
    _onMounseUp?,
    _onTextChanged?,
    _onPathCreated?,
  } = null
  constructor(el?: string| HTMLCanvasElement, option?: canvasLoaderOptions) {
    this.canvas = new Canvas(el, {
      ...this.defaultOptions,
      ...option
    });
  }

  setSelection(isSelection) {
    this.canvas.selection = isSelection
  }

  addImage(img: Element | string) {
    let theImg
    if(img instanceof Node) {
      theImg = img
    } else {
      const dom = document.createElement('img')
      dom.src = img
      theImg = dom
    }
    this.canvas.add(new FabricImage(theImg))
  }

  deleteSelected() {
    const selected: Array<FabricObject> = this.canvas.getActiveObjects()
    if(selected.length > 1) {
      selected.forEach(obj => {
        this.canvas.remove(obj)
      })
    } else if (selected.length > 0) {
      this.canvas.remove(selected[0])
    }
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
  }

  setEventListener(tool: Tool | undefined) {
    if (!tool) return
    this.currentToolListener = {
      _onMounseDown: this._onMounseDown(tool),
      _onMounseMove: this._onMounseMove(tool),
      _onMounseUp: this._onMounseUp(tool),
      _onTextChanged: this._onTextChanged(tool),
      _onPathCreated: this._onPathCreated(tool)
    }
    this.canvas.on('mouse:down', this.currentToolListener._onMounseDown);
    this.canvas.on('mouse:move', this.currentToolListener._onMounseMove);
    this.canvas.on('mouse:up', this.currentToolListener._onMounseUp);
    this.canvas.on('text:changed', this.currentToolListener._onTextChanged)
    this.canvas.on('path:created', this.currentToolListener._onPathCreated)
  }

  removeEventListener() {
    if (this.currentToolListener) {
      this.canvas.off('mouse:down', this.currentToolListener?._onMounseDown)
      this.canvas.off('mouse:move', this.currentToolListener?._onMounseMove)
      this.canvas.off('mouse:up', this.currentToolListener?._onMounseUp)
      this.canvas.off('text:changed', this.currentToolListener._onTextChanged)
      // this.canvas.off('path:created', this.currentToolListener._onPathCreated)
      this.currentToolListener = null
    }
  }

  _onMounseDown(tool) {
    return (e) => {
      if (tool.onPointDown) {
        tool.onPointDown(e)
      }
    }
  }
  _onMounseMove(tool) {
    return (e) => {
      if (tool.onPointMove) {
        tool.onPointMove(e)
      }
    }
  }
  _onMounseUp(tool) {
    return () => {
      if (tool.onPointUp) {
        tool.onPointUp()
      }
    }
  }
  _onTextChanged(tool) {
    return () => {
      if(tool.onTextChanged) {
        tool.onTextChanged()
      }
    }
  }
  _onPathCreated(tool) {
    return (e) => {
      if(tool.onPathCreated) {
        tool.onPathCreated(e)
      }
    }
  }
}