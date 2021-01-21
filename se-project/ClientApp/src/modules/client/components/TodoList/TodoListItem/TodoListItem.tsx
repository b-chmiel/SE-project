import {DeleteIcon} from '@chakra-ui/icons';
import {Editable, EditableInput, EditablePreview, Flex, IconButton} from '@chakra-ui/react';
import React, {useState} from 'react';
import {EditableControls} from './EditableControls';

interface Props {
    text: string;
    onEdit: (nextValue: string) => void;
    onDelete: () => void;
    isLast: boolean;
}

export const TodoListItem: React.FC<Props> = ({text, onEdit, onDelete, isLast}) => {
    const [value, setValue] = useState<string>(text);

    function handleOnChange(nextValue: string) {
        setValue(nextValue);
    }

    function handleOnSubmit(nextValue: string) {
        onEdit(nextValue);
    }

    function handleOnDelete() {
        onDelete();
    }

    return (
        <>
            <Editable value={value} onChange={handleOnChange} onSubmit={handleOnSubmit}>
                {(props) => (
                    <Flex justify={'space-between'} marginTop={4}>
                        <Flex width={'100%'} borderWidth={'1px'} borderRadius="md" p={1} paddingLeft={4}>
                            <EditablePreview />
                            <EditableInput />
                        </Flex>
                        <Flex p={1} width={24} marginLeft={1}>
                            <EditableControls {...props} />
                            {isLast && (
                                <IconButton
                                    marginLeft={2}
                                    aria-label="Delete item"
                                    size="sm"
                                    icon={<DeleteIcon />}
                                    onClick={handleOnDelete}
                                />
                            )}
                        </Flex>
                    </Flex>
                )}
            </Editable>
        </>
    );
};
