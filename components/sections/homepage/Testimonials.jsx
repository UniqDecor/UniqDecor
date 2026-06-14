"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const ROW1_REVIEWS = [
  {
    avatar: "RO",
    name: "Rajesh Oswal",
    company: "Oswal Industries, Jaipur",
    tag: "Office Furniture",
    text: "The office seating and workstations from UNIQ transformed our corporate space. Extremely high-quality ergonomic setups and delivery was well within our tight schedule.",
  },
  {
    avatar: "VS",
    name: "Vikram Singh",
    company: "Lakeview Resort, Udaipur",
    tag: "Hotel Linen & Fabrics",
    text: "Hotel linen and boutique room furniture selection is outstanding. Our guests constantly praise the luxury bedding and curtains. Uniq Decor is our premier vendor.",
  },
  {
    avatar: "Dr",
    name: "Dr. Anjali Mehta",
    company: "Apex Hospitals, Udaipur",
    tag: "Medical Furniture",
    text: "Procuring specialized hospital furniture was highly streamlined. The Geeken medical chairs and recovery beds meet international durability standards perfectly.",
  },
  {
    avatar: "NS",
    name: "Nisha Sharma",
    company: "Luxury Homeowner, Udaipur",
    tag: "Premium Fabrics",
    text: "D'Decor custom curtains and upholstery fabrics purchased at UNIQ gave our private villa a luxurious editorial finish. Their range of fabrics is unrivaled in Rajasthan.",
  },
];

const ROW2_REVIEWS = [
  {
    avatar: "SS",
    name: "Sandeep Singhal",
    company: "Singhal Developers, Udaipur",
    tag: "Bulk Project Order",
    text: "The professional support from Uniq Decor team is outstanding. They stayed fully committed to coordinating delivery and assembly for our housing township project.",
  },
  {
    avatar: "KP",
    name: "Kuldeep Patidar",
    company: "Patidar Hotels & Resorts, Goa",
    tag: "Hospitality Supplies",
    text: "Outstanding partner for our resort chain in Rajasthan. From lobby seating arrangements to bedroom linen supplies, they maintain international hospitality quality standards.",
  },
  {
    avatar: "AM",
    name: "Aditya Mundra",
    company: "Lakeside Villa Owner, Udaipur",
    tag: "Residential Bedding",
    text: "Fitted out our lakeside ancestral home with luxurious D'Decor sofa covers and Roserro hotel-grade bedsheets. The touch, fabric weave, and color retention are world-class.",
  },
  {
    avatar: "RK",
    name: "Rajeev Kothari",
    company: "Transit House GM, Udaipur",
    tag: "Hospitality Supplies",
    text: "We chose LaxRee institutional supplies for our 120-room corporate transit house. The packaging, delivery, and professional installation were executed with utmost care.",
  },
];

export default function Testimonials() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".google-trust-badge-v7", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });

    gsap.from(".marquee-wrapper-v7", {
      scrollTrigger: {
        trigger: ".marquee-wrapper-v7",
        start: "top 85%",
        once: true,
      },
      opacity: 0,
      y: 35,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from(".testimonials-cta-v7", {
      scrollTrigger: {
        trigger: ".testimonials-cta-v7",
        start: "top 90%",
        once: true,
      },
      y: 25,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="uniq-testimonials-v7 py-[7rem] bg-[#FAF9F6] relative overflow-hidden" id="testimonials" aria-labelledby="testimonial-heading-v7">
      <style dangerouslySetInnerHTML={{__html: `
        .uniq-testimonials-v7::before {
          content: '';
          position: absolute;
          top: -10%;
          right: -5%;
          width: 45vw;
          height: 45vw;
          background: radial-gradient(circle, rgba(201, 162, 39, 0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .uniq-testimonials-v7::after {
          content: '';
          position: absolute;
          bottom: -10%;
          left: -5%;
          width: 45vw;
          height: 45vw;
          background: radial-gradient(circle, rgba(27, 67, 50, 0.03) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .uniq-testimonials-v7 > * {
          position: relative;
          z-index: 1;
        }

        .testimonials-header-v7 {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 3rem;
          padding: 0 5%;
        }

        .google-trust-badge-v7 {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          padding: 10px 24px;
          background: #FFFFFF;
          border: 1px solid rgba(201, 162, 39, 0.18);
          border-radius: 50px;
          box-shadow: 0 4px 15px rgba(27, 67, 50, 0.03);
          margin: 0.5rem auto 0;
        }

        .google-stars-v7 {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .google-stars-v7 svg {
          width: 16px;
          height: 16px;
        }

        .google-stars-v7 svg.filled {
          fill: #C9A227;
        }

        .google-rating-text-v7 {
          font-size: 0.85rem;
          color: #4A4A4A;
        }

        .google-rating-text-v7 strong {
          color: #1A1A1A;
          font-weight: 700;
        }

        .marquee-wrapper-v7 {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 2rem 0;
        }

        .marquee-wrapper-v7::before,
        .marquee-wrapper-v7::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 15vw;
          z-index: 5;
          pointer-events: none;
        }

        .marquee-wrapper-v7::before {
          left: 0;
          background: linear-gradient(to right, #FAF9F6 0%, transparent 100%);
        }

        .marquee-wrapper-v7::after {
          right: 0;
          background: linear-gradient(to left, #FAF9F6 0%, transparent 100%);
        }

        .marquee-track-v7 {
          display: flex;
          width: max-content;
          gap: 2rem;
          will-change: transform;
        }

        .track-row-1-v7 {
          animation: marqueeLeft 45s linear infinite;
        }

        .track-row-2-v7 {
          animation: marqueeRight 45s linear infinite;
          padding-left: 210px;
        }

        .marquee-wrapper-v7:hover .marquee-track-v7 {
          animation-play-state: paused;
        }

        .testimonial-card-v7 {
          width: 420px;
          flex-shrink: 0;
          background: #FFFFFF;
          border: 1px solid rgba(27, 67, 50, 0.05);
          border-radius: 24px;
          padding: 2.5rem 2.2rem;
          box-shadow: 0 10px 30px rgba(27, 67, 50, 0.04);
          transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
                      box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
                      border-color 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .testimonial-card-v7:hover {
          border-color: rgba(201, 162, 39, 0.18);
          box-shadow: 0 25px 55px rgba(27, 67, 50, 0.12);
          transform: translateY(-8px) scale(1.02);
        }

        .card-quote-watermark-v7 {
          position: absolute;
          top: 1.2rem;
          right: 1.5rem;
          font-family: var(--font-serif);
          font-size: 5rem;
          color: #1B4332;
          opacity: 0.05;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .card-top-v7 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.2rem;
        }

        .verified-badge-v7 {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          background: rgba(37, 211, 102, 0.08);
          border: 1px solid rgba(37, 211, 102, 0.15);
          color: #1da851;
          border-radius: 50px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .verified-badge-v7 svg {
          width: 10px;
          height: 10px;
          fill: currentColor;
        }

        .stars-v7 {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .stars-v7 svg {
          width: 14px;
          height: 14px;
          fill: #C9A227;
        }

        .testimonial-text-v7 {
          font-size: 0.92rem;
          color: #4A4A4A;
          line-height: 1.65;
          margin-bottom: 1.8rem;
          font-style: italic;
          flex-grow: 1;
        }

        .testimonial-author-v7 {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(27, 67, 50, 0.06);
        }

        .author-avatar-v7 {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1B4332 0%, #3a7559 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: 0.02em;
          flex-shrink: 0;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 10px rgba(27, 67, 50, 0.1);
        }

        .testimonial-card-v7:nth-child(even) .author-avatar-v7 {
          background: linear-gradient(135deg, #0d3b66 0%, #457b9d 100%);
        }

        .testimonial-card-v7:nth-child(3n) .author-avatar-v7 {
          background: linear-gradient(135deg, #6f4e37 0%, #C9A227 100%);
        }

        .author-info-v7 h4 {
          font-size: 0.92rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 0.2rem;
        }

        .author-info-v7 p {
          font-size: 0.8rem;
          color: #888888;
          margin: 0;
          line-height: 1.3;
        }

        .author-tag-v7 {
          display: inline-block;
          padding: 2px 8px;
          background: rgba(201, 162, 39, 0.08);
          border: 1px solid rgba(201, 162, 39, 0.15);
          color: #b8860b;
          border-radius: 4px;
          font-size: 0.68rem;
          font-weight: 600;
          margin-top: 0.3rem;
        }

        .swipe-hint-v7 {
          text-align: center;
          color: #888888;
          font-size: 0.85rem;
          margin-top: 1.5rem;
          display: block;
        }

        .testimonials-cta-v7 {
          text-align: center;
          margin-top: 4.5rem;
          padding: 3.5rem 2rem;
          background: #FFFFFF;
          border: 1px solid rgba(27, 67, 50, 0.05);
          border-radius: 28px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          box-shadow: 0 10px 30px rgba(27, 67, 50, 0.04);
        }

        .testimonials-cta-v7 h3 {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3vw, 1.8rem);
          color: #1A1A1A;
          margin-bottom: 0.6rem;
          font-weight: 700;
        }

        .testimonials-cta-v7 p {
          color: #4A4A4A;
          margin-bottom: 1.8rem;
          font-size: 1.05rem;
          line-height: 1.5;
        }

        .btn-whatsapp-reviews-v7 {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 36px;
          background: linear-gradient(135deg, #25D366 0%, #1c9c4b 100%);
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: 50px;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.35);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }

        .btn-whatsapp-reviews-v7:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(37, 211, 102, 0.5);
        }

        .btn-whatsapp-reviews-v7 svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }

        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .uniq-testimonials-v7 {
            padding: 5rem 5%;
          }

          .testimonials-header-v7 {
            padding: 0;
          }

          .marquee-wrapper-v7 {
            padding: 1rem 0;
            gap: 1.2rem;
          }

          .track-row-1-v7 {
            animation: marqueeLeft 30s linear infinite;
          }

          .track-row-2-v7 {
            animation: marqueeRight 30s linear infinite;
            padding-left: 100px;
          }

          .testimonial-card-v7 {
            width: 320px;
            padding: 1.8rem 1.5rem;
          }

          .testimonials-cta-v7 {
            padding: 2.5rem 1.5rem;
            margin-top: 3rem;
          }

          .btn-whatsapp-reviews-v7 {
            width: 100%;
            max-width: 320px;
            justify-content: center;
          }
        }
      `}} />

      {/* HEADER */}
      <div className="testimonials-header-v7">
        <h2 id="testimonial-heading-v7" className="font-serif text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4">
          What Our <span className="italic text-[#C9A227] font-serif font-medium">Clients Say</span>
        </h2>
        <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed">
          Trusted by major hotel chains, modern offices, medical centers, and Udaipur homeowners
        </p>

        {/* GOOGLE REVIEW TRUST BADGE */}
        <div className="google-trust-badge-v7" aria-label="Google verified rating: 4.3 out of 5 stars">
          <div className="google-logo-v7">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          <div className="google-stars-v7" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="filled"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg viewBox="0 0 24 24" className="filled"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg viewBox="0 0 24 24" className="filled"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg viewBox="0 0 24 24" className="filled"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <svg viewBox="0 0 24 24">
              <defs>
                <linearGradient id="google-grad-30">
                  <stop offset="30%" stopColor="#C9A227"/>
                  <stop offset="30%" stopColor="#e0e0e0"/>
                </linearGradient>
              </defs>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="url(#google-grad-30)"/>
            </svg>
          </div>
          <span className="google-rating-text-v7"><strong>4.3 / 5.0 Rating</strong> based on 150+ Verified Google Reviews</span>
        </div>
      </div>

      {/* DOUBLE-ROW STAGGERED MARQUEE WRAPPER */}
      <div className="marquee-wrapper-v7">
        {/* ROW 1: Scrolls Right to Left */}
        <div className="marquee-track-v7 track-row-1-v7" role="marquee" aria-label="Client review list row 1">
          {[...ROW1_REVIEWS, ...ROW1_REVIEWS].map((review, idx) => (
            <div key={`row1-${idx}`} className="testimonial-card-v7 cursor-hover" tabIndex={0}>
              <span className="card-quote-watermark-v7" aria-hidden="true">”</span>
              <div className="card-top-v7">
                <span className="verified-badge-v7">
                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Google Verified
                </span>
                <div className="stars-v7" aria-label="5 star review">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
              </div>
              <p className="testimonial-text-v7">"{review.text}"</p>
              <div className="testimonial-author-v7">
                <div className="author-avatar-v7" aria-hidden="true">{review.avatar}</div>
                <div className="author-info-v7">
                  <h4>{review.name}</h4>
                  <p>{review.company}</p>
                  <span className="author-tag-v7">{review.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2: Scrolls Left to Right */}
        <div className="marquee-track-v7 track-row-2-v7" role="marquee" aria-label="Client review list row 2">
          {[...ROW2_REVIEWS, ...ROW2_REVIEWS].map((review, idx) => (
            <div key={`row2-${idx}`} className="testimonial-card-v7 cursor-hover" tabIndex={0}>
              <span className="card-quote-watermark-v7" aria-hidden="true">”</span>
              <div className="card-top-v7">
                <span className="verified-badge-v7">
                  <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Google Verified
                </span>
                <div className="stars-v7" aria-label="5 star review">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  ))}
                </div>
              </div>
              <p className="testimonial-text-v7">"{review.text}"</p>
              <div className="testimonial-author-v7">
                <div className="author-avatar-v7" aria-hidden="true">{review.avatar}</div>
                <div className="author-info-v7">
                  <h4>{review.name}</h4>
                  <p>{review.company}</p>
                  <span className="author-tag-v7">{review.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="swipe-hint-v7">← Hover to pause & read reviews →</p>

      {/* CTA STRIP */}
      <div className="testimonials-cta-v7">
        <h3>Join 500+ Satisfied Clients</h3>
        <p>From single home room design customizations to large 150-room hotel supply pipelines, Uniq Decor provides Udaipur's most trusted craftsmanship and materials.</p>
        <a href="https://wa.me/919982219222?text=Hi%20Uniq%20Decor!%20👋%20I%20read%20your%20verified%20client%20reviews%20and%20want%20to%20discuss%20a%20project.%20Can%20we%20connect%3F" 
           className="btn-whatsapp-reviews-v7 cursor-hover" 
           target="_blank" 
           rel="noopener noreferrer"
           aria-label="Start WhatsApp project discussion">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Chat with our Experts
        </a>
      </div>
    </section>
  );
}
