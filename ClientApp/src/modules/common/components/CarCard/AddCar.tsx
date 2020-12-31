import { Button, useDisclosure, Modal, ModalOverlay, FormControl, FormLabel, Input, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Select } from "@chakra-ui/react";

import React, { RefObject } from "react";


function AddCarButton() {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const initialRef: RefObject<any> = React.useRef();
    const finalRef: RefObject<any> = React.useRef();

    const [model, setModel] = React.useState('');
    const [type, setType] = React.useState('');

    function onChangeModel(e: React.FormEvent<HTMLInputElement>) {
        setModel(e.currentTarget.value);
    }

    function onChangeType(e: React.ChangeEvent<HTMLSelectElement>) {
        setType(e.currentTarget.value);
    }

    return (
      <>
        <Button float="right" marginRight="20px" onClick={onOpen}>+ Add Car</Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Car</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Model</FormLabel>
                <Input value={model} onChange={onChangeModel} ref={initialRef} placeholder="model" />
              </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>Type</FormLabel>
                <Select onChange={onChangeType} placeholder="Select type">
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Truck">Truck</option>
                <option value="Compact">Compact</option>
              </Select>
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button isDisabled={model===""||type===""} colorScheme="teal" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default AddCarButton;