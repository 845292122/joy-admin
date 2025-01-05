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
        styles={theme => ({
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '0px'
            },
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px'
            }
          },
          svg: {
            color: 'var(--Icon-color)',
            margin: 'var(--Icon-margin)',
            fontSize: 'var(--Icon-fontSize, 20px)',
            width: '0.75em',
            height: '0.75em'
          }
        })}
      />
      <BrowserRouter>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </BrowserRouter>
    </CssVarsProvider>
  </StrictMode>
)
