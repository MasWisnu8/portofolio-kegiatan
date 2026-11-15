import Link from "next/link";
import ImageFallback from "@/components/ImageFallback";
import { getProfileData, getActivitiesData } from "@/lib/db-static";

async function HomePage() {
  const profile = getProfileData();
  const activities = await getActivitiesData();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center overflow-hidden">
                <ImageFallback
                  src={profile.photo_url || "/uploads/default-avatar.png"}
                  alt={profile.name || "Profile"}
                  fallbackSrc="/uploads/default-avatar.png"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                {profile.name || "Wisnu Pandu Hidayat"}
              </h1>
              <p className="text-2xl sm:text-3xl text-blue-200 mb-4">
                {profile.title || "Production Professional"}
              </p>
              <p className="text-lg mb-6 max-w-2xl">
                {profile.subtitle || "Production Manager with 8+ Years Experience"}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {profile.contact_email && (
                  <Link href={`mailto:${profile.contact_email}`} className="bg-white text-blue-800 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26m0 0l7.89-5.26m-7.89 5.26L3 8zm10.89-3.26l6.18 3.59m0 0l-6.18-3.59m7.89 8.26l-6.18-3.59m0 0l-6.18 3.59" />
                      </svg>
                      Email
                    </span>
                  </Link>
                )}
                {profile.website && (
                  <Link href={profile.website} target="_blank" className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-400 transition">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.5-1.5m9.728-9.728a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.5 1.5" />
                      </svg>
                      LinkedIn
                    </span>
                  </Link>
                )}
                <Link href="/about" className="bg-white/10 text-white px-6 py-3 rounded-md font-medium hover:bg-white/20 transition">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    About
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      {(profile.contact_email || profile.location || profile.website) ? (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profile.contact_email && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26m0 0l7.89-5.26m-7.89 5.26L3 8zm10.89-3.26l6.18 3.59m0 0l-6.18-3.59m7.89 8.26l-6.18-3.59m0 0l-6.18 3.59" />
                    </svg>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{profile.contact_email}</p>
                </div>
              )}
              {profile.location && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{profile.location}</p>
                </div>
              )}
              {profile.website && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.5-1.5m9.728-9.728a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.5 1.5" />
                    </svg>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{profile.website}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* Main Portfolio Content */}
      <main className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Professional Portfolio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {profile.bio || "Production professional with over 8 years of experience in the food manufacturing industry specializing in Production Management, PPIC, Warehouse Operations, Supply Chain Coordination, Inventory Management, Process Improvement, and Manufacturing Excellence."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link href="#about" className="group bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">About Me</h3>
              <p className="text-sm text-gray-500">Learn about my experience and skills</p>
            </Link>
            <Link href="/activities" className="group bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
              <p className="text-sm text-gray-500">{activities.length} activities listed</p>
            </Link>
            <Link href="/contact" className="group bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26m0 0l7.89-5.26m-7.89 5.26L3 8zm10.89-3.26l6.18 3.59m0 0l-6.18-3.59m7.89 8.26l-6.18-3.59m0 0l-6.18 3.59" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-2m0 0l-3 3m3-3l3 3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
              <p className="text-sm text-gray-500">Get in touch for collaboration</p>
            </Link>
          </div>

          <div id="about" className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About Me</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Summary</h3>
                <p className="text-gray-700 leading-relaxed">
                  {profile.bio || "Production professional with over 8 years of experience in the food manufacturing industry specializing in Production Management, PPIC, Warehouse Operations, Supply Chain Coordination, Inventory Management, Process Improvement, and Manufacturing Excellence."}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Experienced in leading cross-functional teams to improve production efficiency, optimize manpower utilization, reduce operational costs, and maintain product quality in compliance with GMP, HACCP, Food Safety, and company SOPs. Strong analytical and leadership capabilities with proven experience managing production planning, raw material control, production scheduling, factory expansion projects, utility monitoring, and continuous improvement initiatives.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Core Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {["Production Management", "CAPA", "Training & Coaching", "Production Planning", "OEE Improvement", "SOP Development", "Production Control", "Capacity Planning", "Performance Management", "Lean Manufacturing", "Warehouse Management", "Risk Management", "Kaizen", "Labor Cost Productivity", "GMP", "Root Cause Analysis", "Utility Monitoring", "HACCP", "ISO 22000", "Production KPI", "Food Safety"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Bachelor of Informatics Engineering</h3>
              <p className="text-gray-600">Muhammadiyah University Tangerang</p>
              <p className="text-gray-500 text-sm">GPA: 3.44</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Experience</h2>
            
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-3">
                <h3 className="text-lg font-bold text-gray-900">PT. Chocomory Cokelat Persada</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Senior Production Supervisor</span>
              </div>
              <p className="text-gray-600">July 2023 – Present</p>
              <p className="text-gray-700 mt-2">
                Responsible for managing end-to-end manufacturing operations covering Production, PPIC Support, Warehouse Support, Production Planning, Inventory Management, and Continuous Improvement.
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li><strong>In Line Production:</strong> Lead daily production operations to achieve safety, quality, delivery, productivity, and cost targets. Coordinate manpower allocation, machine utilization, and production capacity to maximize operational efficiency. Monitor production performance through KPI dashboards and implement corrective actions to minimize downtime and losses. Drive continuous improvement initiatives to reduce rejects, improve yield, and stabilize product quality. Develop and maintain SOPs to ensure standardized production processes. Support new production line development and factory expansion projects. Create weekly, monthly, and annual reports and evaluate production results. Fulfilling the FPP sales requests with 100% production output.</li>
                <li><strong>In Line PPIC & Supply Planning:</strong> Prepare annual production plans aligned with Sales & Marketing forecasts. Develop weekly, monthly, and annual production plans based on sales forecasts and customer demand. Calculate monthly and daily raw material requirements using production planning. Monitor inventory levels to avoid stock shortages and excess inventory. Coordinate purchasing schedules with Procurement to ensure raw material availability. Review production capacity and recommend scheduling adjustments.</li>
                <li><strong>In Line Warehouse & Inventory:</strong> Monitor daily inventory accuracy through stock opname activities. Ensure FIFO and FEFO implementation. Control shelf life and material movement. Optimize warehouse layout for improved material flow. Coordinate finished goods availability to meet customer demand. Maintain delivery service levels above company targets.</li>
                <li><strong>Continuous Improvement Achievements:</strong> Reduced production rejects through process optimization. Improved production stability by optimizing mold sizing parameters. Enhanced inventory planning accuracy through demand forecasting. Supported factory construction and equipment installation projects. Improved cross-functional communication between Production, Purchasing, Marketing, and Warehouse.</li>
              </ul>
            </div>

            <div className="mb-8 border-t border-gray-200 pt-8">
              <div className="flex items-center space-x-4 mb-3">
                <h3 className="text-lg font-bold text-gray-900">PT. Kobe Boga Utama</h3>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Formulation Centre</span>
              </div>
              <p className="text-gray-600">October 2017 – February 2023</p>
              <p className="text-gray-700 mt-2">
                Managed raw material planning and formulation preparation to support uninterrupted production. Prepared weekly and monthly material consumption reports. Controlled inventory availability and procurement planning. Developed formulation schedules integrated with PPIC planning. Supported production continuity through preventive material planning. Coordinated closely with QA, Production, Purchasing, and Warehouse. Applied FEFO principles and monitored material quality.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Quantitative Achievement</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm text-gray-600">Reduce the reject rate by 0.5% from 1%</p>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm text-gray-600">Increasing production output by 15%</p>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm text-gray-600">Reduce the overtime by 1.5%</p>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm text-gray-600">Increasing OEE from 65% to 85%</p>
                </div>
                <div className="bg-gray-50 rounded p-3">
                  <p className="text-sm text-gray-600">Saving 3% on Production costs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="font-bold text-lg">{profile.name || "Wisnu Pandu Hidayat"}</p>
              <p className="text-gray-400 text-sm">Production Professional | Bandung, Indonesia</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                {profile.contact_email && <a href={`mailto:${profile.contact_email}`} className="hover:text-white">{profile.contact_email}</a>}
                {profile.contact_phone && <span className="mx-2">|</span>}
                {profile.contact_phone && <a href={`tel:${profile.contact_phone}`} className="hover:text-white">{profile.contact_phone}</a>}
              </p>
              <p className="text-gray-400 text-sm">
                <a href={`https://${profile.website}`} target="_blank" className="hover:text-white">{profile.website}</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
