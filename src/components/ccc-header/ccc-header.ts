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

import { handleRequestClose } from "@service/utils";

import "@shoelace-style/shoelace/dist/themes/light.css";
import type SlDrawer from "@shoelace-style/shoelace/dist/components/drawer/drawer.js";
import sharedStyles from "@assets/styles/shared.lit.scss?inline";
import styles from "./ccc-header.lit.scss?inline";

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
            <ccc-storage></ccc-storage>
          </sl-tab-panel>
          <sl-tab-panel name="about">
            <app-about></app-about>
          </sl-tab-panel>
        </sl-tab-group>
      </sl-drawer>
    </div> `;
  }
}
