'use client'
import { FaUsers, FaBullseye, FaGlobe, FaMusic } from 'react-icons/fa'
import React from 'react'
import Image from 'next/image'

function About() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Story Section */}
        <div className="flex flex-col md:flex-row items-center mb-12 gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Our Success Story
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Founded with the aim of praising the Lord and preaching the gospel
              through songs to all people, languages, tribes, and kindreds. God
              has been our guide in every step of our lives, and we have a
              reason to praise Him forever. We are commissioned to preach the
              gospel rather than remaining quiet. As Jesus said,{" "}
              <span className="italic">
                "If they keep quiet, the stones will cry out."
              </span>
              <span className='text-red-400 ml-4'>(Luke 19:40)</span>
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/choirstory.png"
              alt="Our Story"
              width={400}
              height={400}
              className="border-r border-green-300 rounded-sm object-cover h-64 w-full md:w-96"
            />
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Who We Are */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:ring-4 hover:ring-blue-500 transition duration-300">
            <FaUsers className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Who We Are
            </h3>
            <p className="text-gray-600">
              Seventh-Day Adventist Church members spreading the word of God via
              Songs.
            </p>
          </div>

          {/* Mission */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:ring-4 hover:ring-green-500 transition duration-300">
            <FaGlobe className="text-4xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Our Mission
            </h3>
            <p className="text-gray-600">
              The mission of the Seventh-Day Adventist Church is to call all
              people to become disciples of Jesus Christ, proclaim the
              everlasting gospel, and prepare the world for Christ's soon
              return.
            </p>
          </div>

          {/* Vision */}
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:ring-4 hover:ring-yellow-500 transition duration-300">
            <FaMusic className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To sing with spirit and understanding as we win the world to
              Christ, touching souls and preparing for the soon return of our
              Lord and Savior.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
