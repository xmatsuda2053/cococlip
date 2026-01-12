import {
  LitElement,
  html,
  css,
  unsafeCSS,
  PropertyValues,
  HTMLTemplateResult,
} from "lit";
import { customElement, state, property, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";

import { toastSuccess } from "@service/utils";
import { db } from "@service/db";
import type { FileData } from "@/models/FileData";
import type { FileMeta } from "@/models/FileMeta";

import "@shoelace-style/shoelace/dist/themes/light.css";

import sharedStyles from "@assets/styles/shared.lit.scss?inline";
import styles from "./ccc-table.lit.scss?inline";

setBasePath("/");
@customElement("ccc-table")
export class CccTable extends LitElement {
  /**
   * 表示対象のファイルのID
   *
   * @type {(number | undefined)}
   * @memberof CccTable
   */
  @property({ type: Number, hasChanged: () => true }) metaId?:
    | number
    | undefined = undefined;

  /**
   * 表示対象のファイルのメタデータ
   *
   * @type {(FileMeta | undefined)}
   * @memberof CccTable
   */
  @state() private _fileMeta: FileMeta | undefined = undefined;

  /**
   * 表示対象のファイルのデータ
   *
   * @private
   * @type {(FileData | undefined)}
   * @memberof CccTable
   */
  @state() private _fileData: FileData[] = [];

  /**
   * スタイルシートを適用
   *
   * @static
   * @memberof CccTable
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
   * Creates an instance of CccTable.
   * @memberof CccTable
   */
  constructor() {
    super();
  }

  /**
   * コンポーネントがドキュメントの DOM に追加されたときに実行されます。
   *
   * @override
   * @memberof CccTable
   */
  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * コンポーネントがドキュメントの DOM から削除されたときに実行されます。
   *
   * @override
   * @memberof CccTable
   */
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  /**
   * render直前に実行されます。
   *
   * @protected
   * @param {PropertyValues} _changedProperties
   * @memberof CccTable
   */
  protected async willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties);

    if (
      _changedProperties.has("metaId") &&
      this.metaId !== undefined &&
      this.metaId !== 0
    ) {
      const id: number = Number(this.metaId);
      this._fileMeta = await db.selectMetaById(id);
      this._fileData = await db.selectDataByMetaId(id);
    }
  }

  /**
   * コンポーネントのメインレイアウトをレンダリングします。
   * アプリケーションの基本構造を定義します。
   *
   * @protected
   * @override
   * @returns {HTMLTemplateResult} レンダリングされる Lit テンプレート
   * @memberof CccTable
   */
  protected render(): HTMLTemplateResult {
    if (!this.metaId) {
      return html`<p>データがありません</p>`;
    }

    return html`<div id="root" class="scrollable">
      <table>
        <thead>
          <tr>
            ${this._fileMeta?.headers?.map((f) => html`<th>${f}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${repeat(
            this._fileData,
            (d) => d.id,
            (d) => html` <tr>
              ${this._fileMeta?.headers?.map(
                (h: string) =>
                  html` <td @click=${this._handleClickTd}>${d.data[h]}</td>`
              )}
            </tr>`
          )}
        </tbody>
      </table>
    </div>`;
  }

  /**
   * クリックしたセルの値をクリップボードにコピーする。
   *
   * @private
   * @param {Event} e
   * @memberof CccTable
   */
  private async _handleClickTd(e: Event) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (!target) {
      return;
    }

    await navigator.clipboard.writeText(target.innerText);

    toastSuccess("コピー完了", "クリップボードにコピーしました");
  }
}
