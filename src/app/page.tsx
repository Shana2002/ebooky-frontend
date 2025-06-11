"use client"

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { BookOpen, Link, Search, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function Home() {

  const [books,setBooks] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    const fetchBooks = async() =>{
      const response = await fetch("/samplebooks.json");

      if(response.ok){
        const data= await response.json();
        const firstThree = data.slice(0, 3);
        setBooks(firstThree);
      }
    }

    fetchBooks();
  },[]);
  
  return (
    <div className="min-h-screen">
      {/* Nav Bar */}
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Discover Your Next Great Read</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore thousands of ebooks across all genres. Download instantly and start reading today.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/books">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Browse Books
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose EBookStore?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Advanced Search</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Find books by title, author, publisher, or publication date with our powerful search engine.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Instant Download</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Purchase and download your ebooks instantly. Start reading within seconds of purchase.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Personal Library</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Manage your collection, track your reading history, and get personalized recommendations.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Books</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {books.map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={book.cover || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-2">by {book.author}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">${book.price}</span>
                  </div>
                  <Link href={`/books/${book.id}`}>
                    <Button className="w-full mt-4">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}

          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
    );
    
}
