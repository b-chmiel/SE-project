import {Box, Button, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from '@chakra-ui/react';
import React from 'react';
import {VisitStatus} from '../../api/visitAPI.types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    currentStatus: VisitStatus;
    onStatusChange: (status: VisitStatus) => Promise<boolean | undefined>;
}

export const ChangeStatusModal: React.FC<Props> = ({isOpen, onClose, currentStatus, onStatusChange}) => {
    const isButtonDisabled = (buttonStatus: VisitStatus) => buttonStatus === currentStatus;

    const handleStatusChange = async (newStatus: VisitStatus) => {
        await onStatusChange(newStatus);
        await onStatusChange(newStatus).then((response) => {
            onClose();
        });
    };
    //TODO ATSERVICE is switched with CHECKEDIN dunno why api is not working properly
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Change status</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Button
                            mr={2}
                            isDisabled={isButtonDisabled(VisitStatus.ATSERVICE)}
                            onClick={() => handleStatusChange(VisitStatus.CHECKEDIN)}
                        >
                            {VisitStatus.ATSERVICE}
                        </Button>
                        <Button
                            mr={2}
                            isDisabled={isButtonDisabled(VisitStatus.CHECKEDIN)}
                            onClick={() => handleStatusChange(VisitStatus.ATSERVICE)}
                        >
                            {VisitStatus.CHECKEDIN}
                        </Button>
                        <Button
                            isDisabled={isButtonDisabled(VisitStatus.REPAIRED)}
                            onClick={() => handleStatusChange(VisitStatus.REPAIRED)}
                        >
                            {VisitStatus.REPAIRED}
                        </Button>
                    </Box>
                    <Center marginTop={8}>
                        <Button onClick={onClose}>Close</Button>
                    </Center>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
