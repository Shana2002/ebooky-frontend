"use client"
import React, { useEffect, useMemo, useState } from 'react'
import Navbar from "@/components/Navbar";
import { BookOpen, Search, Star, ShoppingCart, Filter } from "lucide-react"
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger } from '@/components/ui/select';
import { SelectContent, SelectItem, SelectValue } from '@radix-ui/react-select';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const page = () => {
    const [books,setBooks] = useState([]);
    const [filterBooks,setFilterBooks] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");
    const [sortBy,setSortBy] = useState("title");
    const [categories,setCategories] = useState([]);
    const [filterCategory,setFilterCategory] = useState("all");

    useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/samplebooks.json");
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    const filtered = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.publishDate.includes(searchTerm);

      const matchesCategory =
        filterCategory === "all" || book.category === filterCategory;

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "date":
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        default:
          return 0;
      }
    });
  }, [books, searchTerm, sortBy, filterCategory]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Browse Books</h1>
        {/* Search and Filters */}
        <div className='bg-white p-6 rounded-lg shadow-sm mb-8'>
          <div className='grid md:grid-cols-4 gap-4'>
            <div className='md:col-span-2'>
              <div className='relative'>
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder='search by title, author , publisher or date....'
                  value={searchTerm}
                  onChange={(e)=> setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
            </div>
            <Select value={filterCategory} onChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title A-Z</SelectItem>
                <SelectItem value="author">Author A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="date">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow bg-white">
              <CardContent className="p-4">
                <img
                  src={book.cover || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 mb-1">by {book.author}</p>
                <p className="text-sm text-gray-500 mb-2">{book.publisher}</p>
                <p className="text-sm text-gray-500 mb-3">
                  Published: {new Date(book.publishDate).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
                  </div>
                  <span className="text-xl font-bold text-blue-600">${book.price}</span>
                </div>
                <Link href={`/books/${book.id}`}>
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12 ">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default page