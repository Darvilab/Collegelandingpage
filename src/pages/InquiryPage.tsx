import React from 'react';
import { Helmet } from 'react-helmet-async';
import { InquiryForm } from '../components/InquiryForm';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function InquiryPage() {
  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <Helmet>
        <title>Apply Now | NIET - Inquiry Form</title>
        <meta name="description" content="Official inquiry form for admissions at NIET. Start your engineering journey today." />
        <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Helmet>
      
      {/* We reuse the header but without the scroll effects since this is a static form page */}
      <Header />
      
      <main className="pt-24 pb-20">
        <InquiryForm />
      </main>
      
      <Footer />
    </div>
  );
}
