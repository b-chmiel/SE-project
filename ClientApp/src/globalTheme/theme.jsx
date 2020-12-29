import {extendTheme} from "@chakra-ui/react"

export const theme = extendTheme({
    components: {
        Container: {
            variants: {
                "car-card":{
                    border: "2px",
                    borderColor: "#8000FF",
                    padding: "10px",
                    borderRadius: "8px"
                }
            }
        }
    }
  });