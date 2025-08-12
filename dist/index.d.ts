import { Plugin } from 'vite';

type InsertMode = 'GLOBAL';
/**
 * 组件配置
 */
interface ComponentConfig {
    /** 组件标识符 */
    [key: string]: string;
}
/**
 * 页面处理配置项
 * @template T - 组件名称类型
 */
interface HandlePosItem<T extends string = string> {
    /** 页面路径（如 'pages/home' 或 '/pages/home'） */
    page?: string;
    /** 需要插入的组件列表 */
    insert?: T[];
}
/**
 * 插入位置配置
 * @template T - 组件名称类型
 */
interface InsertPosConfig<T extends string = string> {
    /** 插入模式 */
    mode?: InsertMode;
    /** 排除的页面路径列表 */
    exclude?: string[];
    /** 页面特定配置 */
    handlePos?: HandlePosItem<T>[];
}
/**
 * Vite 插件配置对象
 * @template T - 组件名称类型
 */
interface ConfigObject<T extends string = string> {
    /** 组件定义映射 */
    components?: ComponentConfig;
    /** 包含的路径列表 */
    includes?: string[];
    /** 监听的文件路径模式（支持 glob） */
    watchFile?: string | string[];
    /** 插入位置配置 */
    insertPos?: InsertPosConfig<T>;
}

declare const UniViteRootInjector: (options?: ConfigObject) => Plugin;

export { ConfigObject, HandlePosItem, InsertPosConfig, UniViteRootInjector as default };
