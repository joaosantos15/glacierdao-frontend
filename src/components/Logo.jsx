import Image from 'next/image'
import logoEthlisbon from '@/images/logos/glacier-logo1.png'

export function Logo(props) {
  return (
    <h1 className="mx-auto max-w-4xl font-display text-xl font-medium tracking-tight text-slate-900 ">
      <span className="relative whitespace-nowrap text-blue-600">
        GlacierDAO
      </span>
    </h1>
  )
}
