import {CheckIcon, CloseIcon, EditIcon} from '@chakra-ui/icons';
import {ButtonGroup, Flex, IconButton} from '@chakra-ui/react';
import React from 'react';

export const EditableControls: React.FC<any> = ({isEditing, onSubmit, onCancel, onEdit}) => {
    return isEditing ? (
        <ButtonGroup justifyContent="center" size="sm">
            <IconButton aria-label="Apply correction" icon={<CheckIcon />} onClick={onSubmit} />
            <IconButton aria-label="Discard correction" icon={<CloseIcon />} onClick={onCancel} />
        </ButtonGroup>
    ) : (
        <Flex justifyContent="center">
            <IconButton aria-label="Edit value" size="sm" icon={<EditIcon />} onClick={onEdit} />
        </Flex>
    );
};
