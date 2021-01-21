import {
    Button,
    createStandaloneToast,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {ClientRoutes} from '../../../../routing/routes';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onPay: (visitId: number) => Promise<boolean>;
    visitId: number;
    price: number;
}
export const FinishTransactionModal: React.FC<Props> = ({isOpen, onClose, onPay, visitId, price}) => {
    const history = useHistory();
    const toast = createStandaloneToast();

    const handleApprove = async () => {
        await onPay(visitId).then((response) => {
            onClose();
            toast({
                title: 'Payment successful.',
                description: `${price} PLN was withdrawn from your account`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            history.push(ClientRoutes.APPOINTMENTS);
        });
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
