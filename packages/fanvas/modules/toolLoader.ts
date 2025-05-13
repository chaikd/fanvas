import { Canvas, FabricObject } from "fabric";
import { Tool, ToolConfigProps, ToolConstructor, ToolTypes } from "../types/tools";
import rectTool from '../tools/rectTool'
import selectTool from '../tools/selectTool';
import circleTool from '../tools/circleTool'
import textTool from "../tools/textTool";
import brushTool from "../tools/brushTool";

export default class ToolLoader {
  tools = new Map<string, ToolConstructor>()
  canvas!: Canvas
  config!: ToolConfigProps
  currentTool: Tool | undefined
  defaultConfig: Partial<FabricObject> = {
    fill: '',
    stroke: '#333',
    selectable: false,
    evented: false
  }

  constructor(canvas: Canvas, config: ToolConfigProps) {
    this.canvas = canvas
    this.config = {
      ...this.defaultConfig,
      ...config
    }
    this.registerAllTools()
  }

  registerAllTools() {
    this.registerTool(rectTool)
    this.registerTool(selectTool)
    this.registerTool(circleTool)
    this.registerTool(textTool)
    this.registerTool(brushTool)
  }

  registerTool(tool: ToolConstructor) {
    this.tools.set(tool.name, tool)
  }

  useTool(toolName: ToolTypes) {
    if (this.tools.has(toolName)) {
      const toolClass = this.tools.get(toolName)
      this.currentTool = toolClass?.install(this)
      this.currentTool?.active()
    }
  }

  async switchTool(toolName: ToolTypes) {
    if(this.currentTool?.name === toolName) {
      throw Error('当前选择的工具已设置')
    }
    if(this.currentTool) {
      this.currentTool.deactive()
    }
    this.useTool(toolName)
    if (this?.currentTool) {
      return this.currentTool
    } else {
      return undefined
    }
  }

  setOptions(options: ToolConfigProps) {
    this.config = {
      ...this.config,
      ...options
    }
    if (this.currentTool) {
      this.useTool(this.currentTool.name as ToolTypes)
    }
  }
}