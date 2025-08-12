// 定义插入模式类型
export type InsertMode = 'GLOBAL';

// 定义样式属性类型
export type CSSProperties = Record<string, string>;

/**
 * 组件配置
 */
export interface ComponentConfig {
  /** 组件标识符 */
  [key: string]: string;
}

/**
 * 页面处理配置项
 * @template T - 组件名称类型
 */
export interface HandlePosItem<T extends string = string> {
  /** 页面路径（如 'pages/home' 或 '/pages/home'） */
  page?: string;
  /** 需要插入的组件列表 */
  insert?: T[];
}

/**
 * 插入位置配置
 * @template T - 组件名称类型
 */
export interface InsertPosConfig<T extends string = string> {
  /** 插入模式 */
  mode?: InsertMode;
  /** 排除的页面路径列表 */
  exclude?: string[];
  /** 页面特定配置 */
  handlePos?: HandlePosItem<T>[];
}

/**
 * 组件样式选项
 */
export interface ComponentStyleOptions {
  /** CSS 类名 */
  class?: string;
  /** 元素 ID */
  id?: string;
  /** 内联样式 */
  style?: CSSProperties;
  /** 其他 HTML 属性 */
  [key: string]: unknown;
}

/**
 * Vite 插件配置对象
 * @template T - 组件名称类型
 */
export interface ConfigObject<T extends string = string> {
  /** 组件定义映射 */
  components?: ComponentConfig;
  /** 包含的路径列表 */
  includes?: string[];
  /** 监听的文件路径模式（支持 glob） */
  watchFile?: string | string[];
  /** 插入位置配置 */
  insertPos?: InsertPosConfig<T>;
}

/**
 * 页面配置
 */
export interface PageConfig {
  /** 页面路径（相对于项目根目录） */
  path: string;
  /** 页面标题 */
  title?: string;
  /** 页面样式 */
  style?: string;
  /** 导航栏配置 */
  navigationBar?: {
    titleText?: string;
    backgroundColor?: string;
    textColor?: string;
  };
}

/**
 * 分包配置
 */
export interface SubPackageConfig {
  /** 分包根目录 */
  root: string;
  /** 分包页面列表 */
  pages: PageConfig[];
  /** 分包预下载规则 */
  preload?: {
    pages?: string[];
    network?: 'all' | 'wifi';
  };
}

/**
 * pages.json 配置
 */
export interface PagesJson {
  /** 全局样式配置 */
  globalStyle?: PageConfig;
  /** 主包页面列表 */
  pages?: PageConfig[];
  /** 分包列表 */
  subPackages?: SubPackageConfig[];
  /** tabBar 配置 */
  tabBar?: {
    color?: string;
    selectedColor?: string;
    list: Array<{
      text: string;
      pagePath: string;
    }>;
  };
}

/**
 * 页面标签配置
 */
export interface LabelConfig {
  [path: string]: {
    /** 页面需要插入的标签列表 */
    label?: string[];
  };
}

/**
 * 插件选项配置
 */
export interface ViteInsetLoaderOptions {
  /** 标签名称 */
  label: string;
  /** 标签属性配置 */
  options: ComponentStyleOptions;
}
