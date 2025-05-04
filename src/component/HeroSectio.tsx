import React from 'react'

const HeroSectio = () => {
  return (
    <section className="my-16 bg-white text-gray-800 rounded-lg p-6">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">Why Choose Our Fruits?</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        We source directly from local farmers to ensure the freshest produce reaches your doorstep.
      </p>
    </div>
  
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card 1 */}
      <div className="bg-gray-100 rounded-lg p-6 text-center shadow-md">
        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
          </svg>
        </div>
        <h3 className="font-bold text-xl mb-2">100% Organic</h3>
        <p className="text-gray-600">All our fruits are grown without harmful pesticides or chemicals.</p>
      </div>
  
      {/* Card 2 */}
      <div className="bg-gray-100 rounded-lg p-6 text-center shadow-md">
        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <path d="M12 22V8"></path>
            <path d="m5 12 7-4 7 4"></path>
            <path d="M5 16l7-4 7 4"></path>
            <path d="M5 20l7-4 7 4"></path>
          </svg>
        </div>
        <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
        <p className="text-gray-600">We deliver within 24 hours to ensure maximum freshness.</p>
      </div>
  
      {/* Card 3 */}
      <div className="bg-gray-100 rounded-lg p-6 text-center shadow-md">
        <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-bold text-xl mb-2">Quality Guarantee</h3>
        <p className="text-gray-600">Not satisfied? We offer a 100% money-back guarantee.</p>
      </div>
    </div>
  </section>
  
  
  )
}

export default HeroSectio