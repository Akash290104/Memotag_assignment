import React, { useEffect, useState } from "react";
import { Button } from "../src/components/ui/button";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import PieChart from "./components/PieChart";
import photo from "../src/components/avatar.jpg";
import { Activity, Brain, BellRing } from "lucide-react";
import dementiaCare from "../src/components/dementia_care.png";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faUsers,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";

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

  const solutions = [
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
  ];

  const tractions = [
    {
      icon: (
        <FontAwesomeIcon
          icon={faCartArrowDown}
          className="text-4xl text-blue-500"
        />
      ),
      topic: "10,000+ Preorders",
      desc: "We’ve received over 10,000 preorders, showing strong market interest.",
    },
    {
      icon: (
        <FontAwesomeIcon icon={faUsers} className="text-4xl text-green-500" />
      ),
      topic: "Impacting 5,000+ Families",
      desc: "MemoTag is currently helping over 5,000 families with dementia care.",
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faHandshake}
          className="text-4xl text-purple-500"
        />
      ),
      topic: "Partnerships with 20+ Hospitals",
      desc: " We’ve established partnerships with over 20 hospitals to improve dementia care.",
    },
  ];

  return (
    <main className="font-sans bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
      {/* Dark Mode Toggle  */}
      <div className="fixed top-4 right-4 z-50">
        <Button variant="ghost" onClick={() => setIsDark(!isDark)}>
          {isDark ? <Sun /> : <Moon />}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-16 bg-gradient-to-b from-white to-blue-500 dark:from-gray-900 dark:to-gray-800">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4 text-gray-800 dark:text-white"
        >
          Smarter Dementia Care with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl max-w-2xl mb-6 text-gray-600 dark:text-gray-300"
        >
          Empowering caregivers with AI-driven insights for better cognitive and
          physical care.
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
      </section>

      {/* Problem Section */}
      <section className="py-20  bg-emerald-100 dark:bg-gray-900 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-semibold mb-6"
          >
            The Dementia Diagnosis Crisis
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-12 max-w-3xl mx-auto"
          >
            Millions are living with dementia, but most go undiagnosed.
            Caregivers are left in the dark without real-time, personalized
            tools.
          </motion.p>

          <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <div className="bg-pink-300 dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  Diagnosis Gap Breakdown
                </h3>
                <div className=" h-[400px] w-full md:w-[400px] flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600 rounded-lg mx-auto">
                  <PieChart />
                </div>
              </div>
            </motion.div>

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
                  className="bg-blue-300 dark:bg-gray-800 shadow-lg rounded-xl p-6"
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
      <section className="py-20 px-6 bg-yellow-50 dark:bg-slate-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12 text-gray-800 dark:text-white">
            How MemoTag Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
      <section className="py-20 px-6 bg-indigo-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-800 dark:text-white mb-12">
            Our Impact So Far
          </h2>

          {/* Traction Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tractions.map((t) => (
              <motion.div
                className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center justify-center mb-4">
                  <i className="fas fa-cart-arrow-down text-4xl text-blue-500">
                    {t.icon}
                  </i>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  {t.topic}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{t.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <Button className="text-lg px-8 py-4">Learn More</Button>
          </div>
        </div>
      </section>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />

      {/* CTA Section */}
      <section id="cta" className="py-20 px-6 bg-pink-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl text-center md:text-4xl font-semibold text-gray-800 dark:text-white mb-4">
              Help Us Shape the Future of Care
            </h2>

            <div className="flex items-center justify-center">
              <h6 className="text-lg  mb-6 px-8 py-4 bg-yellow-500 text-white rounded-xl hover:bg-yellow-400 transition-all duration-300">
                Join the Waitlist!
              </h6>
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

          <div className="md:w-1/2">
            <img
              src={dementiaCare}
              alt="Dementia Support"
              className="w-55 h-55 object-cover rounded-full mx-auto shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Testimonials  */}

      <section className="py-20 px-6 bg-orange-100 text-gray-800 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-black dark:text-white">
            Loved by Caregivers
          </h2>

          <div className="grid items-center grid-cols-1 md:grid-cols-3 gap-8 ">
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
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-sm mx-auto"
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
