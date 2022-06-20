/* tslint:disable */
/* eslint-disable */
/**
 */
export class ToMd {
  free(): void
  /**
   * @param {string} text
   * @returns {ToMd}
   */
  static new(text: string): ToMd
  /**
   * @returns {string}
   */
  convert(): string
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module

export interface InitOutput {
  readonly memory: WebAssembly.Memory
  readonly __wbg_tomd_free: (a: number) => void
  readonly tomd_new: (a: number, b: number) => number
  readonly tomd_convert: (a: number, b: number) => void
  readonly __wbindgen_malloc: (a: number) => number
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number
  readonly __wbindgen_free: (a: number, b: number) => void
}

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {InitInput | Promise<InitInput>} module_or_path
 *
 * @returns {Promise<InitOutput>}
 */
export default function init(module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>
