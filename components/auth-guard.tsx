"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "Admin" | "Driver"
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && user && requiredRole) {
      const { getRoleNameById } = require("@/lib/db-utils")
      const userRole = getRoleNameById(user.roleId)
      if (userRole !== requiredRole) {
        router.push("/")
      }
    }
  }, [user, isLoading, requiredRole, router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return null
  }

  if (requiredRole) {
    const { getRoleNameById } = require("@/lib/db-utils")
    const userRole = getRoleNameById(user.roleId)
    if (userRole !== requiredRole) {
      return null
    }
  }

  return <>{children}</>
}
