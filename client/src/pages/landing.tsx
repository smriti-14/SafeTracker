import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, MapPin, Wifi, AlertTriangle, Phone, Users, Route, Clock, Navigation, Signal } from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="text-white text-2xl mr-3" />
              <span className="text-xl font-bold text-white">SafeZone</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#about" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                About
              </a>
              <a href="#contact" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight fade-in">
              Stay Safe with <span className="text-yellow-300">Real-Time</span> Zone Detection
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto fade-in">
              Advanced emergency zone detection using your location and network data to identify danger zones and safe areas near you during disasters.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 slide-in">
                <CardContent className="p-6 text-center">
                  <MapPin className="text-yellow-300 text-3xl mb-4 mx-auto" />
                  <h3 className="text-white font-semibold text-lg mb-2">Real-Time Mapping</h3>
                  <p className="text-blue-100 text-sm">Interactive maps with live danger zone updates</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 slide-in">
                <CardContent className="p-6 text-center">
                  <Signal className="text-yellow-300 text-3xl mb-4 mx-auto" />
                  <h3 className="text-white font-semibold text-lg mb-2">Network Adaptive</h3>
                  <p className="text-blue-100 text-sm">Optimized for your connection speed</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 slide-in">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="text-yellow-300 text-3xl mb-4 mx-auto" />
                  <h3 className="text-white font-semibold text-lg mb-2">Emergency Alerts</h3>
                  <p className="text-blue-100 text-sm">Instant notifications for your safety</p>
                </CardContent>
              </Card>
            </div>

            <Button 
              onClick={handleGetStarted}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Navigation className="mr-2" />
              Get My Location & Start
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Emergency Protection</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced system combines multiple technologies to provide you with the most accurate and timely safety information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-safe text-white rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <Shield className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Safe Zone Detection</h3>
                <p className="text-gray-600">Identify secure areas and evacuation points based on real-time disaster data and your current location.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-danger text-white rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <AlertTriangle className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Danger Zone Alerts</h3>
                <p className="text-gray-600">Receive immediate warnings about hazardous areas including floods, landslides, and other natural disasters.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-primary text-white rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <Phone className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Mobile Optimized</h3>
                <p className="text-gray-600">Works seamlessly on all devices with offline capabilities for emergency situations.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-warning text-white rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <Clock className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-Time Updates</h3>
                <p className="text-gray-600">Continuous monitoring and updates ensure you have the latest safety information at all times.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-accent text-white rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <Route className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Navigation</h3>
                <p className="text-gray-600">Get safe route recommendations to avoid danger zones and reach safety quickly.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="bg-purple-600 text-white rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-6">
                  <Users className="text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Driven</h3>
                <p className="text-gray-600">Crowdsourced safety data from verified users and official emergency services.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for Emergency Situations</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              In times of crisis, every second counts. SafeZone leverages cutting-edge web technologies to provide life-saving information when you need it most.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="bg-gray-800 mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">Technologies Used</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-white">
                      <MapPin className="text-accent mr-3" />
                      <span>Canvas API for Interactive Maps</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Navigation className="text-safe mr-3" />
                      <span>Geolocation API for Precise Positioning</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Wifi className="text-warning mr-3" />
                      <span>Network Information API for Optimization</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-white">Why SafeZone Matters</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-danger">40M+</div>
                      <div className="text-sm text-gray-400">People affected by disasters annually</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning">15min</div>
                      <div className="text-sm text-gray-400">Average emergency response time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold mb-4">Every Second Counts</h3>
              <p className="text-gray-300 mb-6">
                When disasters strike, having immediate access to accurate safety information can mean the difference between life and death. SafeZone processes your location and network data to provide instant, personalized emergency guidance.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary px-3 py-1 rounded-full text-sm">Real-time</span>
                <span className="bg-safe px-3 py-1 rounded-full text-sm">Location-based</span>
                <span className="bg-accent px-3 py-1 rounded-full text-sm">Network-optimized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="text-primary text-2xl mr-3" />
                <span className="text-xl font-bold">SafeZone</span>
              </div>
              <p className="text-gray-400 mb-6">
                Advanced emergency zone detection system helping communities stay safe during natural disasters and emergency situations.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Emergency</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="tel:911" className="hover:text-white transition-colors">Call 911</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Emergency Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disaster Resources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SafeZone. All rights reserved. Built with emergency response in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
