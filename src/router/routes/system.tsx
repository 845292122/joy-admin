import Layout from '~/layout'
import { RouteType } from '..'
import Account from '~/pages/system/Account'
import Perm from '~/pages/system/Perm'
import OperLog from '~/pages/system/OperLog'
import { BsCSquareFill } from 'react-icons/bs'

const systemRoutes: Array<RouteType> = [
  {
    element: <Layout />,
    meta: {
      key: '/system',
      title: '系统管理',
      requireAuth: true,
      permission: 'system',
      icon: <BsCSquareFill />
    },
    children: [
      {
        path: '/system/account',
        element: <Account />,
        meta: {
          title: '账户管理',
          key: 'system:account',
          requireAuth: true,
          permission: 'system:account'
        }
      },
      {
        path: '/system/perm',
        element: <Perm />,
        meta: {
          title: '权限管理',
          key: 'system:perm',
          requireAuth: true,
          permission: 'system:perm'
        }
      },
      {
        path: '/system/operlog',
        element: <OperLog />,
        meta: {
          title: '操作日志',
          key: 'system:operlog',
          requireAuth: true,
          permission: 'system:operlog'
        }
      }
    ]
  }
]

export default systemRoutes
