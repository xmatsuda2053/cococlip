import type { SlAlert } from "@shoelace-style/shoelace";

/**
 * 現在フォーカスされている要素のフォーカスを解除（ブラー）します。
 * 主にダイアログやメニューを閉じる際、背後の要素にフォーカスが残るのを防ぐために使用します。
 */
export function handleRequestClose(): void {
  (document.activeElement as HTMLElement)?.blur();
}

/**
 * 指定された文字列が空（null, undefined, 空文字）でないか判定します。
 * * @param val - 判定対象の文字列
 * @returns 空でない場合は true、それ以外（null, undefined, ""）は false
 * * @example
 * isNotBlank("hello") // true
 * isNotBlank("")      // false
 * isNotBlank(null)    // false
 */
export function isNotBlank(val: string | null | undefined): boolean {
  return val !== null && val !== undefined && val !== "";
}

/**
 * トースト通知を表示するためのベースとなる共通処理です。
 *
 * @param {string} variant 種類 ("success" | "danger" | "primary" など)
 * @param {string} iconName 表示するアイコンの名前
 * @param {string} title タイトル
 * @param {string} message メッセージ内容
 */
function showToast(
  variant: string,
  iconName: string,
  title: string,
  message: string
) {
  const alert = Object.assign(document.createElement("sl-alert"), {
    variant: variant,
    duration: 1500,
    closable: true,
    innerHTML: `
        <sl-icon slot="icon" library="ccc" name="${iconName}"></sl-icon>
        <strong>${title}</strong><br />
        ${message}
      `,
  });
  document.body.append(alert);
  (alert as SlAlert).toast();
}

/**
 * 処理成功時のトーストを表示します。
 *
 * @export
 * @param {string} innerTitleText タイトル
 * @param {string} innerHtmlText メッセージ内容
 */
export function toastSuccess(innerTitleText: string, innerHtmlText: string) {
  showToast("success", "check2-circle", innerTitleText, innerHtmlText);
}

/**
 * 処理失敗時のトーストを表示します。
 *
 * @export
 * @param {string} innerTitleText タイトル
 * @param {string} innerHtmlText メッセージ内容
 */
export function toastDanger(innerTitleText: string, innerHtmlText: string) {
  showToast("danger", "exclamation-octagon", innerTitleText, innerHtmlText);
}
