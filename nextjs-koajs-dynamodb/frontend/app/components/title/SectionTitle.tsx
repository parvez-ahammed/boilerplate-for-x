
import { chakra } from '@chakra-ui/react';

interface SectionTitlteProps  {
    title: string;
}

const SectionTitle = ({title} : SectionTitlteProps) => {
    return (
        <chakra.h1 textAlign={'left'} fontSize={'4xl'} py={10} fontWeight={'bold'}>
            {title}
        </chakra.h1>
    );
}

export default SectionTitle;