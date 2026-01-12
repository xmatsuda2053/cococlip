import { LitElement, html, css, unsafeCSS, HTMLTemplateResult } from "lit";
import { customElement, query } from "lit/decorators.js";

import { SlInput } from "@shoelace-style/shoelace";
import { emit } from "../shared/event";

import styles from "./ccc-search.lit.scss?inline";

@customElement("ccc-search")
export class CccSearch extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  /**
   * ファイル選択
   *
   * @type {HTMLInputElement}
   * @memberof CccHeader
   */
  @query("#search_text") searchText!: SlInput;

  /**
   * Creates an instance of CccSearch.
   * @memberof CccSearch
   */
  constructor() {
    super();
  }

  /**
   *
   * @protected
   * @return {*}  {HTMLTemplateResult}
   * @memberof CccSearch
   */
  protected render(): HTMLTemplateResult {
    return html` <sl-input
      type="text"
      size="small"
      placeholder="search..."
      id="search_text"
      @sl-change=${this._handleSearchTextChange}
      clearable
    >
      <sl-icon slot="prefix" library="ccc" name="search"></sl-icon>
    </sl-input>`;
  }

  /**
   * 検索欄の入力内容を外部に伝播
   *
   * @private
   * @memberof CccSearch
   */
  private _handleSearchTextChange() {
    console.log(this.searchText.value);
    emit(this, "searchTextChange", {
      detail: { value: this.searchText.value },
    });
  }
}
