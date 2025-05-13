import { canvasLoaderOptions } from "../modules/canvasLoader";
import { ToolConfigProps, ToolTypes } from "../tools";
import { CanvasLoaderInterface } from "../modules/canvasLoader";
import { ToolLoaderInterface } from "../modules/toolLoader";
import { Canvas } from "fabric";

export interface FanvasConfig {
  _canvasLoader: CanvasLoaderInterface
  _toolLoader: ToolLoaderInterface
  _canvas: Canvas
  setZoom: (val: number) => void
  useTool: (name: ToolTypes) => void
  setToolOptions: (options: ToolConfigProps) => void
}

export interface FanvasConfigProps {
  toolConfig?: ToolConfigProps
  canvasConfig?: Partial<canvasLoaderOptions>
}
