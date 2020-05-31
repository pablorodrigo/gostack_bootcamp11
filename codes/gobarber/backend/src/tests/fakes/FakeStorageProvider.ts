import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const findIndexFile = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(findIndexFile, 1);
  }
}
