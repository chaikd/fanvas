import { Canvas, CanvasOptions, TOptions } from "fabric";

export interface CanvasLoaderInterface {
  canvas: Canvas
}
export type canvasLoaderOptions = TOptions<CanvasOptions>