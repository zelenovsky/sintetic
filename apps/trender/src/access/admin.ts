import type { FieldAccess } from 'payload/types'

export const isAdmin: FieldAccess = ({ req: { user } }) => {
  if (user && user.role === 'admin') {
    return true
  }
  return false
}

export const isAdminOrSuperAdmin: FieldAccess = ({ req: { user } }) => {
  if (user && user.role === 'admin' || user && user.role === 'super_admin') {
    return true
  }
  return false
}
