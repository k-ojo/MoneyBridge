import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Shield, MessageCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            toast({
                title: "Message sent!",
                description: "We'll get back to you within 24 hours.",
            });
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 2000);
    };

    const handleEmailSupport = () => {
        window.location.href = "mailto:support@moneybridge.com";
    };

    const handlePhoneSupport = () => {
        window.location.href = "tel:+18005551234";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <header className="px-6 py-4 bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">MB</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Money Bridge</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Support</h1>
                    <p className="text-lg text-gray-600">We're here to help with all your money transfer needs</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <Card className="border-blue-200 shadow-lg">
                        <CardHeader className="bg-blue-50 border-b border-blue-200">
                            <CardTitle className="text-blue-800 flex items-center">
                                <Shield className="w-5 h-5 mr-2" />
                                Send us a Message
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="What can we help you with?"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        placeholder="Tell us more about your inquiry..."
                                        rows={5}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Options */}
                    <div className="space-y-6">
                        <Card className="border-green-200">
                            <CardContent className="p-6 text-center">
                                <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
                                <p className="text-gray-600 text-sm mb-4">
                                    Speak directly with our support team
                                </p>
                                <p className="text-gray-700 mb-4">Monday - Friday: 8AM - 8PM EST</p>
                                <Button
                                    onClick={handlePhoneSupport}
                                    className="w-full bg-green-600 hover:bg-green-700"
                                >
                                    +1-800-555-1234
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-indigo-200">
                            <CardContent className="p-6 text-center">
                                <Mail className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                                <p className="text-gray-600 text-sm mb-4">
                                    Send us a detailed message
                                </p>
                                <p className="text-gray-700 mb-4">Response within 24 hours</p>
                                <Button
                                    onClick={handleEmailSupport}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                                >
                                    support@moneybridge.com
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">🔒 Getting Started</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                                <li>• Account setup and verification</li>
                                <li>• Transfer limits and fees</li>
                                <li>• Security and compliance questions</li>
                                <li>• Technical support and troubleshooting</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;