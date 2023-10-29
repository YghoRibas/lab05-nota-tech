import { createContext } from "react";
import { initialState, ModalState } from "src/modules/@shared/providers/modal/modal-provider.types";
import type { ModalContextDesign } from "./modal-context.types";

export const ModalContext = createContext<ModalContextDesign>({
  ...initialState,
  enqueueModal: (_: ModalState) => {},
  closeModal: () => {}
});

export default ModalContextDesign;