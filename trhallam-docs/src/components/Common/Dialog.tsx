import clsx from 'clsx';
import { useState } from 'react';
import { createPortal } from 'react-dom';

export function Model({ onClose, msg }) {
    return (
        <div className={clsx("model")}>
            <div>{msg}</div>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export function Portal({ model }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {showModal && createPortal(
                { model }
            )}
        </>
    )
}