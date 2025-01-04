import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  IconButtonProps,
  Input,
  Link,
  Stack,
  Typography,
  useColorScheme
} from '@mui/joy'
import React from 'react'
import { BsCupHotFill, BsFillMoonStarsFill, BsFillSunFill, BsGoogle } from 'react-icons/bs'
import loginLightAvif from '~/assets/images/login/login-light.avif'
import loginDarkAvif from '~/assets/images/login/login-dark.avif'

type FormElements = {
  email: HTMLInputElement
  password: HTMLInputElement
  persistent: HTMLInputElement
} & HTMLFormControlsCollection

type SignInFormElement = {
  readonly elements: FormElements
} & HTMLFormElement

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props
  const { mode, setMode } = useColorScheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={event => {
        setMode(mode === 'light' ? 'dark' : 'light')
        onClick?.(event)
      }}
      {...other}
    >
      {mode === 'light' ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
    </IconButton>
  )
}

export default function Login() {
  return (
    <>
      <Box
        sx={theme => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)'
          }
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2
          }}
        >
          <Box component="header" sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BsCupHotFill />
              </IconButton>
              <Typography level="title-lg">后台管理系统</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>

          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden'
              }
            }}
          >
            <Stack sx={{ gap: 4 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography component="h1" level="h3">
                  欢迎使用
                </Typography>
              </Stack>

              <Stack sx={{ gap: 4 }}>
                <form
                  onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                    event.preventDefault()
                    const formElements = event.currentTarget.elements
                    const data = {
                      email: formElements.email.value,
                      password: formElements.password.value,
                      persistent: formElements.persistent.checked
                    }
                    alert(JSON.stringify(data, null, 2))
                  }}
                >
                  <FormControl required>
                    <FormLabel>用户名</FormLabel>
                    <Input type="email" name="email" />
                  </FormControl>
                  <FormControl required>
                    <FormLabel>密 码</FormLabel>
                    <Input type="password" name="password" />
                  </FormControl>
                  <Stack sx={{ gap: 1, mt: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Checkbox size="sm" label="记住密码" name="persistent" />
                      <Link level="title-sm" href="#replace-with-a-link">
                        忘记密码?
                      </Link>
                    </Box>
                    <Button type="submit" fullWidth>
                      登 录
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Stack>

            <Divider
              sx={theme => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#FFF', md: 'text.tertiary' }
                }
              })}
            >
              其他登录方式
            </Divider>

            <Button variant="soft" color="neutral" fullWidth startDecorator={<BsGoogle />}>
              Continue with Google
            </Button>

            <Box component="footer" sx={{ py: 3 }}>
              <Typography level="body-xs" sx={{ textAlign: 'center' }}>
                © Edison.Cheung {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={theme => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition: 'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${loginLightAvif})`,
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage: `url(${loginDarkAvif})`
          }
        })}
      />
    </>
  )
}
