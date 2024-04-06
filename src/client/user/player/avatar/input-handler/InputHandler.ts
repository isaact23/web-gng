import * as Babylon from "@babylonjs/core";
import { KeyboardInfo, PointerEventTypes, PointerInfo, PointerInput, Scene } from "@babylonjs/core"

type InputStatus = {
  forward: boolean,
  back: boolean,
  left: boolean,
  right: boolean,
  jump: boolean,
  shift: boolean
};

/**
 * Handler from events from Babylon's input system.
 * Provides polling for user movement (continuous) and callbacks
 * for user actions (discrete).
 */
export class InputHandler {
  private input: InputStatus;

  constructor(
    private onLeftClick: () => void,
    private onRightClick: () => void,
    scene: Scene
  ) {

    // Initialize empty input
    this.input = {
      forward: false,
      back: false,
      left: false,
      right: false,
      jump: false,
      shift: false
    };

    // Register handlers
    scene.onKeyboardObservable.add(kbInfo => this.handleKey(kbInfo));
    scene.onPointerObservable.add(pointerInfo => this.handlePointer(pointerInfo));
  }

  // Get the current input status (polling).
  public getInput(): InputStatus {
    return this.input;
  }

  // Handle a keyboard event.
  private handleKey(kbInfo: KeyboardInfo) {
    const key = kbInfo.event.key.toLowerCase();

    switch (kbInfo.type) {
      case Babylon.KeyboardEventTypes.KEYDOWN:
      switch (key) {
        case 'w': this.input.forward = true; break;
        case 'a': this.input.left = true; break;
        case 's': this.input.back = true; break;
        case 'd': this.input.right = true; break;
        case ' ': this.input.jump = true; break;
        case 'shift': this.input.shift = true; break;
      }
      break;

      case Babylon.KeyboardEventTypes.KEYUP:
      switch (kbInfo.event.key) {
        case 'w': this.input.forward = false; break;
        case 'a': this.input.left = false; break;
        case 's': this.input.back = false; break;
        case 'd': this.input.right = false; break;
        case ' ': this.input.jump = false; break;
        case 'shift': this.input.shift = false; break;
      }
      break;
    }
  }

  // Handle a pointer event.
  private handlePointer(pointerInfo: PointerInfo) {
    if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
      if (pointerInfo.event.inputIndex === PointerInput.LeftClick) {
        this.onLeftClick();
      }

      // Place blocks on right click
      else if (pointerInfo.event.inputIndex === PointerInput.RightClick) {
        this.onRightClick();
      }
    }
  }
}