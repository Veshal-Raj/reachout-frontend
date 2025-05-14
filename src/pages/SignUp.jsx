import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { registerUser } from '../api';
import { motion } from 'framer-motion'
import { User, Lock, Mail } from 'lucide-react';


const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = formData;

        if (!firstName || !lastName || !email || !password) {
            setError('All fields are required!');
            return;
        }

        try {
            const response = await registerUser(formData);
            console.log('response --- ', response)
            if (response?.status === 200 || response?.status === 201) {
                navigate("/login");
            } 
        } catch (error) {
            console.error(error);
            setError(error?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
         <>
            <Header />
            <div className="min-h-screen pt-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden z-0">
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
                    <div className="absolute top-0 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <motion.div 
                    className="relative z-10 w-full max-w-md backdrop-blur-xl bg-slate-800/50 rounded-2xl border border-white/10 p-8 shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="text-center mb-8">
                        <motion.h2 
                            className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            Create Account
                        </motion.h2>
                        <p className="text-white/60">Start your recruitment outreach journey</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-center mb-4 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-sm font-medium text-white/80 mb-2">First Name</label>
                            <div className="relative">
                                <User className="h-5 w-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30 placeholder-white/30 text-white backdrop-blur-sm"
                                    placeholder="John"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 }}
                        >
                            <label className="block text-sm font-medium text-white/80 mb-2">Last Name</label>
                            <div className="relative">
                                <User className="h-5 w-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30 placeholder-white/30 text-white backdrop-blur-sm"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="h-5 w-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30 placeholder-white/30 text-white backdrop-blur-sm"
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.45 }}
                        >
                            <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="h-5 w-5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/30 placeholder-white/30 text-white backdrop-blur-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                        >
                            Create Account
                        </motion.button>
                    </form>

                    <motion.div 
                        className="mt-6 text-center text-sm text-white/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Already have an account?{' '}
                        <a 
                            href="/login"
                            className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
                        >
                            Log in
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

export default Signup;
