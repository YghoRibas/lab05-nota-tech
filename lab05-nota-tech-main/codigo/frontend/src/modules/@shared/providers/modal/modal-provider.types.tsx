import React from "react";
import { Action } from "src/modules/@shared/domain/utils/func";

export interface ModalButton {
  content: string;
  color?: string;
  background?: string;
  onClick?: Action<[]>;
}

export interface ModalState {
  title: string;
  icon: React.ReactNode;
  description: string;
  btnAlign?: 'flex-start'|'flex-end'|'center'|'space-between'|'space-around'|'space-evenly'|'initial'|'inherit';
  buttons?: Array<ModalButton>;
  onClose?: Action<[]>;
}

export const initialState: ModalState = {
  title: '',
  icon: <></>,
  description: '',
  btnAlign: 'inherit',
  buttons: []
}