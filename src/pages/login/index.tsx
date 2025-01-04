import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import Stack from '@mui/joy/Stack'
import Typography from '@mui/joy/Typography'
import { GoCheck } from 'react-icons/go'

export default function Login() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
      <Stack spacing={2}>
        {(['sm', 'md', 'lg'] as const).map(size => (
          <Button key={size} size={size} startDecorator={<GoCheck />}>
            Button
          </Button>
        ))}
      </Stack>
      <Stack spacing={2}>
        {(['sm', 'md', 'lg'] as const).map(size => (
          <Input key={size} size={size} startDecorator={<GoCheck />} placeholder="Placeholder" />
        ))}
      </Stack>
      <Stack spacing={2}>
        {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
          <Typography key={size} fontSize={size} startDecorator={<GoCheck />}>
            Hello World
          </Typography>
        ))}
      </Stack>
    </Box>
  )
}
