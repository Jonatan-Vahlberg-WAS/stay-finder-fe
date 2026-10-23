"use client";

import { getMe, login, logout, register } from "@/utils/authService";
import { createContext, useState, useEffect, useContext } from "react";
import type { PropsWithChildren } from "react";

type AuthContextState = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void | string>
  register: (email: string, password: string) => Promise<void | string>
  logout: () => Promise<void>
};

const defaultState: AuthContextState = {
  user: null,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve()
};

const AuthContext = createContext<AuthContextState>(defaultState);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<typeof defaultState.user>(null);

  const _login: typeof defaultState.login = async (email, password) => {
    try {
      const authenticated = await login(email, password)
      if (!authenticated) {
        throw "Invalid credentials"
      }
      await _getMe()
      return

    } catch (e) {
      console.warn("error in logging in", e)
      return "invalid Credentials"
    }
  }
  const _register: typeof defaultState.register = async (email, password) => {
    try {
      const created = await register(email, password)
      if (!created) {
        throw "Could not create account"
      }
      await _getMe()
      return
    } catch (e) {
      console.warn("error in register", e)
      return "Could not create new account"
    }
  }
  const _logout: typeof defaultState.logout = async () => {
    try {
      await logout()
    } catch (e) {
      console.warn("error in logging out", e)
    }
    setUser(null) //logout locally if the request faild
  }
  const _getMe = async () => {
    try {
      const user = await getMe()
      if (!user) {
        throw "User not found"
      }
      console.log("user", user)
      setUser(user)
    } catch (e) {
      console.warn("error in getting me", e)
    }
  }

  useEffect(() => {
    _getMe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login: _login,
        register: _register,
        logout: _logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext)
}

export {
  AuthProvider,
  useAuth
}