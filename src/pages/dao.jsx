import React, { useState } from 'react'

import { CallToAction } from '@/components/CallToAction'
import { Container } from '@/components/Container'
import { Faqs } from '@/components/Faqs'
import { Footer } from '@/components/Footer'
import Head from 'next/head'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle'
import { Pages } from '@/components/stages'
import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from '@/components/PrimaryFeatures'
import { SPStage0 } from '@/components/stage0/sp'
import { SecondaryFeatures } from '@/components/SecondaryFeatures'
import { Testimonials } from '@/components/Testimonials'
import { UserStage0 } from '@/components/stage0/user'
import backgroundImage from '@/images/background-faqs.jpg'

export const DappContext = React.createContext({})

export default function Home() {
  const [stage, setStage] = useState(2)
  const [userType, setUserType] = useState('sp') // user || sp
  const [users, setUsers] = useState([
    {
      address: '0x123123',
      funding: 0,
      votes: 0,
    },
  ])

  /**
   * url: 'github.com/ipfs',
      votes: 0,
      dealId: '',
      pieceCid: '',
      accepted: false,
   */

  const [repos, setRepos] = useState([
    {
      url: 'github.com/ipfs',
      votes: 0,
    },
  ])

  const activeUser = users[0]

  //   const RenderComponent = Pages[`stage${stage}`][`${userType}`]
  const RenderComponent = Pages[`stage${stage}`][`${userType}`]

  return (
    <>
      <DappContext.Provider
        value={{
          users,
          setUsers,
          activeUser,
          userType,
          setUserType,
          repos,
          setRepos,
          stage, 
          setStage,
        }}
      >
        <Head>
          <title>GlacierDAO - Dapp</title>
          <meta name="description" content="Interact with glacier dao." />
        </Head>
        <Header />
        <main className="bg-slate-50">
          <Image
            className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
            src={backgroundImage}
            alt=""
            width={1558}
            height={946}
            unoptimized
          />
          <Container className="relative">
            {/* <Pages.stage0.user /> */}
            <RenderComponent />
          </Container>
        </main>
        <Footer />
      </DappContext.Provider>
    </>
  )
}
