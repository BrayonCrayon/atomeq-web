/**
 * Build styles
 */
// require('./index.css').toString();
import subscript from './subscript.svg';

interface IApi {
  styles: {
    inlineToolButton: string;
    inlineToolButtonActive: string;
  };
  selection: {
    expandToTag: (val: HTMLElement) => void;
    findParentTag: (tag: string, css: string) => HTMLElement;
  };
}

/**
 * Subscript Tool for the Editor.js
 * Allows to wrap inline fragment and style it somehow.
 */
export class Subscript {
  private api: IApi;
  private button: HTMLButtonElement | null;
  private tag: string;
  private iconClasses: { base: string; active: string };
  /**
   * Class name for term-tag
   *
   * @type {string}
   */
  static get CSS() {
    return 'cdx-subscript';
  }

  /**
   */
  constructor({ api }: { api: IApi }) {
    this.api = api;

    /**
     * Toolbar Button
     *
     * @type {HTMLElement|null}
     */
    this.button = null;

    /**
     * Tag represented the term
     */
    this.tag = 'sub';

    /**
     * CSS classes
     */
    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };
  }

  /**
   * Specifies Tool as Inline Toolbar Tool
   *
   */
  static get isInline() {
    return true;
  }

  /**
   * Create button element for Toolbar
   *
   * @return {HTMLElement}
   */
  render() {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.classList.add(this.iconClasses.base);
    this.button.innerHTML = this.toolboxIcon;

    return this.button;
  }

  /**
   * Wrap/Unwrap selected fragment
   */
  surround(range: Range) {
    if (!range) {
      return;
    }

    const termWrapper = this.api.selection.findParentTag(this.tag, Subscript.CSS);

    /**
     * If start or end of selection is in the highlighted block
     */
    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  /**
   * Wrap selection with term-tag
   */
  wrap(range: Range) {
    /**
     * Create a wrapper for highlighting
     */
    const subElement = document.createElement(this.tag);

    /**
     * SurroundContent throws an error if the Range splits a non-Text node with only one of its boundary points
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Range/surroundContents}
     *
     * // range.surroundContents(sub);
     */
    subElement.appendChild(range.extractContents());
    range.insertNode(subElement);

    /**
     * Expand (add) selection to highlighted block
     */
    this.api.selection.expandToTag(subElement);
  }

  /**
   * Unwrap term-tag
   */
  unwrap(termWrapper: HTMLElement) {
    /**
     * Expand selection to all term-tag
     */
    this.api.selection.expandToTag(termWrapper);

    const sel = window.getSelection();
    const range = sel?.getRangeAt(0);

    const unwrappedContent = range?.extractContents();

    /**
     * Remove empty term-tag
     */
    termWrapper.parentNode?.removeChild(termWrapper);

    /**
     * Insert extracted content
     */
    if (unwrappedContent) {
      range?.insertNode(unwrappedContent);
    }

    /**
     * Restore selection
     */
    if (sel && range) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  /**
   * Check and change Term's state for current selection
   */
  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag, Subscript.CSS);

    this.button?.classList.toggle(this.iconClasses.active, !!termTag);
  }

  /**
   * Get Tool icon's SVG
   */
  get toolboxIcon() {
    return subscript;
  }

  /**
   * Sanitizer rule
   */
  static get sanitize() {
    return {
      sub: {
        class: Subscript.CSS,
      },
    };
  }
}

module.exports = Subscript;
