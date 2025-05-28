import React from 'react'
import { motion } from 'framer-motion'

const StatCard = ({ value, label }) => {
  return (
    <motion.div 
    className="text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    data-testid="stat-card"
  >
    <h3 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{value}</h3>
    <p className="text-white/70 mt-2">{label}</p>
  </motion.div>
  )
}

export default StatCard