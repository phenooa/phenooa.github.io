import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Search, Info, Download, AlertCircle } from 'lucide-react';
import { Feature, Phenotype } from '../../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhenotype: Phenotype;
  currentFeatures: Feature[];
  participantId?: string;
  annotations?: any;
}

export const ReportModal = ({ isOpen, onClose, currentPhenotype, currentFeatures, participantId = "REP-29384-XR", annotations }: ReportModalProps) => {
  const getParticipantSummary = (phenotypeName: string) => {
    switch (phenotypeName) {
      case "Body Size":
        return '"This knee X-ray shows bone changes often related to body size and weight distribution over time. The structural patterns indicate adaptation to increased load."';
      case "Global Atrophy":
        return '"This knee X-ray shows a general reduction in both bone and cartilage mass throughout the joint. In research, this overall thinning is known as a \'global atrophy\' pattern."';
      case "Increased Cartilage":
        return '"In contrast to typical wear and tear, this knee X-ray actually shows slightly thicker cartilage space than average in specific areas, a unique pattern we classify as \'increased cartilage\'."';
      case "Hypertrophic Knee":
        return '"This knee X-ray shows prominent bony growths and thickening of the bone around the joint edges. The joint is actively trying to stabilize itself by overgrowing bone."';
      case "Knee Shape and Atrophy":
        return '"This joint shows a combination of changes in the overall shape of the knee bones along with some cartilage thinning in specific contact areas."';
      case "End-stage Knee":
        return '"This knee X-ray shows severe structural changes, including significant loss of joint space and major bone alterations, which is characteristic of an advanced or end-stage pattern."';
      default:
        return '"The structural changes in your knee have been analyzed and categorized into a specific subgroup for this study."';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden max-h-[90vh] flex flex-col z-[110]"
          >
            <div className="px-5 md:px-8 py-5 md:py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 md:w-6 h-6 text-teal-600" />
                <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">Phenotype Report</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                aria-label="Close report"
              >
                <AlertCircle className="w-5 h-5 text-slate-400 rotate-45" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-8 md:space-y-10 font-sans text-left">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <div className="flex flex-col">
                  <span>System</span>
                  <span className="text-slate-900 text-xs mt-1 font-semibold">OA-Phenotype v0.7</span>
                </div>
                <div className="flex flex-col">
                  <span>Report ID</span>
                  <span className="text-slate-900 text-xs mt-1 font-semibold">REP-{participantId}</span>
                </div>
                <div className="flex flex-col">
                  <span>Generated</span>
                  <span className="text-slate-900 text-xs mt-1 font-semibold">June 14, 2026 - 09:35</span>
                </div>
                <div className="flex flex-col">
                  <span>Participant ID</span>
                  <span className="text-slate-900 text-xs mt-1 font-semibold text-teal-600">{participantId}</span>
                </div>
              </div>

              <section className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
                      <Search className="w-3 h-3 text-white" />
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-wider">Medical History</h3>
                  </div>
                  <div className="p-4 md:p-5 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed text-slate-700 text-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-slate-400 mb-2 uppercase text-[10px] tracking-wider">Demographics</h4>
                      <div className="space-y-1.5 list-inside text-sm font-medium">
                        <p><strong className="text-slate-900 font-bold">Age:</strong> {annotations?.patient_info?.age || 'N/A'}</p>
                        <p><strong className="text-slate-900 font-bold">Sex:</strong> <span className="capitalize">{annotations?.patient_info?.sex || 'N/A'}</span></p>
                        <p><strong className="text-slate-900 font-bold">BMI:</strong> {annotations?.patient_info?.bmi ? annotations.patient_info.bmi.toFixed(1) : 'N/A'} <span className="capitalize">({annotations?.patient_info?.bmi_group || 'N/A'})</span></p>
                      </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-400 mb-2 uppercase text-[10px] tracking-wider">Biomarkers</h4>
                        <div className="space-y-1.5 text-sm font-medium">
                            <p><strong className="text-slate-900 font-bold">Medial Osteophyte:</strong> <span className="capitalize">{annotations?.diagnostic_labels?.medial_osteophyte || 'N/A'}</span></p>
                            <p><strong className="text-slate-900 font-bold">Lateral Osteophyte:</strong> <span className="capitalize">{annotations?.diagnostic_labels?.lateral_osteophyte || 'N/A'}</span></p>
                            <p><strong className="text-slate-900 font-bold">Medial JSN:</strong> <span className="capitalize">{annotations?.diagnostic_labels?.medial_jsn || 'N/A'}</span></p>
                            <p><strong className="text-slate-900 font-bold">Lateral JSN:</strong> <span className="capitalize">{annotations?.diagnostic_labels?.lateral_jsn || 'N/A'}</span></p>
                            <p><strong className="text-slate-900 font-bold">Sclerosis:</strong> <span className="capitalize">{annotations?.diagnostic_labels?.sclerosis || 'N/A'}</span></p>
                        </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
                      <FileText className="w-3 h-3 text-white" />
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-wider">Observations</h3>
                  </div>
                  <div className="p-4 md:p-5 bg-slate-50 border border-slate-200 rounded-xl leading-relaxed text-slate-700 text-sm font-medium">
                    Image quality was assessed as <strong className="text-slate-900 font-bold">Acceptable</strong>. Automated anatomical localisation successfully identified a <strong className="text-slate-900 font-bold">Knee</strong> joint. 
                    The deep learning model identified structural hallmarks including {annotations?.diagnostic_labels?.medial_osteophyte ? `${annotations.diagnostic_labels.medial_osteophyte} medial osteophytes` : 'osteophytes'} and {annotations?.diagnostic_labels?.medial_jsn ? `${annotations.diagnostic_labels.medial_jsn} joint space narrowing` : 'JSN'} evaluating a Kellgren-Lawrence (KL) score of <strong className="text-teal-600 font-bold">{annotations?.diagnostic_labels?.kl_score ?? 'N/A'}</strong>. 
                    Based on these multi-feature structural signatures, the participant was assigned a <strong className="text-slate-900 font-bold">{currentPhenotype.name} phenotype</strong>. 
                  </div>
                </div>
              </section>

              <section>
                 <div className="flex items-center gap-2 mb-3 md:mb-4">
                  <div className="w-6 h-6 bg-teal-100 rounded-md flex items-center justify-center">
                    <Info className="w-3 h-3 text-teal-600" />
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-slate-900 uppercase tracking-wider">Notes</h3>
                </div>
                <div className="p-4 md:p-5 bg-teal-50 border border-teal-100 rounded-xl leading-relaxed text-teal-800 text-sm italic font-medium">
                  {getParticipantSummary(currentPhenotype.name)}
                </div>
              </section>

              <div className="pt-6 border-t border-slate-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[11px] md:text-xs text-slate-400 font-medium leading-relaxed italic">
                  <strong className="font-bold">Research Use Only Disclaimer:</strong> This automated report is generated for research purposes only. It is not intended for clinical diagnosis. Results should be interpreted by a qualified clinical investigator.
                </p>
              </div>
            </div>

            <div className="p-5 md:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3">
              <button 
                onClick={onClose}
                className="order-2 sm:order-1 flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 transition cursor-pointer"
              >
                Close
              </button>
              <button className="order-1 sm:order-2 flex-1 sm:flex-none px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
