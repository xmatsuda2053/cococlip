import {
  LitElement,
  html,
  css,
  unsafeCSS,
  PropertyValues,
  HTMLTemplateResult,
} from "lit";
import { customElement, property } from "lit/decorators.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { formatDate } from "@service/utils";

import type { FileMeta } from "@/models/FileMeta";

import "@shoelace-style/shoelace/dist/themes/light.css";
import styles from "./ccc-footer.lit.scss?inline";

setBasePath("/");
@customElement("ccc-footer")
export class CccFooter extends LitElement {
  /**
   * スタイルシートを適用
   *
   * @static
   * @memberof CccFooter
   */
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  /**
   * ファイル名
   *
   * @type {Object}
   * @memberof CccTable
   */
  @property({ type: Object }) fileMeta?: FileMeta | undefined = undefined;

  /**
   * 検索結果件数
   *
   * @type {number}
   * @memberof CccFooter
   */
  @property({ type: Number }) hitCount?: number = 0;

  /**
   * Creates an instance of CccFooter.
   * @memberof CccFooter
   */
  constructor() {
    super();
  }

  /**
   * コンポーネントがドキュメントの DOM に追加されたときに実行されます。
   *
   * @override
   * @memberof CccFooter
   */
  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * コンポーネントがドキュメントの DOM から削除されたときに実行されます。
   *
   * @override
   * @memberof CccFooter
   */
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  /**
   * render直前に実行されます。
   *
   * @protected
   * @param {PropertyValues} _changedProperties
   * @memberof CccFooter
   */
  protected willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties);
  }

  /**
   * コンポーネントのメインレイアウトをレンダリングします。
   * アプリケーションの基本構造を定義します。
   *
   * @protected
   * @override
   * @returns {HTMLTemplateResult} レンダリングされる Lit テンプレート
   * @memberof CccFooter
   */
  protected render(): HTMLTemplateResult {
    if (!this.fileMeta) {
      return html`<div id="root"></div>`;
    }

    return html`<div id="root">
      <div class="item">
        <sl-icon library="ccc" name="filetype-csv"></sl-icon>
        <span>${this.fileMeta?.fileName}</span>
      </div>
      <div class="item">
        <sl-icon library="ccc" name="calendar3-event"></sl-icon>
        <span>${formatDate(this.fileMeta?.createdAt)}</span>
      </div>
      <div class="item">
        <sl-icon library="ccc" name="table"></sl-icon>
        <span>${this.fileMeta?.Count.toLocaleString()} lines</span>
      </div>
      <div class="item">
        <sl-icon library="ccc" name="search"></sl-icon>
        <span>${this.hitCount?.toLocaleString()} hits</span>
      </div>
    </div>`;
  }
}
