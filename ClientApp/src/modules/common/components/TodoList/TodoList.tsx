import {AddIcon} from '@chakra-ui/icons';
import {Box, Button, Flex, Input} from '@chakra-ui/react';
import React, {useState} from 'react';
import {filterWithIndex} from '../../helpers/filterWithIndex';
import {isIterable} from '../../helpers/isIterable';
import {replaceAtIndex} from '../../helpers/replaceItem';
import {withField} from '../../helpers/withField';
import {TodoListItem} from './TodoListItem/TodoListItem';

interface Props {
    name: string;
    value: string[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}

const TodoListField: React.FC<Props> = ({name, value, setFieldValue}) => {
    const [inputValue, setInputValue] = useState<string>('');

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    function handleAddClick() {
        const input = inputValue.trim();
        if (input === '') return;

        if (isIterable(value)) setFieldValue(name, [...value, input]);
        else setFieldValue(name, [input]);
        setInputValue('');
    }

    function handleTodoEdit(i: number, newValue: string) {
        isIterable(value) ? setFieldValue(name, replaceAtIndex(value, i, newValue)) : setFieldValue(name, [newValue]);
    }

    function handleTodoDelete() {
        if (isIterable(value)) setFieldValue(name, filterWithIndex(value, value.length - 1));
        else setFieldValue(name, []);
    }

    function isLast(index: number) {
        return index === value.length - 1;
    }

    return (
        <Box>
            <Flex>
                <Input placeholder="Add new required action..." value={inputValue} onChange={handleInputChange} />
                <Button leftIcon={<AddIcon />} onClick={handleAddClick} marginLeft={2}>
                    Add
                </Button>
            </Flex>
            {value?.map((todo: string, index: number) => (
                <TodoListItem
                    text={todo}
                    onEdit={(newVal) => handleTodoEdit(index, newVal)}
                    onDelete={() => handleTodoDelete()}
                    key={index}
                    isLast={isLast(index)}
                />
            ))}
        </Box>
    );
};

export const TodoList = withField(TodoListField);
