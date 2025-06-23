import { FabricObject } from "fabric";
import { canvasLoaderOptions } from "../../types/modules/canvasLoader";
import BaseAction from "./base";

export class CanvasLoader extends BaseAction {
  constructor(el?: string| HTMLCanvasElement, option?: canvasLoaderOptions) {
    super(el, option)
  }

  async deleteSelected() {
    const selected = await this.getActiveObjects()
    selected.forEach(obj => {
      this.deleteObject(obj)
    })
    this.refresh();
    this.autoActiveObject()
  }

  async preStep() {
    const objs = this.getObjects()
    const deleteObj = objs[objs.length - 1]
    this.deleteObject(deleteObj)
    const selected = await this.getActiveObjects()
    if (selected.length === 0) {
      this.autoActiveObject()
    }
    this.refresh();
  }

  async setLabel(label: string) {
    const actives: Array<FabricObject> = await this.getActiveObjects();
    if (!actives || actives.length === 0) return;

    actives.forEach(obj => {
      if (typeof obj.setLabel === 'function') {
        obj.setLabel(label);
        obj.set('dirty', true)
      } else if ('label' in obj) {
        obj.label = label;
        obj.set('dirty', true)
      }
    });
    this.refresh();
  }
}