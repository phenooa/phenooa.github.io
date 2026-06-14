import React, { useState } from 'react';
import { Database, FileUp, ChevronLeft, Menu } from 'lucide-react';
import { STUDY_DATASETS } from '../../constants';

const BASE_PATIENTS = [
  "KL2KAA",  "KL3HYK", "KL3GLO", "KL3INC", "KL4END"
];

const generatePatients = (analyzedCount: number) => {
  // Make sure the first item is 'Pending' by assigning Analyzed from the end
  return BASE_PATIENTS.map((id, index) => ({
    id,
    visit: "Baseline",
    status: index >= BASE_PATIENTS.length - analyzedCount ? "Analyzed" : "Pending"
  }));
};

export const PATIENTS_BY_DATASET: Record<string, { id: string, visit: string, status: string }[]> = {
  [STUDY_DATASETS[0]]: generatePatients(3), // 3 analyzed
  [STUDY_DATASETS[1]]: generatePatients(1), // 1 analyzed
  [STUDY_DATASETS[2]]: generatePatients(4), // 4 analyzed
  [STUDY_DATASETS[3]]: generatePatients(2)  // 2 analyzed
};

export const ParticipantSidebar = ({ dataset, setDataset, selectedPatientId, onSelectPatient }: { dataset: string, setDataset: (d: string) => void, selectedPatientId: string, onSelectPatient: (id: string) => void }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const patients = PATIENTS_BY_DATASET[dataset] || PATIENTS_BY_DATASET[STUDY_DATASETS[0]];

  return (
    <div className={`shrink-0 flex flex-col gap-4 transition-all duration-300 lg:h-[calc(100vh-112px)] lg:sticky lg:top-[88px] z-10 ${isCollapsed ? 'lg:w-[72px] xl:w-[80px]' : 'lg:w-[260px] xl:w-[280px]'}`}>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full relative">
         <div className={`border-b border-slate-50 flex flex-shrink-0 items-center bg-slate-50/30 ${isCollapsed ? 'flex-col justify-center h-[73px] gap-1 py-1' : 'px-5 py-4 gap-3 h-[73px]'}`}>
           {!isCollapsed ? (
             <>
               <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm shrink-0">
                 <Database className="w-4 h-4 text-teal-600" />
               </div>
               <h2 className="font-bold text-slate-800 text-sm tracking-tight truncate pr-6 w-full text-left">Study images</h2>
             </>
           ) : (
             <>
               <button 
                 onClick={() => setIsCollapsed(!isCollapsed)}
                 className="text-slate-400 hover:text-slate-600 transition-colors bg-white hover:bg-slate-50 rounded-md p-1 shadow-sm border border-slate-100 z-10"
                 title="Expand Sidebar"
               >
                 <Menu className="w-3.5 h-3.5" />
               </button>
               <span className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter leading-none mt-1">Images</span>
             </>
           )}
           
           {!isCollapsed && (
             <button 
               onClick={() => setIsCollapsed(!isCollapsed)}
               className="text-slate-400 hover:text-slate-600 transition-colors bg-white hover:bg-slate-50 rounded-md p-1 border border-transparent hover:border-slate-200 z-10 absolute right-4 top-[24px] -translate-y-1/2 cursor-pointer"
               title="Collapse Sidebar"
             >
               <ChevronLeft className="w-4 h-4" />
             </button>
           )}
         </div>

         <div className={`flex flex-col flex-1 min-h-0 ${isCollapsed ? 'p-2 pt-3' : 'p-4 pt-4'} text-left`}>
           <div className={`flex flex-col gap-2 shrink-0 mb-4 z-0 relative ${isCollapsed ? 'items-center gap-1.5' : ''}`}>
             <p className={`text-slate-400 font-bold uppercase ${isCollapsed ? 'text-[8px] leading-none' : 'text-[10px]'}`}>Dataset</p>
             <select 
               value={dataset}
               onChange={(e) => setDataset(e.target.value)}
               className={`bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-teal-500/20 cursor-pointer text-xs font-semibold ${isCollapsed ? 'w-full px-1 py-1.5 text-center text-[9px] rounded-md truncate' : 'w-full px-2 py-2 rounded-lg'}`}
               title={dataset}
             >
               {STUDY_DATASETS.map(d => <option key={d} value={d}>{isCollapsed ? d.substring(0,4).toUpperCase() : d}</option>)}
             </select>
           </div>
           
           <div className={`flex flex-col shrink-0 mt-1 mb-2 ${isCollapsed ? 'items-center' : ''}`}>
             <div className={`flex items-center w-full ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
               {!isCollapsed && <p className="text-[10px] text-slate-400 font-bold uppercase">Participant List</p>}
               {isCollapsed ? (
                 <span className="text-[9px] font-bold text-slate-400">LIST</span>
               ) : (
                 <span className="text-[10px] font-bold text-slate-300">{patients.length} items</span>
               )}
             </div>
             {!isCollapsed && (
               <div className="flex items-center gap-2 mt-1.5">
                 <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-teal-400 transition-all duration-500" 
                     style={{ width: `${Math.round((patients.filter(p => p.status === 'Analyzed').length / patients.length) * 100) || 0}%` }} 
                   />
                 </div>
                 <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">
                   {Math.round((patients.filter(p => p.status === 'Analyzed').length / patients.length) * 100) || 0}% Analyzed
                 </span>
               </div>
             )}
           </div>

           <div className={`space-y-1 overflow-y-auto flex-1 min-h-[150px] custom-scrollbar pb-1 ${isCollapsed ? 'pr-0' : 'pr-1'}`}>
             {patients.map((p, i) => (
               <button 
                 key={i} 
                 onClick={() => onSelectPatient(p.id)}
                 className={`w-full flex items-center rounded-lg border transition-all cursor-pointer ${p.id === selectedPatientId ? 'bg-teal-50 border-teal-200 ring-1 ring-teal-200 shadow-sm' : 'bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-200'} ${isCollapsed ? 'flex-col justify-center gap-1.5 py-2 px-1' : 'justify-between p-2.5'}`}
                 title={p.id}
               >
                 {isCollapsed ? (
                   <>
                     <span className="text-[9px] font-bold text-slate-700 truncate max-w-full leading-none">{p.id.split('-').pop() || p.id}</span>
                     <span className={`w-2 h-2 rounded-full ${p.status === 'Analyzed' ? 'bg-teal-500' : 'bg-orange-400'}`} title={p.status} />
                   </>
                 ) : (
                   <>
                     <span className="text-[11px] font-bold text-slate-700">{p.id}</span>
                     <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold ${p.status === 'Analyzed' ? 'bg-teal-100 text-teal-700' : 'bg-orange-50 text-orange-600'}`}>
                       {p.status}
                     </span>
                   </>
                 )}
               </button>
             ))}
           </div>
           
           <div className="pt-4 shrink-0 border-t border-slate-100 mt-2 flex justify-center">
             <button className={`flex items-center justify-center gap-2 rounded-lg border border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors font-bold cursor-pointer ${isCollapsed ? 'w-full p-2' : 'w-full px-3 py-2.5 text-[11px]'}`} title="Import Dataset">
               <FileUp className={`${isCollapsed ? 'w-4 h-4 flex-shrink-0' : 'w-3.5 h-3.5'}`} />
               {!isCollapsed && "IMPORT DATASET"}
             </button>
           </div>
         </div>
      </div>
    </div>
  );
};
