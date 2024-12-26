'use client';

import Footer from './_componentsForLandingPage/footer'

import React from 'react'
import Navbar from './_componentsForLandingPage/navbar'
import Link from 'next/link';
import { ArrowRight, BookOpen, Code, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LandingPage = () => {
  return (

    <div className='min-h-full flex flex-col'> {/* flex-col -> stack vertically */}
        <Navbar/>
        <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
        
            {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-6 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-center">
              Welcome to all your coding notes with{' '}
              <span className="underline decoration-primary decoration-4">
                CodeHUB
              </span>
            </h1>
            <p className="text-muted-foreground md:text-xl text-center max-w-[700px]">
              Remember more, Learn Faster
            </p>
            <Link href="/documents" className="mt-8">
              <Button
                className="group relative inline-flex items-center space-x-2 overflow-hidden rounded-full px-8 py-3 transition-all duration-300 hover:bg-primary/90"
                size="lg">
                
                <span>Enter CodeHUB</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
              <div className="flex flex-col items-center space-y-4 text-center max-w-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Organized Notes</h3>
                <p className="text-muted-foreground">
                  Keep your coding notes organized and easily accessible
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center max-w-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Syntax Highlighting</h3>
                <p className="text-muted-foreground">
                  Beautiful code snippets with syntax highlighting
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center max-w-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Fast Search</h3>
                <p className="text-muted-foreground">
                  Find your notes instantly with powerful search
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
            <Footer/>
        </div>
        
    </div>

  )
}

export default LandingPage