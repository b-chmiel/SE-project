import {Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from '@chakra-ui/react';
import React from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onPay: (visitId: number) => Promise<boolean>;
    visitId: number;
}
export const FinishTransactionModal: React.FC<Props> = ({isOpen, onClose, onPay, visitId}) => {
    const handleApprove = async () => {
        await onPay(visitId);
        await onPay(visitId).then((response) => onClose());
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Payment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Are you sure to finish transaction?</ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => handleApprove()}>
                        Yes
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        No
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
