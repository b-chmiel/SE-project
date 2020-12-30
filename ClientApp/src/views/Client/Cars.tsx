import { Box } from "@chakra-ui/react";
import React from "react";
import AddCarButton from "../../components/CarCard/AddCar";
import CarCard from "../../components/CarCard/CarCard";

type CarsProps = {
    props: string
}

const Cars: React.FC<CarsProps> = ({props}) => {
    return <Box>
        <AddCarButton></AddCarButton>
        <CarCard
            state={2}
            model="OPEL ASTRA"
            type="SEDAN"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci dapibus ultrices in iaculis nunc sed. Sit amet est placerat in egestas erat imperdiet sed euismod. Rhoncus dolor purus non enim praesent elementum facilisis leo vel."
        ></CarCard>
        <CarCard
            state={1}
            model="VOLKSVAGEN PASSAT"
            type="SEDAN"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci dapibus ultrices in iaculis nunc sed. Sit amet est placerat in egestas erat imperdiet sed euismod. Rhoncus dolor purus non enim praesent elementum facilisis leo vel."
        ></CarCard>
    </Box>
}

export default Cars