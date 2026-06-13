import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { Heart, Leaf, Users, Star } from "lucide-react";
import * as Avatar from "@radix-ui/react-avatar";
import { useEffect, useState } from "react"; // 🆕
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {

  const { guestLogin } = useAuth();
const navigate = useNavigate();
const [isLoading, setIsLoading] = useState(false);

const handleTryDemo = async () => {
  setIsLoading(true);
  try {
    await guestLogin();  // 🔐 Logs in as anonymous user
    navigate("/dashboard");  // 🚀 Goes to dashboard
  } catch (err) {
    console.error("Guest login failed", err);
    alert("Demo login failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-yellow-50 to-orange-100 font-sans">
      <Header />

      {/* Language toggle button */}

      {/* Hero Section */}
<section
  className="container mx-auto px-4 py-20 bg-cover bg-center rounded-xl shadow-xl"
  style={{
    backgroundImage:
      "url('https://www.shutterstock.com/image-photo/food-products-recommended-osteoporosis-healthy-260nw-2596052607.jpg')",
  }}
>
  <div className="bg-white/80 p-10 rounded-xl backdrop-blur-sm">
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
      {/* Left Content */}
      <div className="text-center md:text-left">
        <div className="w-24 h-24 mx-auto md:mx-0 mb-6 bg-green-200 rounded-full flex items-center justify-center shadow-lg">
          <Leaf className="w-12 h-12 text-green-700" />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          NutriTrack 🌱
        </h1>
        <p className="text-2xl md:text-3xl text-green-700 font-medium mb-4">
          "Eat Wise, Live Better 🥗"
        </p>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl mx-auto md:mx-0">
          
            "Smart nutrition and food management for families. Track what you have, discover healthy meals, and build better eating habits together. 🥦🍽️"
          
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link to="/auth">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg shadow-md"
            >
              🚀 "Get Started"
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
            onClick={handleTryDemo}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "🎯 Try Demo"}
          </Button>

          {/* ✅ NEW BUTTON FOR ASHA WORKERS */}
  <Link to="/asha-login">
    <Button
      size="lg"
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 text-lg shadow-md"
    >
      🧑‍⚕️ For ASHA Workers
    </Button>
  </Link>
        </div>
      </div>
      <div className="hidden md:block">
  <img
    src="https://api.wezom.com/storage/cases/small/nJETVwFA1hUT4AoxmduaGwONY5PjkK2UofF8awek.jpg?v=1718188876"
    alt="NutriTrack Features"
    className="w-[1150px] h-[400px] object-cover rounded-xl shadow-xl"
  />
</div>

    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          💚 "Why Families Love NutriTrack"
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[{
            icon: <Heart className="w-8 h-8 text-red-500" />, bg: "bg-red-100",
            title: ("Smart Meal Planning 🍲"),
            desc: ("Get personalized meal suggestions based on what's already in your kitchen"),
          }, {
            icon: <Star className="w-8 h-8 text-yellow-500" />, bg: "bg-yellow-100",
            title: ("Fun Learning 🎮"),
            desc: ("Interactive quizzes and games that make nutrition education enjoyable for all ages"),
          }, {
            icon: <Users className="w-8 h-8 text-blue-600" />, bg: "bg-blue-100",
            title: ("Community Support 🤝"),
            desc: ("Connect with neighbors, share recipes, and learn from local health workers"),
          }, {
            icon: <Leaf className="w-8 h-8 text-purple-600" />, bg: "bg-purple-100",
            title: ("Local Language 🗣️"),
            desc: ("Available in your local language with culturally relevant food suggestions"),
          }].map((feature, idx) => (
            <Card
              key={idx}
              className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${feature.bg}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

          {/* Future Plan Section */}
<section className="container mx-auto px-4 py-20">
  <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
    🚀 What's Coming Next?
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    {[
      {
        icon: "🤖",
        title: "AI Chatbot",
        desc: "Get instant diet tips and personalized advice with voice support in your local language.",
      },
      {
        icon: "🛒",
        title: "NutriMarket",
        desc: "Shop locally sourced nutritious foods and organic products easily through our app.",
      },
      {
        icon: "📊",
        title: "Health Tracker",
        desc: "Track family health metrics, monitor growth, and receive alerts for better nutrition planning.",
      },
      {
        icon: "🎓",
        title: "Learning Hub",
        desc: "Exclusive courses for ASHA & Anganwadi workers with badges, certificates, and rewards.",
      },
    ].map((feature, idx) => (
      <Card
        key={idx}
        className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl hover:scale-105 transition-transform duration-300"
      >
        <CardContent className="p-6 text-center">
          <div className="text-5xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2">
            {feature.title}
            <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              Coming Soon
            </span>
          </h3>
          <p className="text-gray-600">{feature.desc}</p>
        </CardContent>
      </Card>
    ))}
  </div>
</section>

      {/* Dashboard Preview Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
           "Preview Your Dashboard"
        </h2>
        <div className="flex justify-center">
          <img
            src="/dashboard-preview.png"
            alt="Dashboard Preview"
            className="max-w-full w-full h-auto rounded-xl shadow-lg"
          />
        </div>
        <p className="text-center text-lg text-gray-600 mt-6">
          "See how easy it is to track your food and plan your meals with NutriTrack."
        </p>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-4xl font-bold mb-4">
      🌟 Ready to Transform Your Family's Nutrition?
    </h2>
    <p className="text-xl mb-8 opacity-90">
      Join thousands of families already eating better with NutriTrack 🧘‍♀️🍏
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link to="/auth">
        <Button
          size="lg"
          className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
        >
          🌍 Start Your Journey Today
        </Button>
      </Link>
      <Link to="/contact">
        <Button
          variant="outline"
          size="lg"
          className="bg-white text-green-700 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
        >
          📞 Contact Us
        </Button>
      </Link>
    </div>
  </div>
</section>

      <footer className="bg-gray-900 text-white py-10 mt-10">
  <div className="container mx-auto px-4 text-center space-y-4">
    <Avatar.Root className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-300 mx-auto shadow-md">
      <Avatar.Image
        className="rounded-full w-full h-full object-cover"
        src="https://cdn-icons-png.flaticon.com/512/8098/8098917.png"
        alt="NutriTrack Logo"
      />
      <Avatar.Fallback>NT</Avatar.Fallback>
    </Avatar.Root>

    <p className="text-gray-400 text-sm">
      © 2024 <span className="font-semibold text-white">NutriTrack</span>. Empowering every family to eat wise and live better. 💚
    </p>

      
    <div className="flex flex-wrap justify-center gap-6 text-sm">
  {[
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
  ].map((link) => (
    <Link
      key={link.name}
      to={link.path}
      className="text-gray-400 hover:text-green-400 transition-colors"
    >
      {link.name}
    </Link>
  ))}
</div>
  </div>
</footer>

    </div>
  );
};

export default Index;
