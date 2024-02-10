import React from 'react'
import { useAuth } from 'src/hooks/useAuth'

export default function Groups() {
  const { user, userPermissions } = useAuth()

  console.log(user)
  console.log(userPermissions)

  return <div>Groups</div>
}
