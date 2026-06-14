import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, CheckCircle2, Dna, FileText } from 'lucide-react';
import { CountUp } from '../shared/UI';
import { Feature, Phenotype } from '../../types';

interface ResultsPanelProps {
  isAnalyzing: boolean;
  showResults: boolean;
  currentPhenotype: Phenotype;
  currentFeatures: Feature[];
  setIsReportOpen: (val: boolean) => void;
  annotations?: any;
}

export const ResultsPanel = ({ isAnalyzing, showResults, currentPhenotype, currentFeatures, setIsReportOpen, annotations }: ResultsPanelProps) => {
  return (
    <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0 flex flex-col lg:h-[calc(100vh-112px)] lg:sticky lg:top-[88px] pb-6 lg:pb-0 z-10 text-left">
      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center gap-4 flex-grow min-h-[400px] w-full"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-teal-100 border-t-teal-500 rounded-full animate-spin" />
              <Dna className="absolute inset-0 m-auto w-6 h-6 text-teal-600 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-1">Processing Image</h3>
              <p className="text-xs text-slate-400">Extracting structural biomarkers & phenotyping signatures...</p>
            </div>
          </motion.div>
        ) : !showResults ? (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center gap-4 flex-grow min-h-[400px] w-full"
          >
            <div className="relative w-16 h-16 mb-2 flex items-center justify-center mx-auto">
              <div className="absolute inset-0 bg-teal-400/30 rounded-full animate-ping animate-duration-2500"></div>
              <div className="relative w-full h-full bg-teal-50 flex items-center justify-center rounded-full border border-teal-200 shadow-sm">
                <Activity className="w-6 h-6 text-teal-500" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-1">System Ready</h3>
              <p className="text-xs text-slate-400 mt-2">Click <span className="font-bold text-slate-600">"RUN PHENOTYPE ANALYSIS"</span> on the image viewer to process this participant's scan.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col h-full overflow-hidden w-full flex-grow"
          >
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0 h-[73px]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                  <Activity className="w-4 h-4 text-teal-600" />
                </div>
                <h2 className="font-bold text-slate-800 text-sm tracking-tight">Analysis results</h2>
              </div>
              <div className="px-2 py-1 bg-teal-100 text-teal-700 text-[10px] font-bold rounded uppercase">Finalized</div>
            </div>

            <div className="p-5 space-y-5 overflow-y-auto flex-1 min-h-[200px] custom-scrollbar">
              <section>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Structural Phenotype</p>
                <div className="p-4 bg-slate-900 rounded-xl relative overflow-hidden group shadow-lg text-left">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-teal-500/20 transition-all" />
                  <div className="relative z-10">
                    <h4 className="text-teal-400 text-lg font-bold leading-tight mb-1 capitalize">
                      {currentPhenotype.name}
                    </h4>
                    <p className="text-slate-400 text-[10px] leading-relaxed">
                      {currentPhenotype.name === 'Body Size' 
                        ? 'Increased overall body size, associated with taller/heavier individuals and mild osteoarthritic features.'
                        : currentPhenotype.name === 'Global Atrophy'
                        ? 'Generalised cartilage thinning across both knees and hips, with limited symptom association but higher TKR risk.'
                        : currentPhenotype.name === 'Increased Cartilage'
                        ? 'Increased cartilage thickness in knees and hips, often linked with co-existing osteoarthritis features.'
                        : currentPhenotype.name === 'Hypertrophic Knee'
                        ? 'Prominent osteophyte formation with altered knee shape, associated with knee pain and high risk of TKR.'
                        : currentPhenotype.name === 'Knee Shape and Atrophy'
                        ? 'Changes in knee bone shape combined with cartilage thinning, reflecting structural knee degeneration.'
                        : currentPhenotype.name === 'End-stage Knee'
                        ? 'Advanced knee osteoarthritis with severe structural damage, strongly associated with knee pain and very high TKR risk.'
                        : 'Specific structural markers identified as primary driver of changes.'}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-teal-400" />
                        <span className="text-teal-400 text-[11px] font-bold">Confidence: <CountUp to={currentPhenotype.probability / 100} /></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-slate-500 font-bold tracking-wider">KL GRADE:</span>
                        <span className="text-sm font-black text-teal-400">{annotations?.diagnostic_labels?.kl_score ?? 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Radiographic Biomarkers</p>
                <div className="grid grid-cols-1 gap-1">
                  {currentFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 px-1 transition-colors text-left">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-semibold text-slate-700">{feature.name}</span>
                        <span className="text-[8px] text-slate-400 font-medium">Confidence Score: <CountUp to={feature.confidence} /></span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        feature.result === 'Severe' || feature.result === 'Present' 
                        ? 'bg-red-50 text-red-600' 
                        : feature.result === 'Moderate' 
                        ? 'bg-orange-50 text-orange-600' 
                        : 'bg-teal-50 text-teal-600'
                      }`}>
                        {feature.result}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="p-4 border-t border-slate-100 bg-white shrink-0 mt-auto"
            >
              <button 
                onClick={() => setIsReportOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                VIEW FULL REPORT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
