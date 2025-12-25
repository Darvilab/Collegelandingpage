import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { MapPin, Clock, ExternalLink, Phone, Mail } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ContactPage() {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  const contact = {
    addressLine: "Lalitpur-1, Kupondole",
    landmark: "Infront of Lalitpur Municipality Ward no 1 office building",
    phones: ["01-5911894", "01-5911895"],
    email: "info@biomedical.edu.np",
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Contact & Location | NIET - National Institute of Engineering and Technology</title>
        <meta
          name="description"
          content="Contact NIET (National Institute of Engineering and Technology). Find our location on Google Maps and view operating hours (Sunday–Friday, 7:00 AM–5:00 PM)."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Contact & Location | NIET" />
        <meta
          property="og:description"
          content="Find NIET on Google Maps and view operating hours (Sunday–Friday, 7:00 AM–5:00 PM)."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 pt-20 lg:pt-24">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/groupphoto.jpg"
            alt="NIET Campus"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-500/30 rounded-full blur-[120px] animate-pulse"></div>
          <div
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <MapPin className="h-4 w-4 text-cyan-400" />
              <span className="text-white text-sm">Contact & Location</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-[1.1] tracking-tight">
              Visit NIET
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Find Us Easily
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
              We’re open Sunday–Friday, <span className="font-semibold text-white">7:00 AM – 5:00 PM</span>.
            </p>
          </div>

          {/* Above-the-fold details */}
          <div className="mt-8 max-w-5xl mx-auto">
            <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-3">
                <div className="p-6 sm:p-7 md:p-8 md:col-span-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 rounded-xl bg-white/10 border border-white/15">
                      <MapPin className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white/80">Address</div>
                      <div className="mt-1 text-lg font-bold text-white">{contact.addressLine}</div>
                      <div className="mt-1 text-sm text-blue-100/90 leading-relaxed">{contact.landmark}</div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=National%20Institute%20of%20Engineering%20and%20Technology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button className="rounded-full bg-white text-[#0d4e92] hover:bg-blue-50">
                        Open in Google Maps
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                    <div className="text-xs text-white/70">
                      Tip: Tap the phone numbers below to call directly.
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7 md:p-8 border-t border-white/15 md:border-t-0 md:border-l border-white/15">
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
                        <Phone className="h-4 w-4 text-cyan-300" />
                        Phone
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {contact.phones.map((p) => (
                          <a
                            key={p}
                            href={`tel:${p.replace(/[^0-9]/g, "")}`}
                            className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
                          >
                            {p}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
                        <Mail className="h-4 w-4 text-cyan-300" />
                        Email
                      </div>
                      <a
                        href={`mailto:${contact.email}`}
                        className="mt-2 inline-flex items-center rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/15 transition-colors break-all"
                      >
                        {contact.email}
                      </a>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
                        <Clock className="h-4 w-4 text-cyan-300" />
                        Hours
                      </div>
                      <div className="mt-1 text-sm text-blue-100/90">
                        Sunday–Friday • <span className="font-semibold text-white">7:00 AM – 5:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="bg-white">
        <section className="py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
              <div className="space-y-6">
                {/* Contact Details */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 shadow-md shadow-orange-500/20">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-gray-900">Contact Details</h2>
                      <p className="text-sm text-gray-500 mt-1">Address, phones & email</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <div className="text-sm font-semibold text-gray-700">Address</div>
                      <div className="mt-1 text-gray-900">{contact.addressLine}</div>
                      <div className="mt-1 text-sm text-gray-600">{contact.landmark}</div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Phone className="h-4 w-4 text-cyan-600" />
                        Phone
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {contact.phones.map((p) => (
                          <a
                            key={p}
                            href={`tel:${p.replace(/[^0-9]/g, "")}`}
                            className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-[#0d4e92] hover:bg-cyan-100 transition-colors"
                          >
                            {p}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    <div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Mail className="h-4 w-4 text-purple-600" />
                        Email
                      </div>
                      <a
                        href={`mailto:${contact.email}`}
                        className="mt-2 inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-sm font-semibold text-purple-800 hover:bg-purple-100 transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md shadow-cyan-500/20">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-gray-900">Operating Hours</h2>
                      <p className="text-sm text-gray-500 mt-1">Sunday – Friday</p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 p-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-sm font-semibold text-gray-700">Open</span>
                      <span className="text-lg font-bold text-[#0d4e92]">7:00 AM</span>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between gap-4">
                      <span className="text-sm font-semibold text-gray-700">Close</span>
                      <span className="text-lg font-bold text-[#0d4e92]">5:00 PM</span>
                    </div>
                  </div>

                  <div className="mt-6 text-sm text-gray-600 leading-relaxed">
                    For visits outside operating hours, please contact the administration in advance.
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden">
                <div className="p-8 lg:p-10 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl text-gray-900">Location</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      National Institute of Engineering and Technology • {contact.addressLine}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{contact.landmark}</p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=National%20Institute%20of%20Engineering%20and%20Technology"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <Button className="rounded-full">
                      Open in Google Maps
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>

                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 aspect-[4/3] md:aspect-[16/9]">
                    <iframe
                      title="NIET Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.882314390307!2d85.31251689999999!3d27.690031999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb196dbb40549f%3A0x3f9d741f06ffa32b!2sNational%20Institute%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2snp!4v1766630261879!5m2!1sen!2snp"
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


