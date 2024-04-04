import * as Babylon from "@babylonjs/core";
import { KeyboardInfo, PointerInfo, Scene } from "@babylonjs/core"

type InputStatus = {
  forward: boolean,
  back: boolean,
  left: boolean,
  right: boolean,
  jump: boolean,
  shift: boolean
};

/**
 * Handler from events from Babylon's input system
 */
export class InputHandler {
  private input: InputStatus;

  constructor(scene: Scene) {

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

  // Get the current input status.
  getInput(): InputStatus {
    return this.input;
  }

  // Handle a keyboard event.
  handleKey(kbInfo: KeyboardInfo) {
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
  handlePointer(pointerInfo: PointerInfo) {
    if (pointerInfo.type === Babylon.PointerEventTypes.POINTERDOWN) {
      // Destroy blocks on left click
      if (pointerInfo.event.inputIndex === Babylon.PointerInput.LeftClick) {
        let target = this.blockTargeter.getTarget();
        if (target != null) {
          const action = new RemoveBlockAction(target[0]);
          actionProcessor.updateLocalAndRemote(action);
        }
      }

      // Place blocks on right click
      else if (pointerInfo.event.inputIndex === Babylon.PointerInput.RightClick) {
        let target = this.blockTargeter.getTarget();
        if (target != null) {
          const offset = FaceVectorConverter.getVectorFromFace(target[1]);
          const coord = target[0].addScalars(offset.x, offset.y, offset.z);
          const action = new AddBlockAction(coord, Block.Stone);
          actionProcessor.updateLocalAndRemote(action);
        }
      }
    }
  }
}