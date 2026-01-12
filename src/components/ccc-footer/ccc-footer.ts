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
   * @type {string}
   * @memberof CccTable
   */
  @property({ type: String }) fileName?: string = "";

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
    return html`<div id="root">
      <sl-icon library="ccc" name="table"></sl-icon>
      <span>${this.fileName}</span>
    </div>`;
  }
}
