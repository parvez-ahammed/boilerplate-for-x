import {
    Box,
    SimpleGrid
} from '@chakra-ui/react'

import ProblemSolvingStatCard from '../components/cards/ProblemSolvingStat'
import SectionTitle from '../components/title/SectionTitle'
import {getProblemSolvingData} from '../services/problemSolving'

interface ProblemSolvingProps {
    id: string
}

const ProblemSolving = ({ id }: ProblemSolvingProps) => {
    const codeforcesRating : number = getProblemSolvingData('codeforces');
    const codechefRating = getProblemSolvingData('codechef');
    return (
        <Box id={id} maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
 <SectionTitle title='Problem Solving' />
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <ProblemSolvingStatCard
                    title={'Codeforces Max Rating'}
                    stat={codeforcesRating.toString()}
                    imageSrc={'/images/CF_LOGO.png'}
                />
                <ProblemSolvingStatCard title={'CodeChef Max Rating'}
                    stat={codechefRating.toString()}
                    imageSrc={'/images/CC_LOGO.png'}
                />
                <ProblemSolvingStatCard
                    title={'Total Soved on onine judges'}
                    stat={'1600+'}

                    imageSrc={'/images/CP_LOGO.png'}
                />
            </SimpleGrid>
        </Box>
    )
}
export default ProblemSolving;