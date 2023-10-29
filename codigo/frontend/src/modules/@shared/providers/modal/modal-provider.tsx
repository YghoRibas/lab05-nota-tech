import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { ModalContext } from "src/modules/@shared/contexts/modal/modal-context";
import { initialState, ModalState } from "./modal-provider.types";

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -35%)',
  maxHeight: '100vh',
  overflow: 'auto',
  width: '80vw',
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,.2)',
  borderRadius: '.3rem',
  boxShadow: 24,
  p: 1.9,
  textAlign: 'center',
  margin: 'auto'
};

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(initialState);

  const enqueueModal = (modal: ModalState) => {
    setOpen(true);
    setModal(modal);
  }

  const closeModal = () => {
    setOpen(false);

    setModal(modal => {
      modal.onClose && modal.onClose()

      return initialState
    })
  }

  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modal.icon}

          <Typography sx={{ mt: 0.5, fontSize: '12px', fontWeight: 'bold' }}>
            {modal.title}
          </Typography>

          <Typography variant="body2" color="#6c757dc7" sx={{ whiteSpace: 'pre-line' }}>
            {modal.description}
          </Typography>

          <Box sx={{ mt: 1, display: 'flex', justifyContent: modal.btnAlign ?? 'center' }}>
            {(modal.buttons ?? []).map(button => (
              <Button
                key={button.content}
                onClick={button.onClick}
                size="small"
                sx={{
                  fontWeight: 'normal',
                  color: button.color ?? 'inherit',
                  background: button.background ?? 'inherit',
                  fontSize: '12px',
                  mr: 1,
                  borderRadius: 0
                }}>
                {button.content}
              </Button>
            ))}
          </Box>
        </Box>
      </Modal>

      <ModalContext.Provider
        value={{
          ...modal,
          enqueueModal,
          closeModal
        }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
}

export default ModalProvider;