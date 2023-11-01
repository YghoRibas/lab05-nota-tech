import { ModalState } from "src/modules/@shared/providers/modal/modal-provider.types";

export default interface ModalContextDesign extends ModalState {
  enqueueModal(modal: ModalState): void;
  closeModal(): void;
}

export type { ModalContextDesign };