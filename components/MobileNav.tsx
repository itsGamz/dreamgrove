'use client'

import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState, useEffect } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { usePathname } from 'next/navigation'
import TableOfContents from './custom/TableOfContents/TableOfContents'
import ErrorBoundary from './custom/ErrorBoundary'

interface Chapter {
  value: string
  depth: number
  url: string
}

const MobileNav = ({ toc }: { toc?: Chapter[] }) => {
  const [navShow, setNavShow] = useState(false)
  const path = usePathname()

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.documentElement.classList.remove('overflow-hidden')
      } else {
        // Prevent scrolling
        document.documentElement.classList.add('overflow-hidden')
      }
      return !status
    })
  }

  // Reset overflow class when component unmounts
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="h-full w-full align-middle lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="dark:hover:text-primary-400 mb-[-2px] h-[31px] w-[31px] text-gray-900 hover:text-primary-500 dark:text-gray-100"
        >
          <path
            fillRule="evenodd"
            d="M2 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 10a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zM2 16a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <ErrorBoundary>
        <Transition appear show={navShow} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 z-30" onClose={onToggleNav}>
            <div className="fixed inset-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>
            </div>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full opacity-0"
                  enterTo="translate-x-0 opacity-95"
                  leave="transition ease-in duration-200 transform"
                  leaveFrom="translate-x-0 opacity-95"
                  leaveTo="translate-x-full opacity-0"
                >
                  <Dialog.Panel className="fixed left-0 top-0 z-10 h-full w-full bg-white opacity-95 duration-300 dark:bg-gray-950 dark:opacity-[0.98]">
                    <nav className="fixed h-full w-full overflow-scroll pt-8 text-left">
                      {headerNavLinks.map((link) => (
                        <div key={link.title} className="px-12 py-4">
                          <Link
                            href={link.href}
                            className="dark:hover:text-primary-400 text-2xl font-bold tracking-widest text-gray-900 hover:text-primary-500 dark:text-gray-100"
                            onClick={onToggleNav}
                          >
                            {link.title}
                          </Link>
                        </div>
                      ))}
                      <div className="pb-8">
                        <TableOfContents chapters={toc || []} inSidebar toggleNav={onToggleNav} />
                      </div>
                    </nav>

                    <div className="flex justify-end pr-2 pt-1">
                      <button
                        className="z-50 mr-8 mt-11 h-8 w-8"
                        aria-label="Toggle Menu"
                        onClick={onToggleNav}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="dark:hover:text-primary-400 text-gray-900 hover:text-primary-500 dark:text-gray-100"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </ErrorBoundary>
    </>
  )
}

export default React.memo(MobileNav)
