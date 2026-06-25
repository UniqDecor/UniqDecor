"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function ShowroomVisit() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    category: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState("");

  const sectionRef = useRef(null);

  useEffect(() => {
    // Set min date of picker to today
    const dateInput = document.getElementById("booking-visit-date");
    if (dateInput) {
      const today = new Date().toISOString().split("T")[0];
      dateInput.setAttribute("min", today);
    }
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".showroom-visit-plate", {
      scrollTrigger: {
        trigger: ".showroom-visit-plate",
        start: "top 90%",
        once: true,
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, { scope: sectionRef });

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    const stateKey = id.replace("booking-visit-", "");
    setFormData((prev) => ({ ...prev, [stateKey]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, date, category } = formData;

    if (!name || !phone || !date || !category) {
      alert("Please fill out all booking fields to coordinate.");
      return;
    }

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const message = `Hi Uniq Decor Furniture! 👋\n\nI would like to schedule a showroom visit consultation.\n\n👤 *Client Name:* ${name}\n📱 *Contact:* ${phone}\n📅 *Preferred Date:* ${formattedDate}\n🏢 *Brand Focus:* ${category}\n\nCan you please confirm if this slot is available? Thank you!`;
    const encodedMessage = encodeURIComponent(message);
    const link = `https://wa.me/919982219222?text=${encodedMessage}`;

    // Store link and trigger success popup
    setWhatsappLink(link);
    setIsSuccess(true);

    // Immediately open WhatsApp link in a new window/tab
    window.open(link, "_blank");
  };

  return (
    <section ref={sectionRef} className="showroom-visit-section py-20 px-[4%] bg-[#FAF9F6] relative overflow-hidden" id="showroom-visit">
      <style dangerouslySetInnerHTML={{ __html: `
        .showroom-visit-plate {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4.5rem;
          max-width: 1250px;
          margin: 0 auto;
          background: #FFFFFF;
          border: 1px solid rgba(27, 67, 50, 0.06);
          border-radius: 28px;
          padding: 4rem;
          box-shadow: 0 12px 40px rgba(27, 67, 50, 0.03);
          position: relative;
          z-index: 10;
        }

        .booking-info-col-v9 h3 {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 2.5rem;
          color: #1a1a1a;
          margin-bottom: 1.2rem;
          font-weight: 700;
          line-height: 1.2;
        }

        .booking-info-col-v9 p.subtitle-v9 {
          color: #4a4a4a;
          font-size: 1.05rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .showroom-detail-item-v9 {
          display: flex;
          align-items: flex-start;
          gap: 1.2rem;
          margin-bottom: 2rem;
        }

        .detail-icon-wrapper-v9 {
          width: 44px;
          height: 44px;
          background: rgba(201, 162, 39, 0.08);
          border: 1px solid rgba(201, 162, 39, 0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C9A227;
          flex-shrink: 0;
        }

        .detail-text-v9 h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 0.3rem;
        }

        .detail-text-v9 p {
          font-size: 0.88rem;
          color: #4A4A4A;
          line-height: 1.45;
          margin: 0;
        }

        .btn-directions-v9 {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          background: #1B4332;
          color: white !important;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 10px;
          margin-top: 1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(27, 67, 50, 0.12);
        }

        .btn-directions-v9:hover {
          background: #142d22;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(27, 67, 50, 0.25);
        }

        .booking-form-card-v9 {
          background: #FAF9F6;
          border: 1px solid rgba(201, 162, 39, 0.22);
          border-radius: 20px;
          padding: 2.8rem 2.5rem;
          box-shadow: inset 0 2px 8px rgba(27, 67, 50, 0.02);
          position: relative;
          overflow: hidden;
        }

        .booking-form-card-v9 h4 {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.45rem;
          color: #1A1A1A;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .form-group-v9 {
          margin-bottom: 1.4rem;
        }

        .form-label-v9 {
          display: block;
          font-size: 0.82rem;
          font-weight: 700;
          color: #4A4A4A;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .form-input-v9,
        .form-select-v9 {
          width: 100%;
          padding: 12px 16px;
          background: #FFFFFF;
          border: 1px solid rgba(27, 67, 50, 0.08);
          border-radius: 8px;
          font-size: 0.92rem;
          color: #1A1A1A;
          transition: all 0.3s ease;
        }

        .form-input-v9:focus,
        .form-select-v9:focus {
          outline: 2px solid #C9A227;
          outline-offset: 2px;
          border-color: #C9A227;
          box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.12);
        }

        .btn-submit-booking-v9 {
          width: 100%;
          padding: 15px;
          background: #C9A227;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(201, 162, 39, 0.2);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 0.5rem;
        }

        .btn-submit-booking-v9:hover {
          background: #b08d1f;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(201, 162, 39, 0.35);
        }

        .booking-success-v9 {
          position: absolute;
          inset: 0;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
          opacity: 0;
          pointer-events: none;
          z-index: 10;
          transition: all 0.4s ease;
          transform: scale(0.95);
        }

        .booking-success-v9.active-success-v9 {
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);
        }

        .success-icon-v9 {
          width: 64px;
          height: 64px;
          background: rgba(37, 211, 102, 0.08);
          border: 2px solid #25D366;
          color: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .success-icon-v9 svg {
          width: 32px;
          height: 32px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2.5;
        }

        .booking-success-v9 h5 {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.6rem;
          color: #1A1A1A;
          margin-bottom: 0.6rem;
          font-weight: 700;
        }

        .booking-success-v9 p {
          font-size: 0.88rem;
          color: #4A4A4A;
          line-height: 1.5;
          margin-bottom: 2rem;
          max-width: 300px;
        }

        .btn-whatsapp-confirm-v9 {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #25D366;
          color: white !important;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.2);
          transition: all 0.3s ease;
        }

        .btn-whatsapp-confirm-v9:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.35);
        }

        .btn-whatsapp-confirm-v9 svg {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        @media (max-width: 1024px) {
          .showroom-visit-plate {
            grid-template-columns: 1fr;
            padding: 3rem;
            gap: 3.5rem;
          }
        }

        @media (max-width: 768px) {
          .showroom-visit-section {
            padding: 5rem 4%;
          }

          .showroom-visit-plate {
            padding: 2.2rem 1.8rem;
            border-radius: 20px;
          }

          .booking-info-col-v9 h3 {
            font-size: 2rem;
          }

          .booking-form-card-v9 {
            padding: 2rem 1.5rem;
          }
        }
      `}} />

      <div className="showroom-visit-plate">
        {/* Left Column: Details & GPS */}
        <div className="booking-info-col-v9">
          <h3>Plan Your <span className="italic text-[#C9A227] font-serif font-medium">Showroom Visit</span></h3>
          <p className="subtitle-v9">
            Experience the materials, test the ergonomics, and receive professional consultations from our chief design consultants.
          </p>

          <div className="showroom-detail-item-v9">
            <div className="detail-icon-wrapper-v9" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="detail-text-v9">
              <h4>Showroom Address</h4>
              <p>Uniq Decor and Furniture, 2nd Floor, Gokul Tower, F Block near CA Circle, Hiran Magri, Sector 14, Udaipur Rajasthan (313001)</p>
            </div>
          </div>

          <div className="showroom-detail-item-v9">
            <div className="detail-icon-wrapper-v9" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div className="detail-text-v9">
              <h4>Showroom Operating Hours</h4>
              <p>Monday - Saturday: 10:00 AM - 8:30 PM (Sunday Closed)</p>
            </div>
          </div>

          <a href="https://maps.google.com/?q=Uniq+Decor+Furniture+Udaipur" 
             className="btn-directions-v9 cursor-hover" 
             target="_blank" 
             rel="noopener noreferrer"
             aria-label="Get Google Maps navigation directions to Uniq Decor Showroom">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-none stroke-current stroke-2 mr-2.5" aria-hidden="true">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
            Get Navigation Directions
          </a>
        </div>

        {/* Right Column: Appointment Form Card */}
        <div className="booking-form-card-v9">
          {/* SUCCESS BOX OVERLAY */}
          <div className={`booking-success-v9 ${isSuccess ? "active-success-v9" : ""}`}>
            <div className="success-icon-v9">
              <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h5>Appointment Requested!</h5>
            <p>Your request has been successfully registered. Confirm instantly with our showroom manager on WhatsApp.</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-confirm-v9 cursor-hover">
              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current mr-2"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Chat on WhatsApp
            </a>
          </div>

          <h4>Schedule A Consultation</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group-v9">
              <label className="form-label-v9" htmlFor="booking-visit-name">Your Name</label>
              <input
                type="text"
                id="booking-visit-name"
                className="form-input-v9"
                placeholder="e.g. Anirudh Sharma"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group-v9">
              <label className="form-label-v9" htmlFor="booking-visit-phone">WhatsApp Number</label>
              <input
                type="tel"
                id="booking-visit-phone"
                className="form-input-v9"
                placeholder="e.g. +91 99822 19222"
                value={formData.phone}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group-v9">
              <label className="form-label-v9" htmlFor="booking-visit-date">Preferred Date</label>
              <input
                type="date"
                id="booking-visit-date"
                className="form-input-v9"
                value={formData.date}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="form-group-v9">
              <label className="form-label-v9" htmlFor="booking-visit-category">Interest Category</label>
              <select
                id="booking-visit-category"
                className="form-select-v9"
                value={formData.category}
                onChange={handleFormChange}
                required
              >
                <option value="" disabled>Select category of interest</option>
                <option value="ROSERRO Bespoke Furniture">ROSERRO Bespoke Furniture</option>
                <option value="D'DECOR Premium Fabrics">D'DECOR Premium Fabrics</option>
                <option value="GEEKEN Office Furniture">GEEKEN Ergonomic Workspaces</option>
                <option value="LAXREE Boutique Linens">LAXREE Boutique Hotel Bedding</option>
                <option value="Full Space Consultation">Full Home Consultation</option>
              </select>
            </div>

            <button type="submit" className="btn-submit-booking-v9 cursor-hover">Request Appointment</button>
          </form>
        </div>
      </div>
    </section>
  );
}
