// src/components/layout/CtaSection.jsx
import Button from '../ui/Button';

const CtaSection = () => {
  return (
    <section className="cta">
      <div className="cta-content">
        <h2 className="cta-label">Get Started</h2>
        <h3 className="cta-title">Start Your Reading Journey</h3>
        <p className="cta-description">
          Join thousands of readers who have discovered their next favorite
          book. Access our complete catalog and start reading today.
        </p>
        <Button className="cta-button">Explore Collection</Button>
      </div>
    </section>
  );
};

export default CtaSection;
