import Dexie, { Table } from "dexie";
import type { FileMeta } from "@/models/FileMeta";
import type { FileData } from "@/models/FileData";

export class CccGoDB extends Dexie {
  fileMeta!: Table<FileMeta>;
  fileData!: Table<FileData>;

  /**
   * Creates an instance of CccGoDB.
   * @memberof CccGoDB
   */
  constructor() {
    super("CccGoDB");
    this.version(1).stores({
      fileMeta: "++id, fileName",
      fileData: "++id, metaId, searchTerms",
    });
  }

  /**
   * メタデータ覧を取得します。
   * @return {*}  {Promise<FileMeta[]>}
   * @memberof CccGoDB
   */
  async selectMeta(): Promise<FileMeta[]> {
    return await db.fileMeta.toArray();
  }

  /**
   * インポートされたデータをデータベースに登録します。
   * トランザクション処理により、メタ情報と行データの一貫性を保証します。
   * @param {Object} importParams - インポートするデータのパッケージ
   * @param {FileMeta} importParams.meta - インポート対象ファイルのメタ情報
   * @param {FileData[]} importParams.data - インポート対象ファイルからパースされた行データの配列
   * @returns {Promise<number>} 作成された fileMeta のプライマリキー (id)
   * @throws {Error} データの保存に失敗した場合、トランザクションがロールバックされエラーがスローされます。
   */
  async importData(importData: {
    meta: FileMeta;
    data: FileData[];
  }): Promise<number> {
    return await this.transaction(
      "rw",
      this.fileMeta,
      this.fileData,
      async () => {
        // 1. 親（FileMeta）を保存し、自動採番されたIDを取得
        const metaId = await this.fileMeta.add({
          fileName: importData.meta.fileName,
          Count: importData.meta.Count,
          headers: importData.meta.headers,
          createdAt: importData.meta.createdAt,
        });

        // 2. 子データ（FileData）の各レコードに、親のIDを紐付ける
        const dataWithFileId = importData.data.map((item) => ({
          ...item,
          metaId: metaId,
        }));

        // 3. 紐付け済みのデータを一括登録
        await this.fileData.bulkAdd(dataWithFileId);

        return metaId;
      }
    );
  }

  /**
   * 指定したIDに該当するファイルのデータをすべて削除します。
   *
   * @param {number} id
   * @memberof CccGoDB
   */
  async deleteFile(id: number) {
    await this.transaction("rw", this.fileMeta, this.fileData, async () => {
      await db.fileData.where("metaId").equals(id).delete();
      await db.fileMeta.delete(id);
    });
  }
}
export const db = new CccGoDB();
