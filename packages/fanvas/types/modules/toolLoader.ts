import { ToolConstructor } from "../tools";

export interface ToolLoaderInterface {
  tools: Map<string, ToolConstructor>
}