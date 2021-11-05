import { useCallback, useEffect, useState } from "react";
import "./Modal.css";

export const Modal: React.FC<{ open: boolean; onClose: () => void }> = ({
    children,
    open = false,
    onClose,
}) => {
    const [_open, setOpen] = useState(false);

    useEffect(() => setOpen(open), [open]);

    const onSelfClose = useCallback(() => {
        setOpen(false);
        onClose();
    }, [onClose]);

    // onClickAway ... close the modal
    useEffect(() => {
        window.addEventListener("click", onSelfClose);
        return () => {
            window.removeEventListener("click", onSelfClose);
        };
    }, [onSelfClose]);

    return (
        <div
            className={
                _open ? "modal-container modal-display" : "modal-container"
            }
        >
            <div className="modal-content">
                <div className="close-button" onClick={onSelfClose}>
                    X
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};
