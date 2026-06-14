import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const CountUp = ({ to, duration = 1, isPercent = true }: { to: number, duration?: number, isPercent?: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Math.floor(to * 105); // Adjust slightly to look natural
    const finalVal = Math.floor(to * 100);
    if (finalVal === 0) {
      setCount(0);
      return;
    }

    const timer = setInterval(() => {
      if (start < finalVal) {
        start += 1;
        setCount(start);
      } else {
        clearInterval(timer);
      }
    }, (duration * 1000) / (finalVal || 1));

    return () => clearInterval(timer);
  }, [to, duration]);

  return <span>{count}{isPercent ? '%' : ''}</span>;
};

export const Card = ({ title, icon: Icon, children, className = "", contentClassName = "" }: { title: string, icon: any, children: React.ReactNode, className?: string, contentClassName?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col ${className}`}
  >
    <div className="px-5 py-4 border-b border-slate-50 flex flex-shrink-0 items-center gap-3 bg-slate-50/30">
      <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
        <Icon className="w-4 h-4 text-teal-600" />
      </div>
      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">{title}</h3>
    </div>
    <div className={`p-5 flex-1 min-h-0 flex flex-col ${contentClassName}`}>
      {children}
    </div>
  </motion.div>
);
