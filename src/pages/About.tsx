import React from 'react';
import { Users, Target, Award, Mail } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About TechBlog</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Your go-to source for cutting-edge technology insights, development tutorials, and industry expertise.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
          <div className="text-center mb-8">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed text-center max-w-2xl mx-auto">
            At TechBlog, we're dedicated to making complex technology concepts accessible to everyone. 
            Whether you're a seasoned developer, a curious beginner, or a tech enthusiast, we provide 
            high-quality content that educates, inspires, and empowers our readers to stay ahead in 
            the rapidly evolving world of technology.
          </p>
        </div>

        {/* What We Cover */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">What We Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Web Development</h3>
              <p className="text-gray-600">
                Frontend and backend technologies, frameworks, best practices, and emerging trends in web development.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mobile Development</h3>
              <p className="text-gray-600">
                Native and cross-platform mobile app development, including React Native, Flutter, and native iOS/Android.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI & Machine Learning</h3>
              <p className="text-gray-600">
                Artificial intelligence, machine learning algorithms, and their practical applications in real-world scenarios.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cybersecurity</h3>
              <p className="text-gray-600">
                Security best practices, threat analysis, and strategies to protect applications and data.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
          <div className="text-center mb-8">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Our Contributors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">John Doe</h3>
              <p className="text-gray-600 text-sm">Full-Stack Developer & React Specialist</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sarah Johnson</h3>
              <p className="text-gray-600 text-sm">AI Researcher & Data Scientist</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mike Chen</h3>
              <p className="text-gray-600 text-sm">UI/UX Designer & Frontend Expert</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12">
          <div className="text-center mb-8">
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Content</h3>
              <p className="text-gray-600">
                We prioritize accuracy, depth, and practical value in every article we publish.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                Building a supportive community where developers and tech enthusiasts can learn and grow together.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Staying at the forefront of technology trends and sharing cutting-edge insights.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl text-white p-8 text-center">
          <Mail className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Have questions, suggestions, or want to contribute? We'd love to hear from you.
          </p>
          <div className="space-y-2">
            <p className="text-blue-100">Email: contact@techblog.com</p>
            <p className="text-blue-100">Follow us for the latest updates and insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;