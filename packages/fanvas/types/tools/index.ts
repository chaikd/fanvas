import type { FabricObject, FabricObjectProps, RectProps, TPointerEvent, TPointerEventInfo } from "fabric";
import ToolLoader from "../../modules/toolLoader";

export type ToolTypes = 'rect' | 'brush' | 'circle' | 'select' | 'text'
export type EventPointer = TPointerEventInfo<TPointerEvent> & TPointerEventInfo<TPointerEvent> & { alreadySelected: boolean; }

export interface ToolConfigProps extends Partial<FabricObjectProps> {
  brushColor?: string;
  brushWidth?: number;
  // brushStroke?: string;
  strokeWidth?: number;
  borderColor?: string;
  fontFamily?: string;
  polygonEndKey?: string; // 多边形结束绘制的键，默认是 "Enter"
}

export interface Tool extends Partial<FabricObject> {
  active(): void
  deactive(): void
}

export interface ToolConstructor {
  name: string
  install: (toolLoader: ToolLoader) => Tool
}

export type RectToolConfig = Partial<RectProps & {label: string}>