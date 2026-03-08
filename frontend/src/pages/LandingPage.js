import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  CheckCircle,
  Filter,
  Database,
  ShieldCheck,
  Zap,
  Headphones,
  MessageCircle,
  ArrowRight,
  Send,
  Star,
  Users,
  TrendingUp,
  Globe,
  Check,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const WHATSAPP_NUMBER = "8801743212291";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    apollo_url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/leads`, formData);
      toast.success("Request submitted successfully! We'll contact you soon.");
      setFormData({ name: "", email: "", phone: "", apollo_url: "" });
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    { icon: CheckCircle, title: "Direct Apollo Data", desc: "Leads scraped directly from Apollo.io, exactly as it appears." },
    { icon: Filter, title: "Custom Filtering", desc: "Filter by industry, location, company size, job title, and more." },
    { icon: Database, title: "Excel / CSV Export", desc: "Clean & organized data delivered in Excel or CSV format." },
    { icon: ShieldCheck, title: "Accurate & Relevant", desc: "We only deliver Apollo.io sourced data for reliable results." },
    { icon: Zap, title: "Fast Delivery", desc: "Quick turnaround from 24 hours to 10 days based on volume." },
    { icon: Headphones, title: "Reliable Support", desc: "24/7 access to our data experts via WhatsApp." },
  ];

  const steps = [
    { num: "01", title: "Share Criteria", desc: "Send us your Apollo search URL or lead criteria via WhatsApp or form." },
    { num: "02", title: "We Scrape", desc: "Our engine extracts and verifies data points in real-time." },
    { num: "03", title: "Receive Data", desc: "Get a clean CSV/Excel file or direct CRM sync ready for outreach." },
  ];

  const pricing = [
    {
      name: "Starter",
      price: "$15",
      leads: "10,000 Leads",
      delivery: "24 Hours",
      features: ["CSV/Excel Export", "Direct Apollo Data", "Custom Filters", "WhatsApp Support"],
      popular: false,
    },
    {
      name: "Growth",
      price: "$75",
      leads: "50,000 Leads",
      delivery: "48 Hours",
      features: ["CSV/Excel Export", "Direct Apollo Data", "Custom Filters", "Priority Support", "Bulk Discount"],
      popular: true,
    },
    {
      name: "Gold",
      price: "$750",
      leads: "1 Million Leads",
      delivery: "10 Days",
      features: ["CSV/Excel Export", "Direct Apollo Data", "Custom Filters", "Dedicated Support", "Volume Pricing"],
      popular: false,
    },
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: TrendingUp, value: "10M+", label: "Leads Delivered" },
    { icon: Globe, value: "50+", label: "Countries" },
    { icon: Star, value: "4.9", label: "Client Rating" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-pattern" data-testid="hero-section">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617] pointer-events-none" />
        
        <div className="container-custom relative z-10 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-[#25D366]/20 text-[#25D366] border-[#25D366]/30 px-4 py-2 text-sm animate-fade-in-up">
              Enterprise-Grade B2B Lead Generation
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-8 animate-fade-in-up stagger-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Unlimited Apollo Scraping
              <span className="block gradient-text">For High-Quality B2B Leads</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
              Get verified real-time Apollo.io leads for sales outreach, marketing campaigns, and explosive business growth. 99% accuracy guaranteed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
              <Button
                data-testid="hero-whatsapp-btn"
                className="bg-[#25D366] hover:bg-[#1faa52] text-white font-semibold px-8 py-6 rounded-full text-lg transition-all duration-300 shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_50px_rgba(37,211,102,0.6)] btn-shine"
                onClick={() => window.open(WHATSAPP_LINK, "_blank")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
              <Button
                data-testid="hero-request-btn"
                variant="outline"
                className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-6 rounded-full text-lg backdrop-blur-md transition-all"
                onClick={scrollToForm}
              >
                Request Leads
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#25D366]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#25D366]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-slate-800/50" data-testid="stats-section">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <stat.icon className="w-8 h-8 text-[#25D366] mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding" data-testid="trust-section">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Professional Apollo Lead Scraping
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Get highly targeted B2B leads directly from Apollo.io using your custom filters. Simply provide your Apollo filter URL, and we will extract the exact data based on your selected criteria such as industry, location, company size, job title, and more.
          </p>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            We only deliver Apollo.io sourced data, exactly as it appears on Apollo — ensuring accurate and relevant lead information.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[#25D366]">
            <span className="flex items-center gap-2"><Check className="w-5 h-5" /> Leads scraped directly from Apollo.io</span>
            <span className="flex items-center gap-2"><Check className="w-5 h-5" /> Data based on your Apollo filter URL</span>
            <span className="flex items-center gap-2"><Check className="w-5 h-5" /> Clean & organized Excel / CSV file</span>
            <span className="flex items-center gap-2"><Check className="w-5 h-5" /> Fast delivery & reliable service</span>
          </div>
          <p className="text-slate-500 text-base mt-8 max-w-2xl mx-auto">
            Perfect for B2B lead generation, sales prospecting, and marketing outreach.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-slate-900/30" data-testid="features-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Why Our Service Is <span className="gradient-text">Powerful</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything you need to supercharge your B2B lead generation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                data-testid={`feature-card-${index}`}
                className="glass card-hover border-slate-800 hover:border-[#25D366]/50 bg-slate-900/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding" data-testid="process-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-slate-400 text-lg">Simple 3-step process to get your leads</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#25D366] via-[#25D366]/50 to-[#25D366] -translate-y-1/2" />
            
            {steps.map((step, index) => (
              <div
                key={index}
                data-testid={`step-${index}`}
                className="text-center relative z-10 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-20 h-20 rounded-full bg-[#25D366] text-white flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-[0_0_40px_rgba(37,211,102,0.5)]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {step.num}
                </div>
                <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>{step.title}</h3>
                <p className="text-slate-400 max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-slate-900/30" data-testid="pricing-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-slate-400 text-lg">Choose the plan that fits your needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, index) => (
              <Card
                key={index}
                data-testid={`pricing-card-${plan.name.toLowerCase()}`}
                className={`relative glass border-slate-800 transition-all duration-300 ${
                  plan.popular
                    ? "border-[#25D366] border-2 scale-105 shadow-[0_0_50px_rgba(37,211,102,0.3)]"
                    : "hover:border-slate-600"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#25D366] text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>{plan.name}</CardTitle>
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {plan.price}
                  </div>
                  <CardDescription className="text-slate-400 text-lg">{plan.leads}</CardDescription>
                  <CardDescription className="text-[#25D366] text-sm mt-1">Delivery: {plan.delivery}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3 text-slate-300">
                        <Check className="w-5 h-5 text-[#25D366] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    data-testid={`pricing-btn-${plan.name.toLowerCase()}`}
                    className={`w-full py-6 rounded-full font-semibold transition-all ${
                      plan.popular
                        ? "bg-[#25D366] hover:bg-[#1faa52] text-white shadow-[0_0_20px_rgba(37,211,102,0.4)]"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                    onClick={scrollToForm}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="lead-form" className="section-padding" data-testid="form-section">
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Request Apollo <span className="gradient-text">Scraping</span>
              </h2>
              <p className="text-slate-400 text-lg">Fill the form and we'll get back to you within 24 hours</p>
            </div>
            
            <Card className="glass border-slate-800">
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Input
                      data-testid="form-name"
                      name="name"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 h-14 rounded-xl focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      data-testid="form-email"
                      name="email"
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 h-14 rounded-xl focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      data-testid="form-phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 h-14 rounded-xl focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      data-testid="form-apollo-url"
                      name="apollo_url"
                      placeholder="Apollo Filter URL"
                      value={formData.apollo_url}
                      onChange={handleInputChange}
                      className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 h-14 rounded-xl focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]"
                    />
                  </div>
                  <Button
                    data-testid="form-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#25D366] hover:bg-[#1faa52] text-white font-semibold py-6 rounded-xl text-lg transition-all shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_50px_rgba(37,211,102,0.6)] btn-shine"
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-b from-slate-900/50 to-[#020617]" data-testid="cta-section">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Get Unlimited Apollo Leads <span className="gradient-text">Today</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            Click below and send your Apollo filter URL to start scraping immediately. Our team is ready to help you scale your outreach.
          </p>
          <Button
            data-testid="cta-whatsapp-btn"
            className="bg-[#25D366] hover:bg-[#1faa52] text-white font-semibold px-10 py-6 rounded-full text-lg transition-all duration-300 shadow-[0_0_40px_rgba(37,211,102,0.5)] hover:shadow-[0_0_60px_rgba(37,211,102,0.7)] animate-pulse-glow btn-shine"
            onClick={() => window.open(WHATSAPP_LINK, "_blank")}
          >
            <MessageCircle className="mr-2 h-6 w-6" />
            Chat on WhatsApp Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800/50">
        <div className="container-custom text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Apollo Scraping Service. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="floating-whatsapp-btn"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:scale-110 transition-transform duration-300 animate-pulse-glow"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};

export default LandingPage;
