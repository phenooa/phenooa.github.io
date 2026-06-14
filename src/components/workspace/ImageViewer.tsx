import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2 } from 'lucide-react';
import { ASSETS } from '../shared/assets';

interface ImageViewerProps {
  isAnalyzing: boolean;
  showResults: boolean;
  viewMode: 'before' | 'after';
  setViewMode: (mode: 'before' | 'after') => void;
  overlays: any;
  startAnalysis: () => void;
  scanType: number;
  dataset: string;
  selectedPatientId: string;
  annotations?: any;
}

const DATASET_STATS: Record<string, { analysed: string, count: string, qc: string }> = {
  "RESTORE": { analysed: "85%", count: "1,295", qc: "98%" },
  "MESKO": { analysed: "62%", count: "3,104", qc: "95%" },
  "SCULPTURE": { analysed: "12%", count: "60", qc: "100%" },
  "OAI": { analysed: "99%", count: "4,749", qc: "98%" }
};

export const ImageViewer = ({ isAnalyzing, showResults, viewMode, setViewMode, overlays, startAnalysis, scanType, dataset, selectedPatientId, annotations }: ImageViewerProps) => {
  const imageUrl = `https://raw.githubusercontent.com/tommyngx/img/refs/heads/main/SampleOAcheck/${selectedPatientId}.png`;
  const currentImage = viewMode === 'after'
    ? imageUrl // Fallback to same image if we don't have annotated versions
    : imageUrl;
    
  return (
    <div className="flex-1 min-w-0 flex flex-col gap-4 lg:sticky lg:top-[88px] lg:h-[calc(100vh-112px)] w-full">
      <div className="flex items-center px-5 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm h-[73px] shrink-0 text-left">
        <AnimatePresence mode="wait">
          {annotations?.patient_info ? (
            <motion.div 
              key="loaded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-6 overflow-x-auto pr-2 custom-scrollbar w-full"
            >
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Age:</span>
                <span className="text-sm font-semibold text-slate-700">{annotations.patient_info.age}</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-slate-200 shrink-0" />
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sex:</span>
                <span className="text-sm font-semibold text-slate-700 capitalize">{annotations.patient_info.sex}</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-slate-200 shrink-0" />
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">BMI:</span>
                <span className="text-sm font-semibold text-slate-700">{annotations.patient_info.bmi.toFixed(1)}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-teal-50 text-teal-600 ml-1">{annotations.patient_info.bmi_group}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-6 overflow-x-auto pr-2 custom-scrollbar w-full"
            >
              <div className="flex items-center gap-2 shrink-0 opacity-50">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Age:</span>
                <div className="w-6 h-4 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="hidden sm:block h-4 w-px bg-slate-200 shrink-0 opacity-50" />
              <div className="flex items-center gap-2 shrink-0 opacity-50">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Sex:</span>
                <div className="w-10 h-4 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="hidden sm:block h-4 w-px bg-slate-200 shrink-0 opacity-50" />
              <div className="flex items-center gap-2 shrink-0 opacity-50">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">BMI:</span>
                <div className="w-8 h-4 bg-slate-200 rounded animate-pulse" />
                <div className="w-16 h-5 bg-teal-50 rounded animate-pulse ml-1" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative flex-1 min-h-[350px] bg-black rounded-2xl overflow-hidden border border-slate-800 group shadow-lg flex flex-col items-center justify-center">
        <img 
          src={currentImage} 
          alt="Knee Radiograph" 
          className="absolute inset-0 w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
        
        {viewMode === 'after' && annotations && showResults && (
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 ${annotations.image_size.width} ${annotations.image_size.height}`}
          >
            {/* JSN Overlays */}
            {overlays.jsn && annotations.joint_space_narrowing && (
              <>
                {annotations.joint_space_narrowing.medial_jsn && (
                   <polygon 
                     points={annotations.joint_space_narrowing.medial_jsn.polygon_points.map((p: any) => `${p.x},${p.y}`).join(' ')}
                     fill="rgba(255, 190, 0, 0.3)"
                     stroke="rgba(255, 190, 0, 1)"
                     strokeWidth="2"
                     strokeLinejoin="round"
                     className="transition-all duration-300 drop-shadow-md"
                   />
                )}
                {annotations.joint_space_narrowing.lateral_jsn && (
                   <polygon 
                     points={annotations.joint_space_narrowing.lateral_jsn.polygon_points.map((p: any) => `${p.x},${p.y}`).join(' ')}
                     fill="rgba(0, 210, 255, 0.3)"
                     stroke="rgba(0, 210, 255, 1)"
                     strokeWidth="2"
                     strokeLinejoin="round"
                     className="transition-all duration-300 drop-shadow-md"
                   />
                )}
              </>
            )}

            {/* Osteophytes */}
            {overlays.osteophytes && annotations.osteophytes && annotations.osteophytes.map((ost: any, idx: number) => (
              <g key={`ost-${idx}`} className="transition-all duration-300 drop-shadow-sm group-hover:drop-shadow-md cursor-pointer pointer-events-auto">
                <polygon 
                  points={ost.contour_points.map((p: any) => `${p.x},${p.y}`).join(' ')}
                  fill={`rgba(${ost.rgb.join(',')}, 0.45)`}
                  stroke={`rgb(${ost.rgb.join(',')})`}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </g>
            ))}

            {/* Landmarks / Points */}
            {overlays.landmarks && annotations.points && (
              <>
                {/* Draw connections */}
                {[
                  { start: 0, end: 44, color: "rgb(0, 180, 255)" },
                  { start: 45, end: 95, color: "rgb(255, 200, 0)" },
                  { start: 96, end: 119, color: "rgb(255, 120, 220)" },
                  { start: 120, end: 128, color: "rgb(0, 180, 255)" }
                ].map((group, gIdx) => {
                  const paths = [];
                  for (let i = group.start; i < group.end; i++) {
                    if (i === 85 || i === 90) continue; // Skip connections 85-86, 90-91
                    const p1 = annotations.points.find((p: any) => p.index === i);
                    const p2 = annotations.points.find((p: any) => p.index === i + 1);
                    if (p1 && p2) {
                      paths.push(
                        <line 
                          key={`line-${gIdx}-${i}`} 
                          x1={p1.x} y1={p1.y} 
                          x2={p2.x} y2={p2.y} 
                          stroke={group.color} 
                          strokeWidth="2" 
                        />
                      );
                    }
                  }
                  return <g key={`group-${gIdx}`}>{paths}</g>;
                })}
                
                {/* Draw points */}
                {annotations.points.map((p: any, idx: number) => {
                  const isMainPoint = [0, 44, 41, 3, 8, 16, 22, 36, 27, 45, 95, 50, 60, 70, 80, 85, 90, 96, 119, 100, 108, 114, 120, 128, 122, 124, 126].includes(p.index);
                  
                  let fill = "rgb(0, 255, 0)";
                  if (isMainPoint) {
                    if (p.index <= 44) fill = "rgb(0, 0, 255)";
                    else if (p.index <= 95) fill = "rgb(255, 120, 0)";
                    else if (p.index <= 119) fill = "rgb(255, 0, 180)";
                    else fill = "rgb(0, 140, 255)";
                  }

                  return (
                    <g key={`pt-${idx}`}>
                      <circle 
                        cx={p.x} cy={p.y} 
                        r={isMainPoint ? "6" : "3"} 
                        fill={fill} 
                        className="transition-all duration-300 drop-shadow-sm" 
                      />
                      {isMainPoint && (
                        <circle cx={p.x} cy={p.y} r="8" fill="none" stroke="white" strokeWidth="1" />
                      )}
                    </g>
                  );
                })}
              </>
            )}
          </svg>
        )}
        
        {/* Randomized Scanning Effects */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {scanType === 0 && (
              /* Type 0: Neural Horizontal Sweep */
              <motion.div 
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                className="absolute left-0 right-0"
              >
                <div className="h-40 w-full bg-gradient-to-b from-transparent via-teal-400/30 to-transparent relative">
                  <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-teal-300 shadow-[0_0_40px_rgba(45,212,191,1)]" />
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-teal-500 text-teal-950 px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-tighter shadow-2xl flex items-center gap-1.5 border border-white/20">
                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                    DEEP SCAN
                  </div>
                </div>
              </motion.div>
            )}

            {scanType === 1 && (
              /* Type 1: Radial Pulse Shimmer */
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 2], opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.5, ease: "easeOut", repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square border-[20px] border-white/10 rounded-full shadow-[0_0_100px_rgba(255,255,255,0.2)]"
              />
            )}

            {scanType === 2 && (
              /* Type 2: Vertical Laser Slicer */
              <motion.div 
                initial={{ left: "-10%" }}
                animate={{ left: "110%" }}
                transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent"
              >
                <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-teal-400 shadow-[0_0_30px_rgba(45,212,191,1)]" />
                <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-teal-500/50 text-teal-400 text-[6px] font-black p-1 rounded vertical-text tracking-widest leading-none">
                  AI_SLICE
                </div>
              </motion.div>
            )}
            
            <div className="absolute inset-0 bg-teal-500/5 animate-pulse mix-blend-overlay" />
          </div>
        )}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900/40 backdrop-blur-md p-1 rounded-full border border-slate-700 z-30">
          <button 
            onClick={() => setViewMode('before')}
            className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-all cursor-pointer ${viewMode === 'before' ? 'bg-teal-500 text-teal-950 shadow-lg font-black' : 'text-slate-300 hover:text-white'}`}
          >
            BEFORE
          </button>
          <button 
            onClick={() => {
              if (showResults) setViewMode('after');
            }}
            disabled={!showResults}
            className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-all cursor-pointer ${viewMode === 'after' ? 'bg-teal-500 text-teal-950 shadow-lg font-black' : 'text-slate-300 hover:text-white'} ${!showResults ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            AFTER
          </button>
        </div>

        <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-30">
           <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">ID:</span>
              <span className="text-xs font-semibold text-white tracking-wide">{selectedPatientId}</span>
           </div>
           <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Visit:</span>
              <span className="text-xs font-semibold text-white">BASELINE</span>
           </div>
           <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Laterality:</span>
              <span className="text-xs font-semibold text-white">RIGHT KNEE</span>
           </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-slate-200 rounded-xl p-4 shadow-sm gap-4 text-left">
        <div className="flex items-start sm:items-center gap-4 md:gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Image Source</span>
            <span className="text-xs font-semibold text-slate-700">{selectedPatientId}</span>
          </div>
          <div className="flex flex-col mt-0.5 sm:mt-0">
          </div>
        </div>
        <div className="flex w-full sm:w-auto">
          <button 
            onClick={startAnalysis}
            disabled={isAnalyzing}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-all text-xs font-bold shadow-lg shadow-teal-900/10 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                ANALYZING...
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                RUN PHENOTYPE ANALYSIS
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
