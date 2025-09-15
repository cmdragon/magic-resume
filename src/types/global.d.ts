declare global {
  interface Window {
    showDirectoryPicker(
      options?: FilePickerOptions
    ): Promise<FileSystemDirectoryHandle>;
  }

  interface FileSystemDirectoryHandle {
    values(): AsyncIterable<FileSystemHandle>;
    [Symbol.asyncIterator](): AsyncIterator<[string, FileSystemHandle]>;
  }

  interface FileSystemFileHandle {
    getFile(): Promise<File>;
  }
}

declare module 'mark.js' {
  export default class Mark {
    constructor(element: HTMLElement);
    mark(keyword: string, options?: any): void;
    unmark(options?: any): void;
  }
}

interface FilePickerOptions {
  multiple?: boolean;
  mode?: "read" | "readwrite";
}

export {};
