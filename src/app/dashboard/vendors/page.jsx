export const metadata = {
  title: "Vendors ",
  description: "View and manage venders information",
};


import VenderComp from '@/components/VendersComp'
import React from 'react'

const VendersPage = () => {
  return (
    <div>
      <VenderComp />
    </div>
  )
}

export default VendersPage