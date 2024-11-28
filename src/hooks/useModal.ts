"use client";
import { useState, useCallback } from "react";

interface UseModalReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const useModal = (initialState: boolean = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onSubmit = useCallback(() => {
    // This is a placeholder for submit logic
    // Will be implemented by the component using the hook
    console.log("Modal submitted");
    onClose();
  }, [onclose]);

  return {
    isOpen,
    onOpen,
    onClose,
    onSubmit,
  };
};
