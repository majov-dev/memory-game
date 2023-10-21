import { Card as MuiCard, CardMedia } from '@mui/material'
import bgCard from '../../assets/images/bg-card.jpg'
import { useState } from 'react';
import useGame from '../../hooks/useGame';

const Card = ({ data }: { data: IDataCard }) => {
  const { pickCard } = useGame();
  return (
    <MuiCard sx={{ height: '100%', cursor: 'pointer' }} onClick={() => pickCard(data)}>
      {!(data.found || data.show) && <CardMedia component="img" title="Image" image={bgCard} height={'100%'} loading='eager' />}
      <CardMedia component="img" title="Image" image={data.src} height={'100%'} />
    </MuiCard>
  )
}

export default Card