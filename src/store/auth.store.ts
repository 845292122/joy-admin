import { atomWithStorage } from 'jotai/utils'
import { AUTH } from '~/types/auth'

const tokenAtom = atomWithStorage<string | undefined>('token', 'undefined')
const userInfoAtom = atomWithStorage<AUTH.AuthState | undefined>('info', undefined)
const permAtom = atomWithStorage<Array<string>>('permissions', [
  'admin',
  'system',
  'system:account',
  'system:perm',
  'system:operlog'
])

export { tokenAtom, userInfoAtom, permAtom }
