import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Person from '@mui/icons-material/Person'

export default function Login() {
  return (
    <div>
      <div>
        <Stack spacing={2}>
          {(['sm', 'md', 'lg'] as const).map(size => (
            <Button key={size} size={size} startDecorator={<Person />}>
              Button
            </Button>
          ))}
        </Stack>
      </div>
      <div>
        <Button startDecorator={<Person />}>Button</Button>
      </div>
    </div>
  )
}
