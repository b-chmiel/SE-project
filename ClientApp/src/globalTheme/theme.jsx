import {extendTheme} from "@chakra-ui/react"

export const theme = extendTheme({
    components: {
        Container: {
            variants: {
                "car-card":{
                    border: "2px",
                    borderColor: "#8000FF",
                    padding: "10px",
                    borderRadius: "8px",
                    margin: "20px"
                },
               
            }
        },
        Button: {
            baseStyle: {
                fontWeight: "bold",
                color: "#8000FF"
              },
        }
    }, colors: {
        green: "#0ECC21",
        red: "#EB0000",
        yellow: "#E3992B",
        purple: "#8000FF",
        darkgray: "#454545"
    }
  });