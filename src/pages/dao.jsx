import React, { useEffect, useState } from 'react'

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
  const [stage, setStage] = useState(0)
  const [userType, setUserType] = useState('user') // user || sp
  const [totalVotes, setTotalVotes] = useState(0)
  const [users, setUsers] = useState([
    {
      address: '0x123123',
      funding: 0,
      votes: 0,
    },
    {
      address: '0xababab',
      funding: 0,
      votes: 0,
    },
  ])

  const [activeUser, setActiveUser] = useState(users[0])

  const [storageProviders, setStorageProviders] = useState([
    {
      address: '0x123123',
      applications: [],
    },
  ])

  /**
   * url: 'github.com/ipfs',
      votes: 0,
      dealId: '',
      pieceCid: '',
      storageDealApproved: false,
   */

  const [repos, setRepos] = useState([
    {
      url: 'github.com/ipfs',
      votes: 0,
    },
    {
      url: 'github.com/other',
      votes: 0,
      pieceCid:
        'baga6ea4seaqd52q2wbgfxr5kgcugapgkub2bojfteouruqbfqgzf3k4e22xbsci',
      dealId: '16184523',
      storageDealApproved: true
    },
  ])

  // const activeUser = users[0]
  const activeStorageProvider = storageProviders[0]

  //   const RenderComponent = Pages[`stage${stage}`][`${userType}`]
  const RenderComponent = Pages[`stage${stage}`][`${userType}`]

  return (
    <>
      <DappContext.Provider
        value={{
          users,
          setUsers,
          activeUser,
          setActiveUser,
          userType,
          setUserType,
          repos,
          setRepos,
          stage,
          setStage,
          totalVotes,
          setTotalVotes,
          activeStorageProvider,
          storageProviders,
          setStorageProviders,
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
