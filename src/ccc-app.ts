import {
  LitElement,
  html,
  css,
  unsafeCSS,
  PropertyValues,
  HTMLTemplateResult,
} from "lit";
import { customElement, state } from "lit/decorators.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { registerIconLibrary } from "@shoelace-style/shoelace/dist/utilities/icon-library.js";
import { icons } from "@assets/icons";

import "@plugins/shoelace";
import "@components/index";

import "@shoelace-style/shoelace/dist/themes/light.css";
import styles from "./ccc-app.lit.scss?inline";

setBasePath("/");
@customElement("ccc-app")
export class CccApp extends LitElement {
  /**
   * 表示対象のファイルのID
   *
   * @type {(number | undefined)}
   * @memberof CccApp
   */
  @state() metaId?: number | undefined = undefined;

  /**
   * 検索文字列
   *
   * @type {string}
   * @memberof CccApp
   */
  @state() searchText?: string = "";

  /**
   * スタイルシートを適用
   *
   * @static
   * @memberof CccApp
   */
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  /**
   * Creates an instance of CccApp.
   * @memberof CccApp
   */
  constructor() {
    super();
    registerIconLibrary("ccc", {
      resolver: (name: string) => {
        if (name in icons) {
          return `data:image/svg+xml;utf8,${encodeURIComponent(icons[name])}`;
        }
        return "";
      },
    });
  }

  /**
   * コンポーネントがドキュメントの DOM に追加されたときに実行されます。
   *
   * @override
   * @memberof CccApp
   */
  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * コンポーネントがドキュメントの DOM から削除されたときに実行されます。
   *
   * @override
   * @memberof CccApp
   */
  disconnectedCallback() {
    super.disconnectedCallback();
  }

  /**
   * render直前に実行されます。
   *
   * @protected
   * @param {PropertyValues} _changedProperties
   * @memberof CccApp
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
   * @memberof CccApp
   */
  protected render(): HTMLTemplateResult {
    return html`<div class="ccc-container">
      <div class="ccc-header" @clickFile=${this._handleClickFile}>
        <ccc-header
          @searchTextChange=${this._handleSearchTextChange}
        ></ccc-header>
      </div>
      <div class="ccc-main">
        <ccc-table
          .metaId=${this.metaId}
          .searchText=${this.searchText}
        ></ccc-table>
      </div>
      <div class="ccc-footer">footer</div>
    </div>`;
  }

  /**
   * リストのファイルクリック時のイベントを定義します。
   *
   * @private
   * @param {CustomEvent} e
   * @memberof CccApp
   */
  private _handleClickFile(e: CustomEvent) {
    this.metaId = e.detail.metaId;
  }

  /**
   * 検索文字列変更時のイベントを定義します。
   *
   * @private
   * @param {CustomEvent} e
   * @memberof CccApp
   */
  private _handleSearchTextChange(e: CustomEvent) {
    this.searchText = e.detail.searchText;
  }
}
