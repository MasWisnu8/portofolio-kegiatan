import Link from "next/link";
import { getProfileData } from "@/lib/db-static";

async function ContactPage() {
  const profile = await getProfileData();

  return (
    <>
      <section className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact</h1>
          <p className="text-xl text-blue-200 mb-8">Get in touch for collaboration</p>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                {profile.contact_email && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26m0 0l7.89-5.26m-7.89 5.26L3 8zm10.89-3.26l6.18 3.59m0 0l-6.18-3.59m7.89 8.26l-6.18-3.59m0 0l-6.18 3.59" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a href={`mailto:${profile.contact_email}`} className="text-gray-600 hover:text-blue-600">{profile.contact_email}</a>
                    </div>
                  </div>
                )}
                {profile.contact_phone && (
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l2 2m2-8l2 2m0-10l2 2m0-8v10a2 2 0 01-2 2h-8a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <a href={`tel:${profile.contact_phone}`} className="text-gray-600 hover:text-blue-600">{profile.contact_phone}</a>
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">{profile.location || "Bandung, Indonesia"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
              <form className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your email" />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea id="message" rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your message"></textarea>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


export const dynamic = 'force-dynamic';
export default ContactPage;
