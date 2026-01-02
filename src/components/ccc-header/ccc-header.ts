import {
  LitElement,
  html,
  css,
  unsafeCSS,
  PropertyValues,
  HTMLTemplateResult,
} from "lit";
import { customElement, state, property, query } from "lit/decorators.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";

import {
  handleRequestClose,
  isNotBlank,
  toastSuccess,
  toastDanger,
} from "@service/utils";
import { emit } from "../shared/event";
import { db } from "@service/db";
import type { FileData } from "@/models/FileData";
import type { FileMeta } from "@/models/FileMeta";

import "@shoelace-style/shoelace/dist/themes/light.css";
import type SlDrawer from "@shoelace-style/shoelace/dist/components/drawer/drawer.js";
import sharedStyles from "@assets/styles/shared.lit.scss?inline";
import styles from "./ccc-header.lit.scss?inline";

import Papa from "papaparse";

setBasePath("/");
@customElement("ccc-header")
export class CccHeader extends LitElement {
  /**
   * スタイルシートを適用
   *
   * @static
   * @memberof CccHeader
   */
  static styles = [
    css`
      ${unsafeCSS(sharedStyles)}
    `,
    css`
      ${unsafeCSS(styles)}
    `,
  ];

  /**
   * ドロワーメニュー
   *
   * @type {SlDrawer}
   * @memberof CccHeader
   */
  @query("#ccc-drawer-menu") CccDrawerMenu!: SlDrawer;

  /**
   * ファイル選択
   *
   * @type {HTMLInputElement}
   * @memberof CccHeader
   */
  @query("#import") import!: HTMLInputElement;

  /**
   * メタデータ一覧
   *
   * @private
   * @type {FileMeta[]}
   * @memberof CccHeader
   */
  @state() private _fileMetaList: FileMeta[] = [];

  /**
   * Creates an instance of CccHeader.
   * @memberof CccHeader
   */
  constructor() {
    super();
  }

  /**
   * コンポーネントがドキュメントの DOM に追加されたときに実行されます。
   *
   * @override
   * @memberof CccHeader
   */
  connectedCallback() {
    super.connectedCallback();
    this._firstUpdated();
  }

  /**
   * 初回起動時にメタデータを読み込みます。
   *
   * @memberof CccHeader
   */
  private async _firstUpdated() {
    this._fileMetaList = await db.selectMeta();
  }

  /**
   * コンポーネントがドキュメントの DOM から削除されたときに実行されます。
   *
   * @override
   * @memberof CccHeader
   */
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  /**
   * render直前に実行されます。
   *
   * @protected
   * @param {PropertyValues} _changedProperties
   * @memberof CccHeader
   */
  protected async willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties);
  }

  /**
   * コンポーネントのメインレイアウトをレンダリングします。
   * アプリケーションの基本構造を定義します。
   *
   * @protected
   * @override
   * @returns {HTMLTemplateResult} レンダリングされる Lit テンプレート
   * @memberof CccHeader
   */
  protected render(): HTMLTemplateResult {
    return html`<div class="root">
      <sl-icon-button
        library="ccc"
        name="list"
        label="menu"
        id="menu-button"
        @click=${() => this.CccDrawerMenu.show()}
      >
      </sl-icon-button>
      <span class="app-name">CoCo-Clip</span>
      <sl-input type="text" size="small" placeholder="search..." clearable>
        <sl-icon slot="prefix" library="ccc" name="search"></sl-icon>
      </sl-input>
      <sl-drawer
        id="ccc-drawer-menu"
        label="Menu"
        placement="start"
        @sl-request-close=${handleRequestClose}
      >
        <sl-tab-group>
          <sl-tab slot="nav" panel="file">
            <sl-icon library="ccc" name="card-text"></sl-icon>
            ファイル
          </sl-tab>
          <sl-tab slot="nav" panel="about">
            <sl-icon library="ccc" name="info-square"></sl-icon>
            About
          </sl-tab>
          <sl-tab-panel name="file">
            <sl-button-group>
              <sl-button size="small" @click=${this._handleClickImport} outline>
                <sl-icon library="ccc" name="plus-lg" label="add"></sl-icon>
              </sl-button>
              <input
                type="file"
                id="import"
                class="hidden"
                accept=".csv"
                @change=${this._handleChangeImport}
                multiple
              />
            </sl-button-group>
            <div class="file-list">
              <ul
                class="file-list-root ${this._fileMetaList.length === 0
                  ? "hidden"
                  : ""}"
              >
                ${this._fileMetaList.map((f: FileMeta): HTMLTemplateResult => {
                  return html`<li class="file-list-item">
                    <div
                      class="file-name"
                      @click=${() => this._handleClickFile(f.id)}
                    >
                      ${f.fileName}
                    </div>
                    <sl-dropdown>
                      <sl-icon-button
                        slot="trigger"
                        library="ccc"
                        name="three-dots"
                      >
                      </sl-icon-button>
                      <sl-menu>
                        <sl-menu-item
                          class="delete"
                          @click=${() => this._handleClickDelete(f.id)}
                        >
                          <sl-icon
                            slot="prefix"
                            library="ccc"
                            name="trash3"
                          ></sl-icon>
                          <span>削除</span>
                        </sl-menu-item>
                      </sl-menu>
                    </sl-dropdown>
                  </li>`;
                })}
              </ul>
            </div>
          </sl-tab-panel>
          <sl-tab-panel name="about"> test </sl-tab-panel>
        </sl-tab-group>
      </sl-drawer>
    </div> `;
  }

  /**
   * インポート用の隠しファイル入力要素をクリックし、ファイル選択ダイアログを表示します。
   * ユーザーがボタンをクリックした際のハンドラーとして呼び出されます。
   * * @private
   */
  private _handleClickImport() {
    this.import.click();
  }

  /**
   * インポートファイルが選択された際の変更イベントを処理します。
   * 選択されたCSVファイルをパースし、データベースへインポートを実行します。
   * * @private
   * @param {Event} e - ファイル入力要素の変更イベント
   * @returns {Promise<void>} インポート処理が完了した際に解消されるPromise
   * @throws {Error} インポートファイルの形式が不正な場合や、システムエラーが発生した場合
   */
  private async _handleChangeImport(e: Event) {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (!files) return;

    // CSVファイルの内容をパース
    const parseCsvToFileData = async (
      file: File
    ): Promise<{
      meta: FileMeta;
      data: FileData[];
    }> => {
      return new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true, // 1行目をキーとして扱う
          skipEmptyLines: true, // 空行を除外
          complete: (results) => {
            // メタデータ
            const fileMeta: FileMeta = {
              fileName: file.name,
              Count: results.data.length,
              headers: results.meta.fields,
              createdAt: new Date(),
            };

            // ファイル内容
            const fileData = results.data.map((row: any): FileData => {
              const searchTerms = Object.values(row)
                .filter((val) => isNotBlank(String(val)))
                .map((val) => String(val).toLowerCase());

              return {
                data: row,
                searchTerms: searchTerms,
              };
            });

            resolve({ meta: fileMeta, data: fileData });
          },
          error: (error) => {
            reject(error);
          },
        });
      });
    };

    try {
      const promises = Array.from(files).map(async (file) => {
        const data = await parseCsvToFileData(file);
        return db.importData(data);
      });
      await Promise.all(promises);

      this._fileMetaList = await db.selectMeta();

      toastSuccess(
        "インポートしました",
        "CSVファイルをDBにインポートしました。"
      );
    } catch (error) {
      toastDanger("インポート失敗", "CSVファイルのインポートに失敗しました。");
      console.log("import failed:", error);
    }
  }

  /**
   * リストクリックのイベントを発生させる。
   *
   * @private
   * @param {string} [id]
   * @memberof CccHeader
   */
  private _handleClickFile(id: number | undefined) {
    emit(this, "clickFile", { detail: { metaId: id } });
  }

  /**
   * ファイルデータを削除する。
   *
   * @private
   * @param {(number | undefined)} id
   * @memberof CccHeader
   */
  private async _handleClickDelete(id: number | undefined) {
    if (id) {
      await db.deleteFile(id);
      this._fileMetaList = await db.selectMeta();
      toastSuccess("削除しました", "DBからファイルデータを削除しました。");
    }
  }
}
