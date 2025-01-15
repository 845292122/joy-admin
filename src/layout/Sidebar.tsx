import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  listItemButtonClasses,
  ListItemContent,
  Sheet,
  Typography
} from '@mui/joy'
import { useAtomValue } from 'jotai'
import React, { useState } from 'react'
import { BsBoxArrowRight, BsChevronDown, BsChevronUp, BsEmojiGrin, BsFillNutFill, BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import ColorSchemeToggle from '~/components/ColorSchemeToggle'
import { RouteType, bizRoutes } from '~/router'
import { permAtom } from '~/store'
import { closeSidebar } from '~/utils'

type MenuItem = {
  label: string
  icon: React.ReactNode
  path: string
  children?: { label: string; path: string }[]
}

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children
}: {
  defaultExpanded?: boolean
  children: React.ReactNode
  renderToggle: (params: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => React.ReactNode
}) {
  const [open, setOpen] = React.useState(defaultExpanded)
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden'
          }
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  )
}

// * 侧边菜单
function Menu({ menuItems }: { menuItems: MenuItem[] }) {
  const navigate = useNavigate()

  function navigateTo(path: string) {
    navigate(path)
  }

  return (
    <List
      size="sm"
      sx={{
        gap: 1,
        '--List-nestedInsetStart': '30px',
        '--ListItem-radius': theme => theme.vars.radius.sm
      }}
    >
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.children ? (
            <ListItem nested>
              <Toggler
                renderToggle={({ open, setOpen }) => (
                  <ListItemButton onClick={() => setOpen(!open)}>
                    {item.icon}
                    <ListItemContent>
                      <Typography level="title-sm">{item.label}</Typography>
                    </ListItemContent>
                    {open ? <BsChevronUp /> : <BsChevronDown />}
                  </ListItemButton>
                )}
              >
                <List sx={{ gap: 0.5 }}>
                  {item.children.map((subItem, subIndex) => (
                    <ListItem key={subIndex} sx={{ mt: subIndex === 0 ? 0.5 : 0 }}>
                      <ListItemButton onClick={() => navigateTo(subItem.path)}>{subItem.label}</ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Toggler>
            </ListItem>
          ) : (
            <ListItem>
              <ListItemButton onClick={() => navigateTo(item.path)}>
                {item.icon}
                <ListItemContent>
                  <Typography level="title-sm">{item.label}</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          )}
        </React.Fragment>
      ))}
    </List>
  )
}

export default function Sidebar() {
  const permissions = useAtomValue(permAtom)
  const [menuList, setMenuList] = useState<MenuItem[]>([])

  React.useEffect(() => {
    // TODO 根据权限过滤菜单
    const filterMenusByPermissions = (routes: RouteType[], permissions: string[]): MenuItem[] => {
      return routes.flatMap(route => {
        if (route.children) {
          const filteredChildren = filterMenusByPermissions(route.children, permissions)
          if (filteredChildren.length > 0 && route.meta?.key) {
            return [
              {
                label: route.meta.title,
                icon: route.meta.icon,
                path: route.path ?? '/',
                children: filteredChildren
              }
            ]
          }
          return filteredChildren
        }
        if (route.meta?.permission && permissions.includes(route.meta.permission) && !route.meta.hidden) {
          return [
            {
              path: route.path ?? '/',
              label: route.meta.title,
              icon: route.meta.icon
            }
          ]
        }
        return []
      })
    }

    const filteredMenuList = filterMenusByPermissions(bizRoutes, permissions)
    setMenuList(filteredMenuList)
  }, [permissions])

  return (
    <Sheet
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none'
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)'
          }
        }}
        onClick={() => closeSidebar()}
      />

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BsEmojiGrin />
        </IconButton>
        <Typography level="title-lg">Admin Saas</Typography>
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>

      <Input size="sm" startDecorator={<BsSearch />} placeholder="Search" />

      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5
          }
        }}
      >
        <Menu menuItems={menuList} />

        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': theme => theme.vars.radius.sm,
            '--List-gap': '8px'
          }}
        >
          {/* <ListItem>
            <ListItemButton>
              <BsMessenger />
              Support
            </ListItemButton>
          </ListItem> */}
          <ListItem>
            <ListItemButton>
              <BsFillNutFill />
              系统设置
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Divider />

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          variant="outlined"
          size="sm"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
        />

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">Siriwat K.</Typography>
          <Typography level="body-xs">siriwatk@test.com</Typography>
        </Box>

        <IconButton size="sm" variant="plain" color="neutral">
          <BsBoxArrowRight />
        </IconButton>
      </Box>
    </Sheet>
  )
}
