// Project: MemoTag Explainer Site
// Tech: ReactJS + TailwindCSS + Shadcn/UI + Supabase (for waitlist) + Dark Mode

import React, { useEffect, useState } from "react";
import { Button } from "../src/components/ui/button";
import { Card } from "../src/components/ui/card";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import PieChart from "./components/PieChart";
import photo from "../src/components/avatar.jpg";
import { Activity, Brain, BellRing } from "lucide-react";
import dementiaCare from "../src/components/dementia_care.png";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const App = () => {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Hi");

    try {
      const response = await axios.post(`${BASE_URL}/api/waitlist`, {
        email,
      });

      if (response?.data?.success) {
        setStatus("success");
        toast.success("Email added to the waitlist successfully");
      }
    } catch (error) {
      if (error.status == "409") {
        console.log("Email is already added to waitlist");
        setStatus("duplicate");
        toast.info("Email is already added to waitlist");
      } else {
        console.log("Something went wrong", error);
        setStatus("error");
        toast.error("Something went wrong");
      }
    } finally {
      setEmail("");
    }
  };

  return (
    <main className="font-sans bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
      {/* Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button variant="ghost" onClick={() => setIsDark(!isDark)}>
          {isDark ? <Sun /> : <Moon />}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10 min-h-screen w-full hidden dark:block [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        {/* Hero Content */}
        <div className="h-screen flex flex-col justify-center items-center text-center px-6 text-neutral-300">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4 text-gray-800 dark:text-white"
          >
            AI for Dementia Care
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl max-w-2xl mb-6 text-gray-600 dark:text-gray-300"
          >
            MemoTag empowers caregivers with AI-driven insights for better
            cognitive and physical care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              className="text-lg px-8 py-4 shadow-md rounded-xl"
              onClick={() => {
                const section = document.getElementById("cta");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Join the Waitlist
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            // viewport={{ once: true }}
            className="text-3xl md:text-5xl font-semibold mb-6"
          >
            The Dementia Diagnosis Crisis
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            // viewport={{ once: true }}
            className="text-lg md:text-xl mb-12 max-w-3xl mx-auto"
          >
            Millions are living with dementia, but most go undiagnosed.
            Caregivers are left in the dark without real-time, personalized
            tools.
          </motion.p>

          <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
            {/* Pie Chart Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              // viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  Diagnosis Gap Breakdown
                </h3>
                {/* Replace below div with your actual Pie Chart component */}
                <div className="h-[400px] w-full md:w-[500px] flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600 rounded-lg mx-auto">
                  <PieChart />
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-1 gap-8 w-full md:w-1/2">
              {[
                {
                  stat: "55M+",
                  desc: "People globally live with dementia",
                },
                {
                  stat: "60%",
                  desc: "Remain undiagnosed due to lack of early tools",
                },
                {
                  stat: "70%",
                  desc: "Caregivers report burnout & lack of support",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  // viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6"
                >
                  <h3 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {item.stat}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12 text-gray-800 dark:text-white">
            How MemoTag Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                topic: "Wearable Tracker",
                desc: "Continuously monitors movement, sleep, and vital signs to detect early cognitive decline.",
                icon: (
                  <Activity className="w-12 h-12 mx-auto text-indigo-600 dark:text-indigo-400 mb-4" />
                ),
              },
              {
                topic: "AI Cognitive Analysis",
                desc: "Processes user data using advanced algorithms to identify unusual patterns linked to dementia.",
                icon: (
                  <Brain className="w-12 h-12 mx-auto text-indigo-600 dark:text-indigo-400 mb-4" />
                ),
              },
              {
                topic: "Real-time Alerts",
                desc: "Notifies caregivers instantly about concerning trends or behaviors for prompt response.",
                icon: (
                  <BellRing className="w-12 h-12 mx-auto text-indigo-600 dark:text-indigo-400 mb-4" />
                ),
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="p-6 text-center shadow-xl rounded-2xl bg-white dark:bg-gray-800 hover:shadow-indigo-200 dark:hover:shadow-indigo-500/20 transition duration-300"
              >
                <motion.div
                  className="p-6 text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="flex flex-col items-center">
                    {step.icon}
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {step.topic}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Traction Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-800 dark:text-white mb-12">
            Our Impact So Far
          </h2>

          {/* Traction Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Preorders */}
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-cart-arrow-down text-4xl text-blue-500"></i>{" "}
                {/* Preorder Icon */}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                10,000+ Preorders
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We’ve received over 10,000 preorders, showing strong market
                interest.
              </p>
            </div>

            {/* Card 2: Impact */}
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-users text-4xl text-green-500"></i>{" "}
                {/* Impact Icon */}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                Impacting 5,000+ Families
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                MemoTag is currently helping over 5,000 families with dementia
                care.
              </p>
            </div>

            {/* Card 3: Partnerships */}
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-handshake text-4xl text-yellow-500"></i>{" "}
                {/* Partnership Icon */}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                Partnerships with 20+ Hospitals
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We’ve established partnerships with over 20 hospitals to improve
                dementia care.
              </p>
            </div>
          </div>

          {/* Optional CTA Button */}
          <div className="mt-12">
            <Button className="text-lg px-8 py-4">Learn More</Button>
          </div>
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={3000} />

      {/* CTA Section */}
      <section id="cta" className="py-20 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Text + Form */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl text-center md:text-4xl font-semibold text-gray-800 dark:text-white mb-4">
              Help Us Shape the Future of Care
            </h2>

            <div className="flex items-center justify-center">
              <Button className="text-lg  mb-6 px-8 py-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-400 transition-all duration-300">
                Join the Waitlist
              </Button>
            </div>
            <form
              className="space-y-4 flex flex-col"
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                type="email"
                placeholder="Your Email"
                className=" px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-black text-gray-800 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className=" bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300">
                Submit
              </Button>
            </form>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={dementiaCare}
              alt="Dementia Support"
              className="w-55 h-55 object-cover rounded-full mx-auto shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Optional: Testimonials or Badges */}

      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12">
            Loved by Caregivers
          </h2>

          <div className="flex  justify-center gap-8">
            {[
              {
                name: "Maria R.",
                text: "MemoTag changed how I care for my father. I get real-time updates and feel more connected to his well-being.",
              },
              {
                name: "James L.",
                text: "As a nurse, this is the kind of smart tech we’ve needed for years. It’s intuitive and powerful.",
              },
              {
                name: "Aria T.",
                text: "I was skeptical at first, but MemoTag’s insights have helped reduce so many emergencies.",
              },
            ].map((user, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-sm"
              >
                <img
                  src={photo}
                  alt={user.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="text-gray-700 dark:text-gray-300 italic mb-3">
                  "{user.text}"
                </p>
                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {user.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
