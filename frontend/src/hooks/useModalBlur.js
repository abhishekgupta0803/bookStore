import { useEffect, useState } from 'react';

/**
 * Custom hook to detect when a dialog modal is open/closed
 * and manage blur state for the background
 * @param {string} modalId - The ID of the dialog element
 * @returns {boolean} - Whether the modal is open
 */
export const useModalBlur = (modalId) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Function to check and update modal state
    const checkModalState = () => {
      setIsModalOpen(modal.open);
    };

    // Check initial state
    checkModalState();

    // Use MutationObserver to detect when 'open' attribute changes
    // This catches programmatic changes like showModal() and close()
    const observer = new MutationObserver(() => {
      checkModalState();
    });

    observer.observe(modal, {
      attributes: true,
      attributeFilter: ['open']
    });

    // Also listen for dialog events
    modal.addEventListener('close', checkModalState);
    
    // Poll for changes as a fallback (in case MutationObserver misses something)
    const intervalId = setInterval(checkModalState, 100);

    return () => {
      observer.disconnect();
      modal.removeEventListener('close', checkModalState);
      clearInterval(intervalId);
    };
  }, [modalId]);

  return isModalOpen;
};

