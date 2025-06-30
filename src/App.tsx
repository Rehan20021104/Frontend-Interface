import React, { useEffect, useRef, useState } from 'react';
import { Code2, Laptop, Rocket, Terminal, ChevronDown, Github, Linkedin, Mail, Menu, X } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            const id = entry.target.id;
            if (id) {
              setActiveSection(id);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    setIsMenuOpen(false);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Minimal Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="text-2xl font-bold">
              RB
            </a>
            <button
              className="w-12 h-12 flex items-center justify-center text-white hover:opacity-75 transition-opacity"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Navigation Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-transform duration-700 ease-in-out ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 h-full flex flex-col">
          <div className="flex items-center justify-between h-20">
            <span className="text-2xl font-bold text-white">Menu</span>
            <button
              className="w-12 h-12 flex items-center justify-center text-white hover:opacity-75 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 flex items-center">
            <ul className="w-full space-y-6">
              <NavItem
                label="Home"
                onClick={() => scrollToSection(heroRef)}
                active={activeSection === 'home'}
                delay={0.1}
                isMenuOpen={isMenuOpen}
              />
              <NavItem
                label="Services"
                onClick={() => scrollToSection(servicesRef)}
                active={activeSection === 'services'}
                delay={0.2}
                isMenuOpen={isMenuOpen}
              />
              <NavItem
                label="Work"
                onClick={() => scrollToSection(workRef)}
                active={activeSection === 'work'}
                delay={0.3}
                isMenuOpen={isMenuOpen}
              />
              <NavItem
                label="Contact"
                onClick={() => scrollToSection(contactRef)}
                active={activeSection === 'contact'}
                delay={0.4}
                isMenuOpen={isMenuOpen}
              />
            </ul>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-600/20 to-transparent" />
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-emerald-400 animate-fade-in">
              Rehan Bandara
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 animate-fade-in delay-200">
              Software Engineer & Web Developer
            </p>
            <div className="animate-bounce mt-12">
              <ChevronDown className="w-8 h-8 mx-auto text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the sections remain unchanged */}
      {/* Services Section */}
      <div ref={servicesRef} id="services" className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-on-scroll">
            Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Code2 className="w-8 h-8" />}
              title="Web Development"
              description="Modern, responsive websites built with cutting-edge technologies"
            />
            <ServiceCard
              icon={<Terminal className="w-8 h-8" />}
              title="Software Engineering"
              description="Robust and scalable software solutions for your business needs"
            />
            <ServiceCard
              icon={<Rocket className="w-8 h-8" />}
              title="Digital Innovation"
              description="Transforming ideas into powerful digital experiences"
            />
          </div>
        </div>
      </div>

      {/* Featured Work */}
      <div ref={workRef} id="work" className="py-24 bg-gradient-to-b from-black to-violet-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-on-scroll">
            Featured Work
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
              title="Enterprise Dashboard"
              description="Modern analytics platform built with React and Node.js"
            />
            <ProjectCard
              image="https://images.unsplash.com/photo-1555066931-bf19f8fd1085?auto=format&fit=crop&w=800&q=80"
              title="E-Commerce Platform"
              description="Scalable online shopping solution with real-time features"
            />
          </div>
        </div>
      </div>

      {/* Contact */}
      <footer ref={contactRef} id="contact" className="py-24 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's Connect</h2>
          <div className="flex justify-center space-x-6 mb-8">
            <SocialLink icon={<Github />} href="https://github.com" />
            <SocialLink icon={<Linkedin />} href="https://linkedin.com" />
            <SocialLink icon={<Mail />} href="mailto:contact@rehanbandara.com" />
          </div>
          <p className="text-gray-400">© 2024 Rehan Bandara. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function NavItem({ label, onClick, active, delay, isMenuOpen }: { 
  label: string; 
  onClick: () => void; 
  active: boolean;
  delay: number;
  isMenuOpen: boolean;
}) {
  return (
    <li
      className={`transform transition-all duration-700 ease-out ${
        isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <button
        onClick={onClick}
        className={`text-4xl md:text-6xl font-bold transition-colors hover:text-violet-400 ${
          active ? 'text-violet-400' : 'text-white'
        }`}
      >
        {label}
      </button>
    </li>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-violet-900/10 to-transparent border border-violet-900/20 backdrop-blur-sm animate-on-scroll hover:scale-105 transition-transform duration-300">
      <div className="text-violet-400 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function ProjectCard({ image, title, description }: { image: string; title: string; description: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl animate-on-scroll">
      <img src={image} alt={title} className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
        <div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-full bg-violet-900/20 flex items-center justify-center hover:bg-violet-900/40 transition-colors duration-300"
    >
      {icon}
    </a>
  );
}

export default App;