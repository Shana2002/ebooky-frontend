import React from 'react'
import { BookOpen, Search, ShoppingCart, Star, Users } from "lucide-react"
import Link from 'next/link'
import { Button } from './ui/button'

const navbar = () => {
  return (
    <nav className='border-b bg-white'>
        <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
            <Link href="/" className='flex items-center space-x-2'>
                <BookOpen className='h-8 w-8 text-blue-600'/>
                <span className='text-2xl font-semibold text-gray-900'>EBookStore</span>
            </Link>
            <div className='flex items-center space-x-4'>
                <Link href="/books">
              <Button variant="ghost">Browse Books</Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon">avn
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
            </div>
        </div>
    </nav>
  )
}

export default navbar