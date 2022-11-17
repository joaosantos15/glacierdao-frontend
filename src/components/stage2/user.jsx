import { useContext, useState } from 'react'

import { DappContext } from '@/pages/dao'
import Image from 'next/image'
import { PageTitle } from '@/components/PageTitle'
import { Stage2ReposTable } from './Stage2ReposTable'
import backgroundImage from '@/images/background-faqs.jpg'

export const UserStage2 = () => {
  const { users, setUsers, activeUser, repos, setRepos } =
    useContext(DappContext)

  const proofsSubmited = repos.filter((r) => r.dealId !== '').length

  return (
    <>
      <PageTitle
        title="Stage 2 is live"
        subtitle={'SPs are submitting their proofs'}
      />
      <div className=" mx-auto grid  max-w-7xl grid-cols-2 py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
        <div>
          <h3 className=" text-center text-xl capitalize">
            Proofs submitted by SPs
          </h3>
          <h3 className=" mt-4 text-center text-5xl">{proofsSubmited}</h3>
        </div>
        <div>
          <h3 className=" text-center text-xl capitalize">
            Time until acceptance vote
          </h3>
          <h3 className=" mt-4 text-center text-5xl">3 Days</h3>
        </div>
      </div>

      <h3 className=" my-32 text-center text-3xl font-bold ">
        There's nothing to do for now, wait until Stage 3
      </h3>
      {/* <Stage1ReposTable repos={repos}/> */}
    </>
  )
}
