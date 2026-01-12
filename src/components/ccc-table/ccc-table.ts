import {
  LitElement,
  html,
  css,
  unsafeCSS,
  PropertyValues,
  HTMLTemplateResult,
} from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import favicon from "@assets/favicon/favicon.svg?raw";

import { toastSuccess } from "@service/utils";
import type { FileData } from "@/models/FileData";
import type { FileMeta } from "@/models/FileMeta";

import "@shoelace-style/shoelace/dist/themes/light.css";

import sharedStyles from "@assets/styles/shared.lit.scss?inline";
import styles from "./ccc-table.lit.scss?inline";

setBasePath("/");
@customElement("ccc-table")
export class CccTable extends LitElement {
  /**
   * 表示対象のファイルのメタデータ
   *
   * @private
   * @type {(FileMeta | undefined)}
   * @memberof CccTable
   */
  @property({ type: Object, hasChanged: () => true }) fileMeta:
    | FileMeta
    | undefined = undefined;

  /**
   * 表示対象のファイルのデータ
   *
   * @private
   * @type {FileData[]}
   * @memberof CccTable
   */
  @property({ type: Array, hasChanged: () => true }) fileData: FileData[] = [];

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
    if (!this.fileMeta) {
      return html`<div id="app_name">
        ${unsafeSVG(favicon)}
        <div>CoCo-Clip</div>
      </div>`;
    }

    return html`<div id="root" class="scrollable">
      <table>
        <thead>
          <tr>
            ${this.fileMeta?.headers?.map((f) => html`<th>${f}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${repeat(
            this.fileData,
            (d) => d.id,
            (d) => html` <tr>
              ${this.fileMeta?.headers?.map(
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
