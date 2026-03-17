"use client";

export default function StickyCTA() {
  return (
    <>
      <div className="sticky-cta-bar hidden max-md:flex" id="stickyCtaBar">
        <button 
          onClick={() => window.dispatchEvent(new Event('openBookingModal'))} 
          className="w-full text-center"
        >
          BOOK FREE TRIAL
        </button>
      </div>
      <script dangerouslySetInnerHTML={{ __html: "if(typeof window !== 'undefined') { window.addEventListener('scroll', function() { var bar = document.getElementById('stickyCtaBar'); if(bar) { if(window.scrollY > 500) { bar.classList.add('visible'); } else { bar.classList.remove('visible'); } } }); }" }} />
    </>
  );
}
