"use client";

import { Transition, TransitionStatus } from 'react-transition-group';
import CloseIcon from '@/components/Icons/CloseIcon/CloseIcon';
import IconButton from '../IconButton/IconButton';
import { useRef } from 'react';

interface ModalProps {
    title?: React.ReactNode
    children?: React.ReactNode
    visible: boolean
    onClose: () => void
    onExited?: () => void
}

const Modal: React.FC<ModalProps> = ({
    title, 
    children,
    visible,
    onClose,
    onExited,
}) => {
    const modalRef = useRef<HTMLDivElement>(null)

    return (
        <Transition nodeRef={modalRef} in={visible} onExited={onExited} timeout={200}> 
            { state => (
                <div 
                    className={`
                        fixed inset-0 z-20 flex items-center justify-center
                        transition-colors duration-200 ease-in-out
                        ${stateType(state) === "enter" ? "bg-black/50" : "bg-black/0 pointer-events-none"}
                    `}
                    onClick={onClose}
                    ref={modalRef}
                >
                    <div 
                        className={`
                            bg-zinc-100 dark:bg-zinc-800 
                            border border-zinc-200 dark:border-zinc-700 rounded-lg
                            shadow-lg mx-4
                            transition-all duration-200 ease-in-out
                            ${stateType(state) === "enter" ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                        `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                {title}
                            </h2>
                            <IconButton onClick={onClose}>
                                <CloseIcon className="w-4 h-4 fill-zinc-600 dark:fill-zinc-400" />
                            </IconButton>
                        </div>
                        <div className="p-4">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </Transition>
    )
}

function stateType(state: TransitionStatus) {
    switch(state) {
        case "entering":
        case "entered":
            return "enter"
        case "exiting":
        case "exited":
        default:
            return "exit"
    }
}

export default Modal
