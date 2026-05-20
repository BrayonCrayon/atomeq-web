// TODO: Start implementing this
export interface DisplayElement {
  shouldFade: () => boolean;
  selectAndDeselect: () => void;
  reset: () => void;
  hover: () => void;
}

export class DisplayElementType implements DisplayElement {
  shouldFade: () => boolean;
  selectAndDeselect: () => void;
  reset: () => void;
  hover: () => void;
}

export class DisplayElementState implements DisplayElement {
  shouldFade: () => boolean;
  selectAndDeselect: () => void;
  reset: () => void;
  hover: () => void;
}

export class DisplayElementBlock implements DisplayElement {
  hover(): void {}

  reset(): void {}

  selectAndDeselect(): void {}

  shouldFade(): boolean {
    return false;
  }
}
