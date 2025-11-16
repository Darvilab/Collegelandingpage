import * as React from "react";
import { Calendar } from "lucide-react";
import { motion, useInView } from "framer-motion"; // Note: Corrected import to framer-motion
import { useRef } from "react";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface TimelineMilestone {
    year: string;
    title: string;
    description: string;
    keywords: string;
}

interface JourneyTimelineSectionProps {
    timeline: TimelineMilestone[];
}

export function JourneyTimelineSection({ timeline }: JourneyTimelineSectionProps) {
    const timelineRef = useRef(null);
    const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

    const iconColors = [
        'linear-gradient(to bottom right, #06b6d4, #3b82f6)',
        'linear-gradient(to bottom right, #3b82f6, #6366f1)',
        'linear-gradient(to bottom right, #6366f1, #a855f7)',
        'linear-gradient(to bottom right, #a855f7, #ec4899)',
        'linear-gradient(to bottom right, #ec4899, #f43f5e)'
    ];

    const contentColors = [
        { background: '#f0f9ff', border: '#e0f2fe' },
        { background: '#eff6ff', border: '#dbeafe' },
        { background: '#f5f3ff', border: '#ede9fe' },
        { background: '#faf5ff', border: '#f3e8ff' },
        { background: '#fdf2f8', border: '#fce7f3' }
    ];

    return (
        <section ref={timelineRef} className="py-20 lg:py-32 bg-white">
            <style>{`
                /* Mobile spacing between timeline cards */
                @media (max-width: 1023px) {
                    .vertical-timeline-element {
                        margin-bottom: 3rem !important;
                    }
                }
                
                /* Mobile year text size */
                @media (max-width: 1023px) {
                    .vertical-timeline-element-date {
                        font-size: 1.5rem !important;
                        font-weight: 600 !important;
                    }
                }
            `}</style>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                        <Calendar className="h-4 w-4 text-[#0d4e92]" />
                        <span className="text-[#0d4e92] text-sm font-medium">Our Journey</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl text-gray-900 mb-6 tracking-tight">
                        Journey Timeline
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Two decades of excellence in engineering education and innovation
                    </p>
                </motion.div>

                <VerticalTimeline lineColor="linear-gradient(to bottom, #06b6d4, #ec4899)">
                    {timeline && timeline.length > 0 ? timeline.map((milestone, index) => {
                        const isLeft = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <VerticalTimelineElement
                                    position={isLeft ? 'right' : 'left'}
                                    contentStyle={{
                                        background: contentColors[index % contentColors.length].background,
                                        color: '#333',
                                        border: `2px solid ${contentColors[index % contentColors.length].border}`,
                                        borderRadius: '1rem',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                                        padding: '1.5rem'
                                    }}
                                    contentArrowStyle={{ borderRight: `7px solid ${contentColors[index % contentColors.length].background}` }}
                                    date={milestone.year}
                                    dateClassName="text-gray-600 font-semibold text-xl lg:text-lg lg:!ml-4 lg:!mr-4"
                                    iconStyle={{
                                        background: iconColors[index % iconColors.length],
                                        color: '#fff',
                                        boxShadow: '0 0 0 4px white, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)'
                                    }}
                                    icon={<Calendar className="h-5 w-5" />}
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {milestone.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        {milestone.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {milestone.keywords.split(', ').map((keyword, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
                                            >
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </VerticalTimelineElement>
                            </motion.div>
                        );
                    }) : (
                        <div className="text-center py-12 text-gray-500">
                            Timeline data is loading...
                        </div>
                    )}
                </VerticalTimeline>
            </div>
        </section>
    );
}