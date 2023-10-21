import { Card as MuiCard, CardMedia } from '@mui/material'
import bgCard from '../../assets/images/bg-card.jpg'
import useGame from '../../hooks/useGame';

const Card = ({ data, index }: { data: IDataCard , index: number}) => {
  const { pickCard } = useGame();
  return (
    <MuiCard sx={{ height: '100%', cursor: 'pointer' }} onClick={() => pickCard(index)}>
      <CardMedia component="img" title="Image" image={(data.isFlipped || data.found)? data.src : bgCard} height={'100%'} />
    </MuiCard>
  )
}

export default Card