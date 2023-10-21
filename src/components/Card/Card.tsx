import { Card as MuiCard, CardMedia } from '@mui/material'
import bgCard from '../../assets/images/bg-card.jpg'
import useGame from '../../hooks/useGame';

const Card = ({ data }: { data: IDataCard }) => {
  const { pickCard } = useGame();
  return (
    <MuiCard sx={{ height: '100%', cursor: 'pointer' }} onClick={() => pickCard(data)}>
      <CardMedia component="img" title="Image" image={(data.isFlipped || data.found)? data.src : bgCard} height={'100%'} />
    </MuiCard>
  )
}

export default Card