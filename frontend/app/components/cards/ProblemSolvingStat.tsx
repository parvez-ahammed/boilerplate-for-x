
import {
    Box,
    Flex,
    Image,
    Stat,
    StatLabel,
    StatNumber,
    useColorModeValue,
} from '@chakra-ui/react'


interface ProblemSolvingStatCardProps {
    title: string
    stat: string
    imageSrc: string

}

function ProblemSolvingStatCard(props: ProblemSolvingStatCardProps) {
    const { title, stat, imageSrc } = props
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}>
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                        {stat}
                    </StatNumber>
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    <Image src={imageSrc} alt='CF LOGO' boxSize='50px'
                        objectFit='fill' />
                </Box>
            </Flex>
        </Stat>
    )
}
export default ProblemSolvingStatCard;