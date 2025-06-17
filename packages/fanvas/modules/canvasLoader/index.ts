import { FabricObject } from "fabric";
import { canvasLoaderOptions } from "../../types/modules/canvasLoader";
import { Tool } from "../../types/tools";
import BaseAction from "./base";

export class CanvasLoader extends BaseAction {
  currentToolListener: null | {
    _onMounseDown?,
    _onMounseMove?,
    _onMounseUp?,
    _onTextChanged?,
    _onPathCreated?,
  } = null
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

  setEventListener(tool: Tool | undefined) {
    if (!tool) return
    this.currentToolListener = {
      _onMounseDown: this._onMounseDown(tool),
      _onMounseMove: this._onMounseMove(tool),
      _onMounseUp: this._onMounseUp(tool),
      _onTextChanged: this._onTextChanged(tool),
      _onPathCreated: this._onPathCreated(tool),
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

  // async setLabel(label: string) {
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
  // _onTextEditingExited(tool) {
  //   return (e) => {
  //     if(tool.onTextEditingExited) {
  //       tool.onTextEditingExited(e)
  //     }
  //   }
  // }
}