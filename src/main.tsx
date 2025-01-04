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
      <GlobalStyles styles={{}} />
      <BrowserRouter>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </BrowserRouter>
    </CssVarsProvider>
  </StrictMode>
)
