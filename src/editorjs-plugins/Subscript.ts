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

export class Subscript {
  private api: IApi;
  private button: HTMLButtonElement | null;
  private tag: string;
  private iconClasses: { base: string; active: string };

  static get CSS() {
    return 'cdx-subscript';
  }

  constructor({ api }: { api: IApi }) {
    this.api = api;

    this.button = null;

    this.tag = 'sub';

    this.iconClasses = {
      base: this.api.styles.inlineToolButton,
      active: this.api.styles.inlineToolButtonActive,
    };
  }

  static get isInline() {
    return true;
  }

  render(): HTMLElement {
    this.button = document.createElement('button');
    this.button.type = 'button';
    this.button.innerHTML = 'subscript';

    return this.button;
  }

  surround(range: Range) {
    if (!range) {
      return;
    }

    const termWrapper = this.api.selection.findParentTag(this.tag, Subscript.CSS);

    if (termWrapper) {
      this.unwrap(termWrapper);
    } else {
      this.wrap(range);
    }
  }

  wrap(range: Range) {
    const subElement = document.createElement(this.tag);

    subElement.appendChild(range.extractContents());
    range.insertNode(subElement);

    this.api.selection.expandToTag(subElement);
  }

  unwrap(termWrapper: HTMLElement) {
    this.api.selection.expandToTag(termWrapper);

    const sel = window.getSelection();
    const range = sel?.getRangeAt(0);

    const unwrappedContent = range?.extractContents();

    termWrapper.parentNode?.removeChild(termWrapper);

    if (unwrappedContent) {
      range?.insertNode(unwrappedContent);
    }

    if (sel && range) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  checkState() {
    const termTag = this.api.selection.findParentTag(this.tag, Subscript.CSS);

    this.button?.classList.toggle(this.iconClasses.active, !!termTag);
  }

  static get sanitize() {
    return {
      sub: {
        class: Subscript.CSS,
      },
    };
  }

  static get toolbox() {
    return {
      title: 'Image',
      icon: 'Subby',
    };
  }
}

export default Subscript;
