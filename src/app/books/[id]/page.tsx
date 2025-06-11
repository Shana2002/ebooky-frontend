"use client"

import { useToast } from '@/hooks/use-toast'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Badge, Building, Calendar, Download, ShoppingCart, Star, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const sampleBooks = [
  {
    id: 1,
    title: "The Digital Revolution",
    author: "Sarah Johnson",
    publisher: "Tech Publications",
    publishDate: "2023-01-15",
    price: 19.99,
    rating: 4.8,
    reviews: 124,
    category: "Technology",
    pages: 320,
    language: "English",
    format: "PDF, EPUB",
    isbn: "978-1234567890",
    description:
      "A comprehensive guide to understanding the digital transformation of our world. This book explores how technology has revolutionized every aspect of our lives, from communication and commerce to education and entertainment. Through detailed analysis and real-world examples, readers will gain insights into the forces driving digital change and learn how to navigate the evolving technological landscape.",
    fullDescription:
      "The Digital Revolution is more than just a book about technology—it's a roadmap for understanding how digital innovation continues to reshape our society. Author Sarah Johnson, a renowned technology analyst with over 15 years of experience in the field, provides readers with both historical context and forward-looking insights into the digital age. The book covers topics including artificial intelligence, blockchain technology, the Internet of Things, and the future of work in a digital economy. Each chapter includes practical examples, case studies, and actionable insights that readers can apply in their personal and professional lives.",
    tableOfContents: [
      "Chapter 1: The Dawn of Digital",
      "Chapter 2: Internet and Connectivity",
      "Chapter 3: Mobile Revolution",
      "Chapter 4: Social Media Impact",
      "Chapter 5: E-commerce Transformation",
      "Chapter 6: Artificial Intelligence",
      "Chapter 7: Future Predictions",
    ],
    cover: "/placeholder.svg?height=400&width=300",
  },
]

const BookDetails = () => {
    const params = useParams()
    const { toast } = useToast()
    const [quantity, setQuantity] = useState(1)

    const bookId = Number.parseInt(params.id as string)
    const book = sampleBooks.find((b) => b.id === bookId) || sampleBooks[0]

    const handleAddToCart = () => {
        // In a real app, this would add to cart state/context
        toast({
        title: "Added to Cart",
        description: `${book.title} has been added to your cart.`,
        })
    }

    const handleBuyNow = () => {
        // In a real app, this would redirect to checkout
        toast({
        title: "Redirecting to Checkout",
        description: "Taking you to the secure checkout page...",
        })
    }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/books">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Book Cover and Purchase */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <img
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-auto rounded-lg mb-6"
                />

                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">${book.price}</div>
                    <div className="flex items-center justify-center mb-4">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">{book.rating}</span>
                      <span className="ml-1 text-gray-600">({book.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={handleBuyNow} className="w-full" size="lg">
                      Buy Now
                    </Button>
                    <Button onClick={handleAddToCart} variant="outline" className="w-full" size="lg">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Instant Download</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Format:</span>
                      <span className="ml-2">{book.format}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Pages:</span>
                      <span className="ml-2">{book.pages}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Language:</span>
                      <span className="ml-2">{book.language}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Basic Info */}
            <div>
              <Badge className="mb-2">{book.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{book.title}</h1>

              <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>by {book.author}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{book.publisher}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Published {new Date(book.publishDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Book</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">{book.description}</p>
                <p className="text-gray-700 leading-relaxed">{book.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Table of Contents */}
            <Card>
              <CardHeader>
                <CardTitle>Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {book.tableOfContents.map((chapter, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <span>{chapter}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Book Details */}
            <Card>
              <CardHeader>
                <CardTitle>Book Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">ISBN:</span>
                    <span className="ml-2">{book.isbn}</span>
                  </div>
                  <div>
                    <span className="font-medium">Pages:</span>
                    <span className="ml-2">{book.pages}</span>
                  </div>
                  <div>
                    <span className="font-medium">Language:</span>
                    <span className="ml-2">{book.language}</span>
                  </div>
                  <div>
                    <span className="font-medium">Format:</span>
                    <span className="ml-2">{book.format}</span>
                  </div>
                  <div>
                    <span className="font-medium">Publisher:</span>
                    <span className="ml-2">{book.publisher}</span>
                  </div>
                  <div>
                    <span className="font-medium">Publication Date:</span>
                    <span className="ml-2">{new Date(book.publishDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails