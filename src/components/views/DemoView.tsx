import React, { useState, useEffect } from 'react';
import { Database, Search } from 'lucide-react';
import { Feature, Phenotype } from '../../types';
import { PHENOTYPES, STUDY_DATASETS } from '../../constants';
import { ParticipantSidebar, PATIENTS_BY_DATASET } from '../workspace/ParticipantSidebar';
import { ImageViewer } from '../workspace/ImageViewer';
import { ResultsPanel } from '../workspace/ResultsPanel';
import { ReportModal } from '../workspace/ReportModal';
import { ASSETS } from '../shared/assets';

interface DemoViewProps {
  onNavigate: (route: string) => void;
}

export default function DemoView({ onNavigate }: DemoViewProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [overlays] = useState({
    landmarks: true,
    osteophytes: true,
    jsn: true
  });
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'before' | 'after'>('before');
  const [currentAnnotations, setCurrentAnnotations] = useState<any>(null);

  // Stateful results
  const [currentPhenotype, setCurrentPhenotype] = useState<Phenotype>({ ...PHENOTYPES[1], probability: Math.floor(80 + Math.random() * 20) });
  const [currentFeatures, setCurrentFeatures] = useState<Feature[]>([
    { name: "Medial Osteophyte", result: "Present", confidence: Math.floor((0.80 + Math.random() * 0.19) * 100) / 100 },
    { name: "Lateral Osteophyte", result: "Present", confidence: Math.floor((0.80 + Math.random() * 0.19) * 100) / 100 },
    { name: "Medial JSN", result: "Mild", confidence: Math.floor((0.80 + Math.random() * 0.19) * 100) / 100 },
    { name: "Lateral JSN", result: "Moderate", confidence: Math.floor((0.80 + Math.random() * 0.19) * 100) / 100 },
    { name: "Sclerosis", result: "None", confidence: Math.floor((0.80 + Math.random() * 0.19) * 100) / 100 },
  ]);

  const [activeScanType, setActiveScanType] = useState(0);
  const [dataset, setDataset] = useState(STUDY_DATASETS[0]);
  const [selectedPatientId, setSelectedPatientId] = useState("KL3HYK");

  useEffect(() => {
    let initialPatientId = "KL3HYK";
    let initialDataset = STUDY_DATASETS[0];

    const queryToken = localStorage.getItem("phenooa_s_query");
    if (queryToken) {
      // Clear so it doesn't linger on subsequent re-entries
      localStorage.removeItem("phenooa_s_query");
      
      let foundPatient = false;
      for (const ds of STUDY_DATASETS) {
        const patientsInDs = PATIENTS_BY_DATASET[ds] || [];
        const match = patientsInDs.find(p => p.id.toLowerCase() === queryToken.trim().toLowerCase());
        if (match) {
          initialPatientId = match.id;
          initialDataset = ds;
          foundPatient = true;
          break;
        }
      }

      if (!foundPatient) {
        const dsMatch = STUDY_DATASETS.find(ds => ds.toLowerCase() === queryToken.trim().toLowerCase());
        if (dsMatch) {
          initialDataset = dsMatch;
          const firstInDs = PATIENTS_BY_DATASET[dsMatch]?.[0];
          if (firstInDs) {
            initialPatientId = firstInDs.id;
          }
        }
      }
    }

    setDataset(initialDataset);
    setSelectedPatientId(initialPatientId);

    const activePatient = PATIENTS_BY_DATASET[initialDataset]?.find(p => p.id === initialPatientId);
    fetchPatientData(initialPatientId, false);
    if (activePatient && activePatient.status === 'Analyzed') {
      setShowResults(true);
      setViewMode('after');
    } else {
      setShowResults(false);
      setViewMode('before');
    }
  }, []); // Run once on mount

  const fetchPatientData = async (id: string, simulateDelay = false) => {
    try {
      if (simulateDelay) {
        setIsAnalyzing(true);
        setShowResults(false);
        setActiveScanType(Math.floor(Math.random() * 3));
      }
      
      const txtUrl = `https://raw.githubusercontent.com/tommyngx/img/refs/heads/main/SampleOAcheck/${id}.txt`;
      const response = await fetch(txtUrl);
      const data = await response.json();
      
      if (simulateDelay) {
        await new Promise(resolve => setTimeout(resolve, 2500));
      }
      
      if (data && data.diagnostic_labels) {
        setCurrentAnnotations(data);
        const phenoName = data.diagnostic_labels.phenotype || "Unknown";
        const found = PHENOTYPES.find(p => p.name === phenoName || p.name.replace(" and ", " & ") === phenoName);
        const phenotypeObj = found || { name: phenoName, probability: 80, color: "#8b5cf6" };
        setCurrentPhenotype({ ...phenotypeObj, name: phenoName, probability: Math.floor(82 + Math.random() * 16) });

        const labels = data.diagnostic_labels;
        const _cap = (str: string) => str ? String(str).charAt(0).toUpperCase() + String(str).slice(1) : "None";
        
        setCurrentFeatures([
          { name: "Medial Osteophyte", result: _cap(labels.medial_osteophyte), confidence: Math.floor((0.82 + Math.random() * 0.15) * 100) / 100 },
          { name: "Lateral Osteophyte", result: _cap(labels.lateral_osteophyte), confidence: Math.floor((0.82 + Math.random() * 0.15) * 100) / 100 },
          { name: "Medial JSN", result: _cap(labels.medial_jsn), confidence: Math.floor((0.82 + Math.random() * 0.15) * 100) / 100 },
          { name: "Lateral JSN", result: _cap(labels.lateral_jsn), confidence: Math.floor((0.82 + Math.random() * 0.15) * 100) / 100 },
          { name: "Sclerosis", result: _cap(labels.sclerosis), confidence: Math.floor((0.82 + Math.random() * 0.15) * 100) / 100 },
        ]);
      }

      if (simulateDelay) {
        setIsAnalyzing(false);
        setShowResults(true);
        setViewMode('after');
        
        // Update patient status to Analyzed on successful analysis
        const patients = PATIENTS_BY_DATASET[dataset];
        const patient = patients.find(p => p.id === id);
        if (patient) patient.status = 'Analyzed';
      }
    } catch (e) {
      console.error(e);
      if (simulateDelay) {
        setIsAnalyzing(false);
      }
    }
  };

  const handlePatientSelect = (id: string) => {
    setSelectedPatientId(id);
    setCurrentAnnotations(null);
    const patients = PATIENTS_BY_DATASET[dataset] || [];
    const patientObj = patients.find(p => p.id === id);
    fetchPatientData(id, false);
    if (patientObj && patientObj.status === 'Analyzed') {
      setShowResults(true);
      setViewMode('after');
    } else {
      setShowResults(false);
      setViewMode('before');
    }
  };

  const handleDatasetSelect = (newDataset: string) => {
    setDataset(newDataset);
    const firstPatient = PATIENTS_BY_DATASET[newDataset]?.[0];
    if (firstPatient) {
      handlePatientSelect(firstPatient.id);
    }
  };

  const startAnalysis = () => {
    fetchPatientData(selectedPatientId, true);
  };

  return (
    <div className="w-full text-text-primary bg-gradient-to-b from-bg-main via-bg-surface to-bg-main relative pb-24 min-h-screen animate-in fade-in duration-300">
      
      {/* Glow overlays matching other pages */}
      <div className="absolute top-24 left-[10%] w-[350px] h-[350px] bg-brand-electric/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[5%] w-[400px] h-[400px] bg-brand-glow/8 blur-[120px] pointer-events-none" />

      {/* Standardized Page Hero (Matching other views) */}
      <section className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto text-left relative z-10 space-y-4">
        <span className="text-[11px] font-bold tracking-[0.2em] text-brand-glow uppercase">
          [ Interactive Studio Preview ]
        </span>
        
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-text-primary leading-tight">
          OA Phenotyping <br />
          <span className="font-serif italic-heavy text-brand-glow">Interactive Studio</span>
        </h1>

        <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed font-light max-w-3xl">
          Experiment with deep model probabilities, automatic landmark placements, and joint space narrowing identification profiles on sample radiographs in real-time.
        </p>

        <div className="h-[1px] w-full bg-border-panel pt-4" />
      </section>

      {/* Three Column Clinical Stage Space */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
          <ParticipantSidebar 
            dataset={dataset} 
            setDataset={handleDatasetSelect} 
            selectedPatientId={selectedPatientId}
            onSelectPatient={handlePatientSelect}
          />
          <ImageViewer 
            isAnalyzing={isAnalyzing} 
            showResults={showResults}
            viewMode={viewMode}
            setViewMode={setViewMode}
            overlays={overlays} 
            startAnalysis={startAnalysis}
            scanType={activeScanType}
            dataset={dataset}
            selectedPatientId={selectedPatientId}
            annotations={currentAnnotations}
          />
          <ResultsPanel 
            isAnalyzing={isAnalyzing} 
            showResults={showResults} 
            currentPhenotype={currentPhenotype} 
            currentFeatures={currentFeatures} 
            setIsReportOpen={setIsReportOpen}
            annotations={currentAnnotations}
          />
        </div>
      </section>

      {/* Report Modal Mount */}
      <ReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
        currentPhenotype={currentPhenotype} 
        currentFeatures={currentFeatures}
        participantId={selectedPatientId}
        annotations={currentAnnotations}
      />

    </div>
  );
}
