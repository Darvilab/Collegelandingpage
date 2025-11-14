import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: "What are the admission requirements for NIET?",
      answer: "Applicants must have completed 10+2 or equivalent with Physics, Chemistry, and Mathematics. A minimum aggregate of 50% is required. Students must also pass the NIET entrance examination and interview.",
    },
    {
      question: "What is the fee structure?",
      answer: "The annual tuition fee varies by program. BTech programs range from NPR 350,000 to NPR 450,000 per year. This includes lab fees, library access, and student facilities. Scholarship opportunities are available for meritorious students.",
    },
    {
      question: "What is NIET's placement record?",
      answer: "NIET maintains a 95% placement rate with an average starting package of NPR 600,000 per annum. Our students are recruited by leading companies in Nepal and abroad, including tech giants, healthcare companies, and startups.",
    },
    {
      question: "Are scholarships available?",
      answer: "Yes! NIET offers merit-based scholarships covering up to 100% of tuition fees. We also provide need-based financial aid and special scholarships for women in engineering. Apply early to be considered.",
    },
    {
      question: "What makes NIET unique compared to other engineering colleges?",
      answer: "NIET focuses on three cutting-edge programs: AI, Biomedical, and Computer Engineering. We offer guaranteed internships, industry-aligned curriculum, state-of-the-art labs, and personalized mentorship. Our small class sizes ensure individual attention.",
    },
    {
      question: "Can international students apply to NIET?",
      answer: "Yes, NIET welcomes international students from SAARC and other countries. We provide support with visa processing, accommodation, and cultural integration. International students must meet the same academic requirements and entrance exam criteria.",
    },
  ];

  return (
    <section ref={ref} className="faq-section py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-50 to-pink-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-6">
            <Sparkles className="h-4 w-4 text-[#0b4c78]" />
            <span className="text-[#0b4c78] text-sm">FAQ</span>
          </div>
          <h2 className="text-4xl lg:text-6xl text-gray-900 mb-6 tracking-tight">
            Got Questions?
            <br />
            <span className="bg-gradient-to-r from-[#0b4c78] to-pink-500 bg-clip-text text-transparent">
              We've Got Answers
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about studying at NIET.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl px-8 border border-gray-200 hover:border-[#0b4c78]/30 hover:shadow-lg transition-all overflow-hidden"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="text-lg text-gray-900">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}