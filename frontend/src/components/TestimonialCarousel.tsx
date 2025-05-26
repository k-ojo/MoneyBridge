
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    text: "I transferred money to my cousin in Germany in seconds. The rates are amazing and the process is so simple!",
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    location: "London, UK",
    rating: 5,
    text: "Best money transfer service I've used. Fast, reliable, and much cheaper than traditional banks.",
    avatar: "AH"
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    location: "Madrid, Spain",
    rating: 5,
    text: "Sending money to my family in Mexico has never been easier. The customer support is excellent too!",
    avatar: "MR"
  },
  {
    id: 4,
    name: "James Wilson",
    location: "Toronto, Canada",
    rating: 5,
    text: "Transparent fees, great exchange rates, and lightning-fast transfers. Highly recommended!",
    avatar: "JW"
  }
];

export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900 text-center">
        Trusted by <span className="text-blue-600">1M+</span> customers worldwide
      </h3>
      
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          
          <p className="text-gray-700 mb-4 italic text-lg leading-relaxed">
            "{currentTestimonial.text}"
          </p>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {currentTestimonial.avatar}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{currentTestimonial.name}</p>
              <p className="text-sm text-gray-600">{currentTestimonial.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex ? "bg-blue-600 w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
