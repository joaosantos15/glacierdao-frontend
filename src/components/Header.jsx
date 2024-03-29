import { Fragment, useContext } from 'react'
import { Popover, Transition } from '@headlessui/react'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { DappContext } from '@/pages/dao'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'
import clsx from 'clsx'
import { useRouter } from 'next/router'

function MobileNavLink({ href, children }) {
  return (
    <Popover.Button as={Link} href={href} className="block w-full p-2">
      {children}
    </Popover.Button>
  )
}

function MobileNavIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0'
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0'
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <Popover.Button
        className="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 bg-slate-300/50" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            as="div"
            className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5"
          >
            <MobileNavLink href="#features">Features</MobileNavLink>
            <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
            <MobileNavLink href="#pricing">Pricing</MobileNavLink>
            <hr className="m-2 border-slate-300/40" />
            <MobileNavLink href="/login">Sign in</MobileNavLink>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header() {
  const router = useRouter()
  
  const {
    stage,
    setStage,
    userType,
    setUserType,
    activeUser,
    setActiveUser,
    users,
  } = useContext(DappContext)
  return (
    <header className="bg-slate-50 py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="/" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="#features">Explore</NavLink>
              {/* <NavLink href="#testimonials">Learn</NavLink> */}
              {/* <NavLink href="#pricing">Pricing</NavLink> */}
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            {/* <div className="hidden md:block">
              <NavLink href="/login">Sign in</NavLink>
            </div> */}
            {router.pathname === '/dao' ? <><button
              onClick={() => {
                setActiveUser(users[0])
                setUserType('user')
              }}
              className={`${
                userType === 'user' && activeUser.address === users[0].address
                  ? 'font-bold'
                  : undefined
              }`}
            >
              User 1
            </button>
            <button
              onClick={() => {
                setActiveUser(users[1])
                setUserType('user')
              }}
              className={`${
                userType === 'user' && activeUser.address === users[1].address
                  ? 'font-bold'
                  : undefined
              }`}
            >
              User 2
            </button>
            <button
              onClick={() => setUserType('sp')}
              className={`${userType === 'sp' ? 'font-bold' : undefined}`}
            >
              SP
            </button>
            <span>Stage {stage}</span>
            <button onClick={() => stage > 0 && setStage(stage - 1)}>
              Prev stage
            </button>
            <button onClick={() => stage < 5 && setStage(stage + 1)}>
              Next stage
            </button></> : undefined}
            {router.pathname === '/dao' ? (
              <Button href="/" color="blue">
                <span>
                   Exit demo
                </span>
              </Button>
            ) : (
              <Button href="/dao" color="blue">
                <span>
                  <span className="hidden lg:inline">Go to</span> Demo
                </span>
              </Button>
            )}
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
