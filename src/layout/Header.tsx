import { IconButton, Sheet } from '@mui/joy'
import { BsFillMenuButtonWideFill } from 'react-icons/bs'
import { toggleSidebar } from '~/utils'

export default function Header() {
  return (
    <Sheet
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 9995,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        boxShadow: 'sm'
      }}
    >
      <IconButton variant="outlined" color="neutral" size="sm" onClick={() => toggleSidebar()}>
        <BsFillMenuButtonWideFill />
      </IconButton>
    </Sheet>
  )
}
