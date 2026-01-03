import { LitElement, html, css, unsafeCSS, HTMLTemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import favicon from "@assets/favicon/favicon.svg?raw";

import styles from "./app-about.lit.scss?inline";

@customElement("app-about")
export class AppAbout extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  /**
   * Creates an instance of AppAbout.
   * @memberof AppAbout
   */
  constructor() {
    super();
  }
  /**
   *
   * @protected
   * @return {*}  {HTMLTemplateResult}
   * @memberof AppAbout
   */
  protected render(): HTMLTemplateResult {
    return html` <div class="app-name">
        ${unsafeSVG(favicon)}
        <span>CoCo-Clip</span>
      </div>
      <div class="description-area">
        <div class="text">version:</div>
        <div class="badge"><sl-badge variant="primary">0.0.1</sl-badge></div>
      </div>
      <div class="description-area">
        <div class="text">updatedAt:</div>
        <div class="badge">
          <sl-badge variant="primary">2026.01.03</sl-badge>
        </div>
      </div>`;
  }
}
