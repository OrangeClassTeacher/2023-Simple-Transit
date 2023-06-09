import { useState } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Context } from '@/utils/Context'
import { userContext } from '@/utils/Context'
import { loginContext } from '@/utils/Context'
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [selectedLocation, setSelectedLocation] = useState<any>([]);
  const [user, setUser] = useState<any>({ name: "", email: "" })
  const [checkLogin, setCheckLogin] = useState<any>(false)
  return (
    <>
      <Context.Provider value={{ selectedLocation, setSelectedLocation }}>
        <userContext.Provider value={{ user, setUser }}>
          <loginContext.Provider value={{ checkLogin, setCheckLogin }}>
            <Component {...pageProps} />
          </loginContext.Provider>

        </userContext.Provider>

      </Context.Provider>


    </>
  )
}
