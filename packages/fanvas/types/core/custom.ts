import { FabricObject } from 'fabric';

declare module "fabric" {
  // 确保类的属性不仅在实例对象中可以访问和使用，而且也能在构造函数中被正确识别和初始化
  interface FabricObject {
    label?: string;
    setLabel(labelName: string): void
  }
  // 确保导出的对象具有类型化的属性
  interface SerializedObjectProps {
    label?: string;
    // setLabel: (labelName: string) => void
  }

  interface propertiesToInclude {
    label?: string;
  }
}

// 确保属性实际添加到序列化对象中
FabricObject.customProperties = ['label'];