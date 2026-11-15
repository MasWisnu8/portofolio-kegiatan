import Link from "next/link";
import { getProfileData } from "@/lib/db-static";

async function AboutPage() {
  const profile = getProfileData();

  return (
    <>
      <section className="bg-gradient-to-br from-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-blue-200 mb-8">Learn about my experience and skills</p>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </section>
    </>
  );
}

export default AboutPage;
