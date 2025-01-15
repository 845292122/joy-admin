import { Box, Button, Typography } from '@mui/joy'
import React from 'react'
import { BsFillMortarboardFill } from 'react-icons/bs'
import { useRouteMeta } from '~/hooks/useRouteMeta'

type PageContainerProps = {
  children: React.ReactNode
  showBtn?: boolean
  btnText?: string
  btnClick?: () => void
}

export default function PageContainer({ children, showBtn = false, btnText = '新增', btnClick }: PageContainerProps) {
  const { title } = useRouteMeta()

  return (
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
          {title}
        </Typography>
        {showBtn && (
          <Button color="primary" startDecorator={<BsFillMortarboardFill />} size="sm" onClick={btnClick}>
            {btnText}
          </Button>
        )}
      </Box>
      {children}
    </Box>
  )
}
