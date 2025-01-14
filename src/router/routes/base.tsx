import Layout from '~/layout'
import Home from '~/pages/Home'
import { RouteType } from '..'
import { BsMicrosoft } from 'react-icons/bs'

const baseRoutes: Array<RouteType> = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        meta: {
          title: '首页',
          key: 'home',
          requireAuth: true,
          permission: 'admin',
          icon: <BsMicrosoft />
        }
      }
    ]
  }
]

export default baseRoutes
