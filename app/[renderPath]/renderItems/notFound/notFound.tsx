import { Flex, H4, Text } from "lumia-ui";

const NotFound = () =>{
    return (
        <Flex direction='column'>
            <H4>404 : Renderer Not Found</H4>
            <Text>The page you are looking for does't have a default renderer.</Text>
        </Flex>
    )
}

export default NotFound;