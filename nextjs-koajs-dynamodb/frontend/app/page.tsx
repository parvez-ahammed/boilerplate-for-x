'use client'
import {
  Container
} from '@chakra-ui/react';
import ProblemSolving from './pages/problemSolving';
import About from './pages/about';

export default function Home() {

  return (
    <Container maxW={'8xl'} maxH={'12xl'}>
      <About id={'about-section'}></About>
      <ProblemSolving id={'probemsolving-section'}></ProblemSolving>
    </Container>

  );
}
