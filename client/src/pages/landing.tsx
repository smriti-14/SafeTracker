import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, MapPin, Wifi, AlertTriangle, Phone, Users, Route, Clock, Navigation, Signal, Star, Zap, Eye, Heart } from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-lg sticky top-0 z-50 border-b border-blue-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-2 rounded-xl mr-3">
                <Shield className="text-white text-2xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SafeZone
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-all hover:bg-blue-50 rounded-lg">
                Features
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-all hover:bg-blue-50 rounded-lg">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-all hover:bg-blue-50 rounded-lg">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-white/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Floating Badge */}
            <div className="inline-flex items-center bg-blue-100/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-3 mb-8 fade-in">
              <Star className="text-blue-600 mr-2" size={20} />
              <span className="text-blue-800 text-sm font-medium">India's Most Advanced Emergency System</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-8 leading-tight fade-in">
              Stay Safe with <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Real-Time Zone Detection
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto fade-in leading-relaxed">
              Advanced emergency zone detection using cutting-edge Canvas API, Geolocation API, and Network Information API to identify danger zones and safe areas near you during disasters.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-white/80 backdrop-blur-lg border border-blue-200/50 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 slide-in shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-4 rounded-2xl w-fit mx-auto mb-6">
                    <MapPin className="text-white text-3xl" />
                  </div>
                  <h3 className="text-gray-800 font-semibold text-xl mb-3">Canvas Mapping</h3>
                  <p className="text-gray-600 text-sm">Interactive canvas-based maps with live danger zone visualization</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-lg border border-purple-200/50 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 slide-in shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 rounded-2xl w-fit mx-auto mb-6">
                    <Signal className="text-white text-3xl" />
                  </div>
                  <h3 className="text-gray-800 font-semibold text-xl mb-3">Network Adaptive</h3>
                  <p className="text-gray-600 text-sm">Optimized experience based on your network connection quality</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-lg border border-orange-200/50 hover:bg-white/90 transition-all duration-300 transform hover:scale-105 slide-in shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-4 rounded-2xl w-fit mx-auto mb-6">
                    <AlertTriangle className="text-white text-3xl" />
                  </div>
                  <h3 className="text-gray-800 font-semibold text-xl mb-3">Instant Alerts</h3>
                  <p className="text-gray-600 text-sm">Real-time emergency notifications for your safety</p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-20 animate-pulse -z-10"></div>
              <Button 
                onClick={handleGetStarted}
                className="relative z-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-6 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 border border-blue-400/50"
              >
                <Navigation className="mr-3" size={24} />
                Get My Location & Start
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 flex justify-center items-center space-x-8 text-gray-600">
              <div className="flex items-center">
                <Eye className="mr-2" size={16} />
                <span className="text-sm">Live Tracking</span>
              </div>
              <div className="flex items-center">
                <Zap className="mr-2" size={16} />
                <span className="text-sm">Instant Response</span>
              </div>
              <div className="flex items-center">
                <Heart className="mr-2" size={16} />
                <span className="text-sm">Made for India</span>
              </div>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <Shield className="text-primary text-2xl mr-3" />
                <span className="text-xl font-bold">SafeZone</span>
              </div>
              <p className="text-gray-400 mb-6">
                Advanced emergency zone detection system helping communities stay safe during natural disasters and emergency situations.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Emergency</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="tel:100" className="hover:text-white transition-colors">Call 100 (Police)</a></li>
                <li><a href="tel:101" className="hover:text-white transition-colors">Call 101 (Fire)</a></li>
                <li><a href="tel:102" className="hover:text-white transition-colors">Call 102 (Ambulance)</a></li>
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
