import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import AuthRouter from './router/helper/authRouter'
import { CssBaseline, CssVarsProvider, extendTheme, GlobalStyles } from '@mui/joy'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider theme={extendTheme({ cssVarPrefix: '' })}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s'
          },
          svg: {
            color: 'var(--Icon-color)',
            margin: 'var(--Icon-margin)',
            fontSize: 'var(--Icon-fontSize, 20px)',
            width: '0.75em',
            height: '0.75em'
          }
        }}
      />
      <BrowserRouter>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </BrowserRouter>
    </CssVarsProvider>
  </StrictMode>
)
