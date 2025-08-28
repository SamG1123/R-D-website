"use client"

import { useState, useEffect } from "react"

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(url: string, options?: RequestInit): ApiState<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))

        const response = await fetch(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...options?.headers,
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setState({ data, loading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : "An error occurred",
        })
      }
    }

    fetchData()
  }, [url])

  return state
}

export function useApiMutation<T, U = any>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const mutate = async (url: string, options?: RequestInit & { data?: U }) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      const response = await fetch(url, {
        method: "POST",
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: options?.data ? JSON.stringify(options.data) : options?.body,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setState({ data, loading: false, error: null })
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred"
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      })
      throw error
    }
  }

  return { ...state, mutate }
}
