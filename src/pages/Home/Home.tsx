import { Container, CardMedia, Grid } from '@mui/material'
import Navbar from '../../components/Navbar/Navbar'
import Card from '../../components/Card/Card';
import useGame from '../../hooks/useGame';

const Home = () => {
  const { cards } = useGame()

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Grid container spacing={4} marginTop={4} >
          {cards.map((card, index) => {
            return <Grid key={index} item xs={3} height={256}>
              <Card data={card}></Card>
            </Grid>
          }
          )}
        </Grid>
      </Container>
    </>
  )
}

export default Home