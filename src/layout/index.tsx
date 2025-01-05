import { Box, Button, Typography } from '@mui/joy'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { BsFillMortarboardFill } from 'react-icons/bs'

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header />
      <Sidebar />
      <Box
        sx={{
          px: { xs: 2, md: 3 },
          pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
            mb: 1,
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}
        >
          <Typography level="h2" component="h1">
            Orders
          </Typography>
          <Button color="primary" startDecorator={<BsFillMortarboardFill />} size="sm">
            Download PDF
          </Button>
        </Box>

        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
