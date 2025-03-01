import { useState } from "react";

export const useModalStatus = () => {
    const [modal, setModalOpen] = useState(false);

    const open = () => setModalOpen(true);
    const close = () => setModalOpen(false);

    return { modal, open, close };
};