import { canvasLoaderOptions } from "@/fanvas/types/modules/canvasLoader";
import { Canvas, FabricImage, FabricObject } from "fabric";

export default class BaseAction {
  canvas!: Canvas
  defaultOptions: Partial<canvasLoaderOptions> = {
    selection: false,
    renderOnAddRemove: true
  }
  constructor(el?: string| HTMLCanvasElement, option?: canvasLoaderOptions) {
    this.canvas = new Canvas(el, {
      ...this.defaultOptions,
      ...option
    });
  }

  setSelection(isSelection) {
    this.canvas.selection = isSelection
  }

  getObjects() {
    return this.canvas.getObjects()
  }

  async getActiveObjects() {
    const actives: Array<FabricObject> = await this.canvas.getActiveObjects()
    return actives
  }

  deleteObject(obj: FabricObject) {
    this.canvas.remove(obj)
  }

  refresh() {
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
  }

  autoActiveObject() {
    const currentObjects: Array<FabricObject> = this.getObjects()
    if(currentObjects.length > 0) {
      const obj = currentObjects[currentObjects.length - 1]
      this.canvas.setActiveObject(obj)
    }
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
}