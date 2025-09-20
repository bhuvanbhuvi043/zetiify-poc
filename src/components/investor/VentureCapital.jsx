import React, { useState, useEffect, useRef } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Autocomplete, Chip, Dialog, DialogTitle, DialogContent, DialogActions, ListSubheader } from "@mui/material";
import { X, Trash2, Search, ChevronDown, Plus, Eye } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';

const VentureCapital = () => {
  const [activeTab, setActiveTab] = useState("");
  const [selectedProgress, setSelectedProgress] = useState(0); const [selectedinvestingAs, setSelectedinvestingAs] = useState("");
  const [showinvestingAsDropdown, setShowinvestingAsDropdown] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [hasSavedData, setHasSavedData] = useState(false);

  const navigate = useNavigate()
  // Step 2 state
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedGeographies, setSelectedGeographies] = useState([]);
  const [selectedBusinessModels, setSelectedBusinessModels] = useState([]);

  const [formData, setFormData] = useState({
    entityName: "",
    website: "",
    ticketSize: "",
    annualDeployment: "",
    targetOwnership: "",
    investmentPace: "",
    residency: "",
    linkedInUrl: "",
    ventureRegistration: "",
    sebiDoc: null,
  });

  const ownershipData = ['Lead', 'Co-Lead', 'Follow', 'Syndicate'];
  const ticketSizeData = ['5cr - 10cr', '10cr - 15cr'];
  const rolePreferenceData = ['Founder', 'Co-Founder'];
  const residencyData = ["India", "US", "UK", "China"];


  // Step 2 data
  const instrumentsData = ['Equity', 'Debt', 'SAFE/Convertible'];
  const sectorsData = ['SaaS', 'AI/ML', 'Fintech', 'HealthTech', 'EV', 'D2C'];
  const stagesData = ['Idea', 'Early', 'Growth'];
  const geographiesData = ['India', 'US', 'UK', 'China', 'Taiwan', 'Vietnam'];
  const businessModelsData = ['B2B', 'B2C', 'B2B2C', 'Enterprise', 'SMB', 'Consumer'];

  // State for search terms
  const [searchTerm, setSearchTerm] = useState({
    instruments: '',
    sectors: '',
    stages: '',
    geographies: '',
    businessModels: ''
  });

  // Filtered data based on search
  const [filteredData, setFilteredData] = useState({
    instruments: instrumentsData,
    sectors: sectorsData,
    stages: stagesData,
    geographies: geographiesData,
    businessModels: businessModelsData
  });

  // Add this state at the top of your component
  const [newOptions, setNewOptions] = useState({
    instruments: [],
    sectors: [],
    stages: [],
    geographies: [],
    businessModels: []
  });


  // State to track dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState({
    instruments: false,
    sectors: false,
    stages: false,
    geographies: false,
    businessModels: false
  });

  // Toggle dropdown visibility
  const toggleDropdown = (field, e) => {
    e?.preventDefault();
    setDropdownOpen(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setDropdownOpen({
      instruments: false,
      sectors: false,
      stages: false,
      geographies: false,
      businessModels: false
    });
  };

  // Create refs for each dropdown container
  const instrumentsRef = useRef(null);
  const sectorsRef = useRef(null);
  const stagesRef = useRef(null);
  const geographiesRef = useRef(null);
  const businessModelsRef = useRef(null);


  // Step 3 state
  const [pastInvestments, setPastInvestments] = useState([
    { companyName: '', stage: '', year: '' }
  ]);
  const [publicLinks, setPublicLinks] = useState('');

  // Stage options for past investments
  const investmentStageData = ['Idea', 'Early', 'Growth', 'Late', 'Exit'];

  // Year options (last 20 years)
  const yearData = Array.from({ length: 20 }, (_, i) => (new Date().getFullYear() - i).toString());

  // Add new investment field
  const addInvestmentField = () => {
    setPastInvestments([...pastInvestments, { companyName: '', stage: '', year: '' }]);
  };

  const [profileVisibility, setProfileVisibility] = useState("");
  const [minimumTraction, setMinimumTraction] = useState("");
  const [pitchCompleteness, setPitchCompleteness] = useState("");


  // Step 4 visibility options
  const visibilityOptions = ['Public', 'Private', 'Anonymous'];

  // Step 4 traction options
  const tractionOptions = ['1K+ users', '10K+ users', '100K+ users', '1M+ users'];

  // Step 4 completeness options
  const completenessOptions = ['20%', '40%', '60%', '80%', '100%'];


  // Step 5 state - team members
  const [teamMembers, setTeamMembers] = useState([
    { fullName: '', role: '', email: '', linkedInUrl: '' }
  ]);

  // Add new team member
  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { fullName: '', role: '', email: '', linkedInUrl: '' }]);
  };

  // Remove team member
  const removeTeamMember = (index) => {
    if (teamMembers.length > 1) {
      const updatedTeamMembers = [...teamMembers];
      updatedTeamMembers.splice(index, 1);
      setTeamMembers(updatedTeamMembers);
    }
  };

  // Handle team member field changes
  const handleTeamMemberChange = (index, field, value) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index][field] = value;
    setTeamMembers(updatedTeamMembers);
  };

  const resetForm = () => {
    setFormData({
      entityName: "",
      website: "",
      ticketSize: "",
      annualDeployment: "",
      targetOwnership: "",
      investmentPace: "",
      residency: "",
      linkedInUrl: "",
      ventureRegistration: "",
      sebiDoc: null,
    });

    setSelectedInstruments([]);
    setSelectedSectors([]);
    setSelectedStages([]);
    setSelectedGeographies([]);
    setSelectedBusinessModels([]);

    setPastInvestments([{ companyName: '', stage: '', year: '' }]);
    setPublicLinks('');

    // Reset team members
    setTeamMembers([{ fullName: '', role: '', email: '', linkedInUrl: '' }]);

    setProfileVisibility("");
    setMinimumTraction("");
    setPitchCompleteness("");

    setSelectedProgress(0); // Reset to first step
  };
  // Remove investment field
  const removeInvestmentField = (index) => {
    if (pastInvestments.length > 1) {
      const updatedInvestments = [...pastInvestments];
      updatedInvestments.splice(index, 1);
      setPastInvestments(updatedInvestments);
    }
  };

  // Handle investment field changes
  const handleInvestmentChange = (index, field, value) => {
    const updatedInvestments = [...pastInvestments];
    updatedInvestments[index][field] = value;
    setPastInvestments(updatedInvestments);
  };
  // Handle search input changes
  const handleSearchChange = (field, value) => {
    setSearchTerm(prev => ({ ...prev, [field]: value }));

    const filtered = {
      instruments: [...instrumentsData, ...newOptions.instruments].filter(item =>
        item.toLowerCase().includes(value.toLowerCase())),
      sectors: [...sectorsData, ...newOptions.sectors].filter(item =>
        item.toLowerCase().includes(value.toLowerCase())),
      stages: [...stagesData, ...newOptions.stages].filter(item =>
        item.toLowerCase().includes(value.toLowerCase())),
      geographies: [...geographiesData, ...newOptions.geographies].filter(item =>
        item.toLowerCase().includes(value.toLowerCase())),
      businessModels: [...businessModelsData, ...newOptions.businessModels].filter(item =>
        item.toLowerCase().includes(value.toLowerCase()))
    };

    setFilteredData(prev => ({ ...prev, [field]: filtered[field] }));
  };



  // Add this function to handle adding new options
  // Add this function to handle adding new options
  const handleAddNewOption = (field, value) => {
    if (!value.trim()) return;

    // Check if the value already exists (case insensitive)
    const allOptions = [...filteredData[field]];
    const exists = allOptions.some(opt =>
      opt.toLowerCase() === value.toLowerCase()
    );

    if (exists) return; // Don't add duplicates

    setNewOptions(prev => ({
      ...prev,
      [field]: [...prev[field], value]
    }));

    // Add to selected values
    switch (field) {
      case 'instruments':
        setSelectedInstruments(prev => [...prev, value]);
        break;
      case 'sectors':
        setSelectedSectors(prev => [...prev, value]);
        break;
      case 'stages':
        setSelectedStages(prev => [...prev, value]);
        break;
      case 'geographies':
        setSelectedGeographies(prev => [...prev, value]);
        break;
      case 'businessModels':
        setSelectedBusinessModels(prev => [...prev, value]);
        break;
      default:
        break;
    }

    setSearchTerm(prev => ({ ...prev, [field]: '' }));
    setFilteredData(prev => ({
      ...prev,
      [field]: [...prev[field], value]
    }));
  };

  // Modify the search input to handle Enter key
  const handleKeyDown = (field, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchTerm[field] && !filteredData[field].some(item =>
        item.toLowerCase() === searchTerm[field].toLowerCase()
      )) {
        handleAddNewOption(field, searchTerm[field]);
        setDropdownOpen(prev => ({ ...prev, [field]: false }));
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileData = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      };

      setFormData(prev => ({
        ...prev,
        sebiDoc: file,
        sebiDocMeta: fileData // Store metadata separately
      }));
    }
  };

  const handleRemoveSebiDoc = () => {
    setFormData((prev) => ({
      ...prev,
      sebiDoc: null,
    }));
  };

  // Step 2 handlers with event prevention
  const handleInstrumentSelect = (instrument, e) => {
    e?.preventDefault();
    setSelectedInstruments(prev =>
      prev.includes(instrument)
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument]
    );
  };

  const handleSectorSelect = (sector, e) => {
    e?.preventDefault();
    setSelectedSectors(prev =>
      prev.includes(sector)
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    );
  };

  const handleStageSelect = (stage, e) => {
    e?.preventDefault();
    setSelectedStages(prev =>
      prev.includes(stage)
        ? prev.filter(s => s !== stage)
        : [...prev, stage]
    );
  };

  const handleGeographySelect = (geo, e) => {
    e?.preventDefault();
    setSelectedGeographies(prev =>
      prev.includes(geo)
        ? prev.filter(g => g !== geo)
        : [...prev, geo]
    );
  };

  const handleBusinessModelSelect = (model, e) => {
    e?.preventDefault();
    setSelectedBusinessModels(prev =>
      prev.includes(model)
        ? prev.filter(m => m !== model)
        : [...prev, model]
    );
  };

  useEffect(() => {
    const savedData = localStorage.getItem('ventureCapitalForm');
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // Restore form data
      setFormData(parsedData.formData || {
        entityName: "",
        website: "",
        ticketSize: "",
        annualDeployment: "",
        targetOwnership: "",
        investmentPace: "",
        residency: "",
        linkedInUrl: "",
        ventureRegistration: "",
        sebiDoc: null,
      });

      // Restore investment preferences
      setSelectedInstruments(parsedData.selectedInstruments || []);
      setSelectedSectors(parsedData.selectedSectors || []);
      setSelectedStages(parsedData.selectedStages || []);
      setSelectedGeographies(parsedData.selectedGeographies || []);
      setSelectedBusinessModels(parsedData.selectedBusinessModels || []);

      // Restore past investments
      setPastInvestments(parsedData.pastInvestments || [{ companyName: '', stage: '', year: '' }]);
      setPublicLinks(parsedData.publicLinks || '');

      // Restore visibility settings
      setProfileVisibility(parsedData.profileVisibility || "");
      setMinimumTraction(parsedData.minimumTraction || "");
      setPitchCompleteness(parsedData.pitchCompleteness || "");

      // Restore current step
      if (parsedData.currentStep) {
        setSelectedProgress(parsedData.currentStep);
      }
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (instrumentsRef.current && !instrumentsRef.current.contains(event.target)) {
        setDropdownOpen(prev => ({ ...prev, instruments: false }));
      }
      if (sectorsRef.current && !sectorsRef.current.contains(event.target)) {
        setDropdownOpen(prev => ({ ...prev, sectors: false }));
      }
      if (stagesRef.current && !stagesRef.current.contains(event.target)) {
        setDropdownOpen(prev => ({ ...prev, stages: false }));
      }
      if (geographiesRef.current && !geographiesRef.current.contains(event.target)) {
        setDropdownOpen(prev => ({ ...prev, geographies: false }));
      }
      if (businessModelsRef.current && !businessModelsRef.current.contains(event.target)) {
        setDropdownOpen(prev => ({ ...prev, businessModels: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNext = () => {
    // Prepare file data for storage (can't store File objects directly)
    const fileData = formData.sebiDoc ? {
      name: formData.sebiDoc.name,
      size: formData.sebiDoc.size,
      type: formData.sebiDoc.type,
      lastModified: formData.sebiDoc.lastModified
    } : null;

    // Save current state before proceeding
    const currentState = {
      formData: {
        ...formData,
        sebiDoc: null, // Don't store the actual File object
        sebiDocMeta: fileData // Store file metadata instead
      },
      selectedInstruments,
      selectedSectors,
      selectedStages,
      selectedGeographies,
      selectedBusinessModels,
      pastInvestments,
      publicLinks,
      teamMembers,
      profileVisibility,
      minimumTraction,
      pitchCompleteness,
      currentStep: selectedProgress
    };

    localStorage.setItem('ventureCapitalForm', JSON.stringify(currentState));

    if (selectedProgress < 4) {
      setSelectedProgress(selectedProgress + 1);
    }
  };

  useEffect(() => {
    const loadSavedData = () => {
      const savedData = localStorage.getItem('ventureCapitalForm');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setHasSavedData(true);

          // Restore form data
          setFormData(prev => ({
            ...prev,
            ...parsedData.formData,
            sebiDoc: null // Will be handled separately if needed
          }));

          // Restore other state
          setSelectedInstruments(parsedData.selectedInstruments || []);
          setSelectedSectors(parsedData.selectedSectors || []);
          setSelectedStages(parsedData.selectedStages || []);
          setSelectedGeographies(parsedData.selectedGeographies || []);
          setSelectedBusinessModels(parsedData.selectedBusinessModels || []);
          setPastInvestments(parsedData.pastInvestments || [{ companyName: '', stage: '', year: '' }]);
          setPublicLinks(parsedData.publicLinks || '');
          setProfileVisibility(parsedData.profileVisibility || "");
          setMinimumTraction(parsedData.minimumTraction || "");
          setPitchCompleteness(parsedData.pitchCompleteness || "");

          // Restore team members
          setTeamMembers(parsedData.teamMembers || [{ fullName: '', role: '', email: '', linkedInUrl: '' }]);
          // Restore current step if valid
          if (typeof parsedData.currentStep === 'number' && parsedData.currentStep >= 0 && parsedData.currentStep <= 4) {
            setSelectedProgress(parsedData.currentStep);
          }
        } catch (error) {
          console.error('Failed to parse saved form data:', error);
          localStorage.removeItem('ventureCapitalForm');
        }
      }
    };

    loadSavedData();
  }, []);


  const handleBack = () => {
    if (selectedProgress > 0) {
      setSelectedProgress(selectedProgress - 1);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const allFormData = {
      ...formData,
      investmentPreferences: {
        instruments: selectedInstruments,
        sectors: selectedSectors,
        stages: selectedStages,
        geographies: selectedGeographies,
        businessModels: selectedBusinessModels
      },
      pastInvestments: pastInvestments.filter(investment =>
        investment.companyName || investment.stage || investment.year
      ),
      teamMembers: teamMembers.filter(member =>
        member.fullName || member.role || member.email || member.linkedInUrl
      ),
      publicLinks: publicLinks,
      visibilitySettings: {
        profileVisibility,
        minimumTraction,
        pitchCompleteness
      }


    };
    console.log('Form submitted:', allFormData);
    // Store the form data in localStorage
    // localStorage.setItem('ventureCapitalFormData', JSON.stringify(allFormData));

    alert(`Form submitted successfully!\n${JSON.stringify(allFormData, null, 2)}`);
    resetForm();
    setPreviewOpen(false);

  };

  // Add this to your existing handleSubmit function
  const handleFinalSubmit = () => {
    const allFormData = {
      basicInfo: { ...formData },
      investmentPreferences: {
        instruments: selectedInstruments,
        sectors: selectedSectors,
        stages: selectedStages,
        geographies: selectedGeographies,
        businessModels: selectedBusinessModels
      },
      pastInvestments: pastInvestments.filter(investment =>
        investment.companyName || investment.stage || investment.year
      ),
      teamMembers: teamMembers.filter(member =>
        member.fullName || member.role || member.email || member.linkedInUrl
      ),
      publicLinks: publicLinks,
      visibilitySettings: {
        profileVisibility,
        minimumTraction,
        pitchCompleteness
      }
    };
    console.log('Final form submitted:', allFormData);
    // 1. Remove BOTH possible storage keys to ensure cleanup
    localStorage.removeItem('ventureCapitalFormData'); // Correct key
    localStorage.removeItem('ventureCapitalForm'); // Alternative key
    // 2. Then set the new data

    // 3. Show success message
    alert(`Final submission successful!\n${JSON.stringify(allFormData, null, 2)}`);

    // 4. Reset form after all operations complete
    resetForm();
    setPreviewOpen(false);
  };

  console.log('Current state:', {
    formData,
    selectedInstruments,
    selectedSectors,
    selectedStages,
    selectedGeographies,
    selectedBusinessModels,
    pastInvestments,
    publicLinks,
    teamMembers,

  });
  const handleSkip = () => {
    resetForm();
    navigate("/investor")
  };


  const renderStep1 = () => (
    <>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="entityName" className="text-sm font-medium text-gray-700">
            EntityName
          </label>
          <div className="px-3 py-[7px] bg-[#fff] rounded-md border border-[#2a2a2a] hover:border-purple-500">
            <input
              id="entityName"
              type="text"
              name="entityName"
              placeholder="EntityName"
              className="w-full text-sm font-normal bg-transparent outline-none"
              value={formData.entityName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col  gap-2">

          <label htmlFor="officialWebsite" className="text-sm font-medium text-gray-700">
            Official Website
          </label>


          <div className="px-3 py-[7px] bg-[#fff] rounded-md border border-[#2a2a2a] hover:border-purple-500">
            <input
              id="officialWebsite"
              type="url"
              placeholder="https://www.yourwebsite.com"
              className="w-full text-sm font-normal bg-transparent outline-none"
              value={formData.website || ''}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

        </div>
      </div>


      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Typical ticket size</label>
          <FormControl fullWidth>

            <Select
              value={formData.ticketSize || ""}
              onChange={(e) => setFormData({ ...formData, ticketSize: e.target.value })}
              displayEmpty
              sx={{
                backgroundColor: "#fff",
                color: formData.ticketSize ? "#000" : "#9ca3af", // gray if placeholder
                fontSize: "0.875rem", // text size (14px)
                height: "40px",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2a2a2a",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a855f7",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a855f7",
                },
                ".MuiSvgIcon-root": {
                  color: "#9ca3af",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#fff",
                    "& .MuiMenuItem-root": {
                      color: "#000",
                      fontSize: "0.875rem",
                      "&.Mui-selected": {
                        bgcolor: "#9C27B0",
                        color: "#fff"
                      },
                      "&.Mui-selected:hover": {
                        bgcolor: "#9C27B0"
                      },
                      "&:hover": {
                        bgcolor: "#9C27B0",
                        color: "#fff",
                      }
                    }
                  }
                }
              }}
            >
              {/* Placeholder */}
              <MenuItem value="" disabled>
                Select Ticket Size
              </MenuItem>

              {ticketSizeData.map((ticketSize) => (
                <MenuItem key={ticketSize} value={ticketSize}>
                  {ticketSize}
                </MenuItem>
              ))}
            </Select>

          </FormControl>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="annualDeployment" className="text-sm font-medium text-gray-700">
            Annual deployment target
          </label>
          <div className="px-3 py-[7px] bg-[#fff] rounded-md border border-[#2a2a2a] hover:border-purple-500">
            <input
              id="annualDeployment"
              type="text"
              name="annualDeployment"
              placeholder="Total you plan to invest this year"
              className="w-full text-sm font-normal bg-transparent outline-none"
              value={formData.annualDeployment}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>


      <div className="self-stretch flex flex-col md:flex-row md:item-center w-full justify-start items-start gap-4">
        <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
          <div className="self-stretch justify-start text-foreground text-sm font-medium font-['Geist'] leading-tight">
            Target ownership
          </div>
          <FormControl fullWidth>
            <Select
              value={formData.targetOwnership || ""}
              onChange={(e) => setFormData({ ...formData, targetOwnership: e.target.value })}
              displayEmpty
              sx={{
                backgroundColor: "#fff",
                color: formData.targetOwnership ? "#000" : "#9ca3af",
                fontSize: "0.875rem",
                height: "40px",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2a2a2a",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a855f7",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a855f7",
                },
                ".MuiSvgIcon-root": {
                  color: "#9ca3af",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#fff",
                    "& .MuiMenuItem-root": {
                      color: "#000",
                      fontSize: "0.875rem",
                      "&.Mui-selected": {
                        bgcolor: "#9C27B0",
                        color: "#fff"
                      },
                      "&.Mui-selected:hover": {
                        bgcolor: "#9C27B0"
                      },
                      "&:hover": {
                        bgcolor: "#9C27B0",
                        color: "#fff",
                      }
                    }
                  }
                }
              }}
            >
              <MenuItem value="" disabled>
                Select target ownership
              </MenuItem>

              {ownershipData.map((ownership) => (
                <MenuItem key={ownership} value={ownership}>
                  {ownership}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>

        <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
          <div className="self-stretch inline-flex justify-start items-start gap-2">
            <div className="flex-1 justify-start text-foreground text-sm font-medium font-['Geist'] leading-tight">
              Investment pace
            </div>
          </div>
          <div className="self-stretch inline-flex justify-start items-center gap-2">
            <div className="flex-1 px-3 py-2.5 bg-background rounded-md outline outline-1 outline-offset-[-1px] outline-input flex justify-start items-center overflow-hidden">
              <input
                type="text"
                placeholder="e.g., 5 deals/year"
                className="flex-1 justify-start text-foreground text-sm font-normal font-['Geist'] leading-tight bg-transparent outline-none"
                value={formData.investmentPace || ''}
                onChange={(e) => setFormData({ ...formData, investmentPace: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>






      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Country & tax residency</label>
          <FormControl fullWidth>

            <Select
              value={formData.residency || ""}
              onChange={(e) => setFormData({ ...formData, residency: e.target.value })}
              displayEmpty
              sx={{
                backgroundColor: "#fff",
                color: formData.residency ? "#000" : "#9ca3af", // gray if placeholder
                fontSize: "0.875rem", // text size (14px)
                height: "40px",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2a2a2a",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a855f7",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a855f7",
                },
                ".MuiSvgIcon-root": {
                  color: "#9ca3af",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#fff",
                    "& .MuiMenuItem-root": {
                      color: "#000",
                      fontSize: "0.875rem",
                      "&.Mui-selected": {
                        bgcolor: "#9C27B0",
                        color: "#fff"
                      },
                      "&.Mui-selected:hover": {
                        bgcolor: "#9C27B0"
                      },
                      "&:hover": {
                        bgcolor: "#9C27B0",
                        color: "#fff",
                      }
                    }
                  }
                }
              }}
            >
              {/* Placeholder */}
              <MenuItem value="" disabled>
                Select Country & tax residency
              </MenuItem>

              {residencyData.map((residency) => (
                <MenuItem key={residency} value={residency}>
                  {residency}
                </MenuItem>
              ))}
            </Select>

          </FormControl>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="linkedInUrl" className="text-sm font-medium text-gray-700">
            LinkedIn URL
          </label>
          <div className="px-3 py-[7px] bg-[#fff] rounded-md border border-[#2a2a2a] hover:border-purple-500">
            <input
              id="linkedInUrl"
              type="text"
              name="linkedInUrl"
              placeholder="http://linkedIn.com"
              className="w-full text-sm font-normal bg-transparent outline-none"
              value={formData.linkedInUrl}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>


      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <label htmlFor="ventureRegistration" className="text-sm font-medium text-gray-700">
            Company Registration Number / CIN
          </label>
          <div className="px-3 py-[7px] bg-[#fff] rounded-md border border-[#2a2a2a] hover:border-purple-500">
            <input
              id="ventureRegistration"
              type="text"
              name="ventureRegistration"
              placeholder="Company Registration Number"
              className="w-full text-sm font-normal bg-transparent outline-none"
              value={formData.ventureRegistration || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Upload Company Registration Document
          </label>

          {/* Custom upload box */}
          <div
            className="border rounded-lg py-[5px] flex flex-row items-center justify-center cursor-pointer hover:border-purple-500 transition"
            onClick={() => document.getElementById("sebiDoc").click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-10 text-gray-500 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5.001 5.001 0 0115 8h1a4 4 0 110 8h-1M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-gray-600 text-sm">
              Drag & drop or <span className="text-purple-600 font-semibold">browse</span>
            </p>
            <input
              id="sebiDoc"
              type="file"
              name="sebiDoc"
              accept=".pdf,.doc,.docx,.jpg,.png"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Show uploaded file preview or empty state */}
          {formData.sebiDoc && (
            <div className="mt-3 flex items-center justify-between gap-3 p-3 border rounded-md bg-gray-50">
              <div className="flex items-center gap-3">
                {formData.sebiDoc.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(formData.sebiDoc)}
                    alt="Preview"
                    className="w-12 h-12 object-cover rounded-md border"
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-md">
                    📄
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">{formData.sebiDoc.name}</p>
                  <p className="text-xs text-gray-500">
                    {(formData.sebiDoc.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveSebiDoc}
                className="p-1 rounded-full hover:bg-red-100 transition"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          )}
        </div>
      </div>

    </>
  );

  // Render step 2 form (investment preferences)
  // Render step 2 form with searchable selects
  // Render step 2 form with all fixes
  const renderStep2 = () => (
    <div className="self-stretch px-6 pb-6 inline-flex flex-col justify-start items-start gap-4 dropdown-container">
      {/* Deal Instruments */}
      <div className="w-full flex flex-col justify-start items-start gap-2" ref={instrumentsRef}>
        <label className="text-sm font-medium text-gray-700">Deal instruments</label>
        <div className="w-full relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search deal instruments..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm.instruments}
              onChange={(e) => handleSearchChange('instruments', e.target.value)}
              onFocus={() => setDropdownOpen(prev => ({ ...prev, instruments: true }))}
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(prev => ({ ...prev, instruments: true }));
              }}
              onKeyDown={(e) => handleKeyDown('instruments', e)}
            />
            <button
              type="button"
              onClick={(e) => toggleDropdown('instruments', e)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {dropdownOpen.instruments ? <ChevronDown className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>
          </div>

          {dropdownOpen.instruments && (
            <div className="mt-1 border border-gray-200 rounded-md max-h-60 overflow-y-auto shadow-lg z-10 bg-white">
              {filteredData.instruments.length > 0 ? (
                <>
                  {filteredData.instruments.map((instrument) => (
                    <button
                      type="button"
                      key={instrument}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${selectedInstruments.includes(instrument) ? 'bg-purple-50' : ''
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleInstrumentSelect(instrument, e);
                        setSearchTerm(prev => ({ ...prev, instruments: '' }));
                        setFilteredData(prev => ({
                          ...prev,
                          instruments: [...instrumentsData, ...newOptions.instruments]
                        }));
                      }}
                    >
                      <span className="text-sm">{instrument}</span>
                      {selectedInstruments.includes(instrument) ? (
                        <X className="h-4 w-4 text-purple-600" />
                      ) : (
                        <div className="h-4 w-4 border border-gray-300 rounded-sm" />
                      )}
                    </button>
                  ))}

                  {/* Add option to create new item if search term doesn't match */}
                  {searchTerm.instruments && !filteredData.instruments.some(item =>
                    item.toLowerCase() === searchTerm.instruments.toLowerCase()
                  ) && (
                      <div className="border-t border-gray-200">
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 text-purple-600"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddNewOption('instruments', searchTerm.instruments);
                            setDropdownOpen(prev => ({ ...prev, instruments: false }));
                          }}
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add "{searchTerm.instruments}"</span>
                        </button>
                      </div>
                    )}
                </>
              ) : (
                searchTerm.instruments ? (
                  <div className="border-t border-gray-200">
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 text-purple-600"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddNewOption('instruments', searchTerm.instruments);
                        setDropdownOpen(prev => ({ ...prev, instruments: false }));
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add "{searchTerm.instruments}"</span>
                    </button>
                  </div>
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">No matching instruments found</div>
                )
              )}
            </div>
          )}

          {selectedInstruments.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedInstruments.map((instrument) => (
                <div
                  key={instrument}
                  className="flex items-center bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs"
                >
                  {instrument}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInstrumentSelect(instrument, e);
                    }}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sectors */}
      <div className="w-full flex flex-col justify-start items-start gap-2" ref={sectorsRef}>
        <label className="text-sm font-medium text-gray-700">Sectors</label>
        <div className="w-full relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search sectors..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm.sectors}
              onChange={(e) => handleSearchChange('sectors', e.target.value)}
              onFocus={() => setDropdownOpen(prev => ({ ...prev, sectors: true }))}
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(prev => ({ ...prev, sectors: true }));
              }}
              onKeyDown={(e) => handleKeyDown('sectors', e)}
            />
            <button
              type="button"
              onClick={(e) => toggleDropdown('sectors', e)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {dropdownOpen.sectors ? <ChevronDown className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>
          </div>

          {dropdownOpen.sectors && (
            <div className="mt-1 border border-gray-200 rounded-md max-h-60 overflow-y-auto shadow-lg z-10 bg-white">
              {filteredData.sectors.length > 0 ? (
                <>
                  {filteredData.sectors.map((sector) => (
                    <button
                      type="button"
                      key={sector}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${selectedSectors.includes(sector) ? 'bg-purple-50' : ''
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSectorSelect(sector, e);
                        setSearchTerm(prev => ({ ...prev, sectors: '' }));
                        setFilteredData(prev => ({
                          ...prev,
                          sectors: [...sectorsData, ...newOptions.sectors]
                        }));
                      }}
                    >
                      <span className="text-sm">{sector}</span>
                      {selectedSectors.includes(sector) ? (
                        <X className="h-4 w-4 text-purple-600" />
                      ) : (
                        <div className="h-4 w-4 border border-gray-300 rounded-sm" />
                      )}
                    </button>
                  ))}

                  {/* Add option to create new item if search term doesn't match */}
                  {searchTerm.sectors && !filteredData.sectors.some(item =>
                    item.toLowerCase() === searchTerm.sectors.toLowerCase()
                  ) && (
                      <div className="border-t border-gray-200">
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 text-purple-600"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddNewOption('sectors', searchTerm.sectors);
                            setDropdownOpen(prev => ({ ...prev, sectors: false }));
                          }}
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add "{searchTerm.sectors}"</span>
                        </button>
                      </div>
                    )}
                </>
              ) : (
                searchTerm.sectors ? (
                  <div className="border-t border-gray-200">
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 text-purple-600"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddNewOption('sectors', searchTerm.sectors);
                        setDropdownOpen(prev => ({ ...prev, sectors: false }));
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add "{searchTerm.sectors}"</span>
                    </button>
                  </div>
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">No matching sectors found</div>
                )
              )}
            </div>
          )}

          {selectedSectors.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedSectors.map((sector) => (
                <div
                  key={sector}
                  className="flex items-center bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs"
                >
                  {sector}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectorSelect(sector, e);
                    }}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stages */}
      <div className="w-full flex flex-col justify-start items-start gap-2" ref={stagesRef}>
        <label className="text-sm font-medium text-gray-700">Stages</label>
        <div className="w-full relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search stages..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm.stages}
              onChange={(e) => handleSearchChange('stages', e.target.value)}
              onFocus={() => setDropdownOpen(prev => ({ ...prev, stages: true }))}
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(prev => ({ ...prev, stages: true }));
              }}
              onKeyDown={(e) => handleKeyDown('stages', e)}
            />
            <button
              type="button"
              onClick={(e) => toggleDropdown('stages', e)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {dropdownOpen.stages ? <ChevronDown className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>
          </div>

          {dropdownOpen.stages && (
            <div className="mt-1 border border-gray-200 rounded-md max-h-60 overflow-y-auto shadow-lg z-10 bg-white">
              {filteredData.stages.length > 0 ? (
                <>
                  {filteredData.stages.map((stage) => (
                    <button
                      type="button"
                      key={stage}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${selectedStages.includes(stage) ? 'bg-purple-50' : ''
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleStageSelect(stage, e);
                        setSearchTerm(prev => ({ ...prev, stages: '' }));
                        setFilteredData(prev => ({
                          ...prev,
                          stages: [...stagesData, ...newOptions.stages]
                        }));
                      }}
                    >
                      <span className="text-sm">{stage}</span>
                      {selectedStages.includes(stage) ? (
                        <X className="h-4 w-4 text-purple-600" />
                      ) : (
                        <div className="h-4 w-4 border border-gray-300 rounded-sm" />
                      )}
                    </button>
                  ))}

                  {/* Add option to create new item if search term doesn't match */}
                  {searchTerm.stages && !filteredData.stages.some(item =>
                    item.toLowerCase() === searchTerm.stages.toLowerCase()
                  ) && (
                      <div className="border-t border-gray-200">
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 text-purple-600"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddNewOption('stages', searchTerm.stages);
                            setDropdownOpen(prev => ({ ...prev, stages: false }));
                          }}
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add "{searchTerm.stages}"</span>
                        </button>
                      </div>
                    )}
                </>
              ) : (
                searchTerm.stages ? (
                  <div className="border-t border-gray-200">
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 text-purple-600"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddNewOption('stages', searchTerm.stages);
                        setDropdownOpen(prev => ({ ...prev, stages: false }));
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add "{searchTerm.stages}"</span>
                    </button>
                  </div>
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">No matching stages found</div>
                )
              )}
            </div>
          )}

          {selectedStages.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedStages.map((stage) => (
                <div
                  key={stage}
                  className="flex items-center bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs"
                >
                  {stage}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStageSelect(stage, e);
                    }}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Geographies */}
      <div className="w-full flex flex-col justify-start items-start gap-2" ref={geographiesRef}>
        <label className="text-sm font-medium text-gray-700">Geographies</label>
        <div className="w-full relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search geographies..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm.geographies}
              onChange={(e) => handleSearchChange('geographies', e.target.value)}
              onFocus={() => setDropdownOpen(prev => ({ ...prev, geographies: true }))}
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(prev => ({ ...prev, geographies: true }));
              }}
              onKeyDown={(e) => handleKeyDown('geographies', e)}
            />
            <button
              type="button"
              onClick={(e) => toggleDropdown('geographies', e)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {dropdownOpen.geographies ? <ChevronDown className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>
          </div>

          {dropdownOpen.geographies && (
            <div className="mt-1 border border-gray-200 rounded-md max-h-60 overflow-y-auto shadow-lg z-10 bg-white">
              {filteredData.geographies.length > 0 ? (
                <>
                  {filteredData.geographies.map((geo) => (
                    <button
                      type="button"
                      key={geo}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${selectedGeographies.includes(geo) ? 'bg-purple-50' : ''
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleGeographySelect(geo, e);
                        setSearchTerm(prev => ({ ...prev, geographies: '' }));
                        setFilteredData(prev => ({
                          ...prev,
                          geographies: [...geographiesData, ...newOptions.geographies]
                        }));
                      }}
                    >
                      <span className="text-sm">{geo}</span>
                      {selectedGeographies.includes(geo) ? (
                        <X className="h-4 w-4 text-purple-600" />
                      ) : (
                        <div className="h-4 w-4 border border-gray-300 rounded-sm" />
                      )}
                    </button>
                  ))}

                  {/* Add option to create new item if search term doesn't match */}
                  {searchTerm.geographies && !filteredData.geographies.some(item =>
                    item.toLowerCase() === searchTerm.geographies.toLowerCase()
                  ) && (
                      <div className="border-t border-gray-200">
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 text-purple-600"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddNewOption('geographies', searchTerm.geographies);
                            setDropdownOpen(prev => ({ ...prev, geographies: false }));
                          }}
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add "{searchTerm.geographies}"</span>
                        </button>
                      </div>
                    )}
                </>
              ) : (
                searchTerm.geographies ? (
                  <div className="border-t border-gray-200">
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 text-purple-600"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddNewOption('geographies', searchTerm.geographies);
                        setDropdownOpen(prev => ({ ...prev, geographies: false }));
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add "{searchTerm.geographies}"</span>
                    </button>
                  </div>
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">No matching geographies found</div>
                )
              )}
            </div>
          )}

          {selectedGeographies.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedGeographies.map((geo) => (
                <div
                  key={geo}
                  className="flex items-center bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs"
                >
                  {geo}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGeographySelect(geo, e);
                    }}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Business Models */}
      <div className="w-full flex flex-col justify-start items-start gap-2" ref={businessModelsRef}>
        <label className="text-sm font-medium text-gray-700">Business models</label>
        <div className="w-full relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search business models..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm.businessModels}
              onChange={(e) => handleSearchChange('businessModels', e.target.value)}
              onFocus={() => setDropdownOpen(prev => ({ ...prev, businessModels: true }))}
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen(prev => ({ ...prev, businessModels: true }));
              }}
              onKeyDown={(e) => handleKeyDown('businessModels', e)}
            />
            <button
              type="button"
              onClick={(e) => toggleDropdown('businessModels', e)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {dropdownOpen.businessModels ? <ChevronDown className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </button>
          </div>

          {dropdownOpen.businessModels && (
            <div className="mt-1 border border-gray-200 rounded-md max-h-60 overflow-y-auto shadow-lg z-10 bg-white">
              {filteredData.businessModels.length > 0 ? (
                <>
                  {filteredData.businessModels.map((model) => (
                    <button
                      type="button"
                      key={model}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${selectedBusinessModels.includes(model) ? 'bg-purple-50' : ''
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleBusinessModelSelect(model, e);
                        setSearchTerm(prev => ({ ...prev, businessModels: '' }));
                        setFilteredData(prev => ({
                          ...prev,
                          businessModels: [...businessModelsData, ...newOptions.businessModels]
                        }));
                      }}
                    >
                      <span className="text-sm">{model}</span>
                      {selectedBusinessModels.includes(model) ? (
                        <X className="h-4 w-4 text-purple-600" />
                      ) : (
                        <div className="h-4 w-4 border border-gray-300 rounded-sm" />
                      )}
                    </button>
                  ))}

                  {/* Add option to create new item if search term doesn't match */}
                  {searchTerm.businessModels && !filteredData.businessModels.some(item =>
                    item.toLowerCase() === searchTerm.businessModels.toLowerCase()
                  ) && (
                      <div className="border-t border-gray-200">
                        <button
                          type="button"
                          className="w-full text-left px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 text-purple-600"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddNewOption('businessModels', searchTerm.businessModels);
                            setDropdownOpen(prev => ({ ...prev, businessModels: false }));
                          }}
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add "{searchTerm.businessModels}"</span>
                        </button>
                      </div>
                    )}
                </>
              ) : (
                searchTerm.businessModels ? (
                  <div className="border-t border-gray-200">
                    <button
                      type="button"
                      className="w-full text-left px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 text-purple-600"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddNewOption('businessModels', searchTerm.businessModels);
                        setDropdownOpen(prev => ({ ...prev, businessModels: false }));
                      }}
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add "{searchTerm.businessModels}"</span>
                    </button>
                  </div>
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500">No matching business models found</div>
                )
              )}
            </div>
          )}

          {selectedBusinessModels.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedBusinessModels.map((model) => (
                <div
                  key={model}
                  className="flex items-center bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-xs"
                >
                  {model}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBusinessModelSelect(model, e);
                    }}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );


  // Render step 3 form
  const renderStep4 = () => (
    <div className="self-stretch px-6 pb-6 inline-flex flex-col justify-start items-start gap-4">
      <div className="self-stretch justify-start text-black text-lg font-medium leading-7">
        Past investments
      </div>

      {pastInvestments.map((investment, index) => (
        <div key={index} className="self-stretch  flex flex-col md:flex-row justify-start items-start md:items-center gap-4 w-full">
          {/* Company Name */}
          <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
            {index === 0 && (
              <div className="self-stretch inline-flex justify-start items-start gap-2">
                <div className="flex-1 justify-start text-gray-700 text-sm font-medium leading-tight">
                  Company Name
                </div>
              </div>
            )}
            <div className="self-stretch inline-flex justify-start items-center gap-2">
              <div className="flex-1 px-3 py-[10px] bg-white rounded-md border border-gray-300 flex justify-start items-center overflow-hidden">
                <input
                  type="text"
                  placeholder="Fund Nest"
                  className="flex-1 text-gray-900 text-sm font-normal bg-transparent outline-none"
                  value={investment.companyName}
                  onChange={(e) => handleInvestmentChange(index, 'companyName', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Stage */}
          <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
            {index === 0 && (
              <div className="self-stretch justify-start text-gray-700 text-sm font-medium leading-tight">
                Stage
              </div>
            )}
            <FormControl fullWidth>
              <Select
                value={investment.stage || ""}
                onChange={(e) => handleInvestmentChange(index, 'stage', e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: "#fff",
                  color: investment.stage ? "#000" : "#9ca3af",
                  fontSize: "0.875rem",
                  height: "40px",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2a2a2a",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a855f7",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a855f7",
                  },
                  ".MuiSvgIcon-root": {
                    color: "#9ca3af",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#fff",
                      "& .MuiMenuItem-root": {
                        color: "#000",
                        fontSize: "0.875rem",
                        "&.Mui-selected": {
                          bgcolor: "#9C27B0",
                          color: "#fff"
                        },
                        "&.Mui-selected:hover": {
                          bgcolor: "#9C27B0"
                        },
                        "&:hover": {
                          bgcolor: "#9C27B0",
                          color: "#fff",
                        }
                      }
                    }
                  }
                }}
              >
                <MenuItem value="" disabled>
                  Select Stage
                </MenuItem>
                {investmentStageData.map((stage) => (
                  <MenuItem key={stage} value={stage}>
                    {stage}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Year */}
          <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
            {index === 0 && (
              <div className="self-stretch justify-start text-gray-700 text-sm font-medium leading-tight">
                Year
              </div>
            )}
            <FormControl fullWidth>
              <Select
                value={investment.year || ""}
                onChange={(e) => handleInvestmentChange(index, 'year', e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: "#fff",
                  color: investment.year ? "#000" : "#9ca3af",
                  fontSize: "0.875rem",
                  height: "40px",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2a2a2a",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a855f7",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#a855f7",
                  },
                  ".MuiSvgIcon-root": {
                    color: "#9ca3af",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: "#fff",
                      "& .MuiMenuItem-root": {
                        color: "#000",
                        fontSize: "0.875rem",
                        "&.Mui-selected": {
                          bgcolor: "#9C27B0",
                          color: "#fff"
                        },
                        "&.Mui-selected:hover": {
                          bgcolor: "#9C27B0"
                        },
                        "&:hover": {
                          bgcolor: "#9C27B0",
                          color: "#fff",
                        }
                      }
                    }
                  }
                }}
              >
                <MenuItem value="" disabled>
                  Select Year
                </MenuItem>
                {yearData.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Remove button for additional fields */}
          {index > 0 && (
            <button
              type="button"
              onClick={() => removeInvestmentField(index)}
              className="mt-3 text-red-500 hover:text-red-700"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}

      {/* Add Another button */}
      <button
        type="button"
        onClick={addInvestmentField}
        className="flex items-center text-purple-500 hover:text-purple-700 text-sm font-medium mt-2"
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Another
      </button>

      {/* Public Links */}
      <div className="w-full flex flex-col justify-start items-start gap-2 mt-4">
        <div className="self-stretch inline-flex justify-start items-start gap-2">
          <div className="flex-1 justify-start text-gray-700 text-sm font-medium leading-tight">
            Public links
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-center gap-2">
          <div className="flex-1 px-3 py-2 bg-white rounded-md border border-gray-300 flex justify-start items-center overflow-hidden">
            <input
              type="text"
              placeholder="URL"
              className="flex-1 text-gray-900 text-sm font-normal bg-transparent outline-none"
              value={publicLinks}
              onChange={(e) => setPublicLinks(e.target.value)}
            />
          </div>
        </div>
        <div className="self-stretch justify-start text-gray-500 text-sm font-normal leading-tight">
          AngelList, Crunchbase, personal site
        </div>
      </div>
    </div>
  );


  // New renderStep4 function
  const renderStep5 = () => (
    <div className="self-stretch px-6 pb-6 flex flex-col justify-start items-start gap-4">
      <div className="self-stretch text-black text-lg font-medium leading-7">
        Visibility & Preferences
      </div>

      <div className="self-stretch flex flex-col md:flex-row justify-start items-start gap-4 w-full">
        {/* Profile Visibility */}
        <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
          <label className="text-sm font-medium text-gray-700">Profile Visibility to Founders</label>
          <FormControl fullWidth>
            <Select
              value={profileVisibility}
              onChange={(e) => setProfileVisibility(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: "#fff",
                color: profileVisibility ? "#000" : "#9ca3af",
                fontSize: "0.875rem",
                height: "40px",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2a2a2a",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a855f7",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a855f7",
                },
                ".MuiSvgIcon-root": {
                  color: "#9ca3af",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#fff",
                    "& .MuiMenuItem-root": {
                      color: "#000",
                      fontSize: "0.875rem",
                      "&.Mui-selected": {
                        bgcolor: "#9C27B0",
                        color: "#fff"
                      },
                      "&.Mui-selected:hover": {
                        bgcolor: "#9C27B0"
                      },
                      "&:hover": {
                        bgcolor: "#9C27B0",
                        color: "#fff",
                      }
                    }
                  }
                }
              }}

            >
              <MenuItem value="" disabled>
                Select Visibility & Preferences
              </MenuItem>
              {visibilityOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Minimum Traction */}
        <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
          <label className="text-sm font-medium text-gray-700">Minimum Traction</label>
          <FormControl fullWidth>
            <Select
              value={minimumTraction}
              onChange={(e) => setMinimumTraction(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: "#fff",
                color: minimumTraction ? "#000" : "#9ca3af",
                fontSize: "0.875rem",
                height: "40px",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2a2a2a",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a855f7",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a855f7",
                },
                ".MuiSvgIcon-root": {
                  color: "#9ca3af",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#fff",
                    "& .MuiMenuItem-root": {
                      color: "#000",
                      fontSize: "0.875rem",
                      "&.Mui-selected": {
                        bgcolor: "#9C27B0",
                        color: "#fff"
                      },
                      "&.Mui-selected:hover": {
                        bgcolor: "#9C27B0"
                      },
                      "&:hover": {
                        bgcolor: "#9C27B0",
                        color: "#fff",
                      }
                    }
                  }
                }
              }}
            >
              <MenuItem value="" disabled>
                Select Minimum Traction
              </MenuItem>

              {tractionOptions.map((track) => (
                <MenuItem key={track} value={track}>
                  {track}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="self-stretch flex flex-col md:flex-row justify-start items-start gap-4 w-full">
        {/* Pitch Completeness */}
        <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
          <label className="text-sm font-medium text-gray-700">Pitch Completeness %</label>
          <FormControl fullWidth>
            <Select
              value={pitchCompleteness}
              onChange={(e) => setPitchCompleteness(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: "#fff",
                color: pitchCompleteness ? "#000" : "#9ca3af",
                fontSize: "0.875rem",
                height: "40px",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2a2a2a",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a855f7",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#a855f7",
                },
                ".MuiSvgIcon-root": {
                  color: "#9ca3af",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#fff",
                    "& .MuiMenuItem-root": {
                      color: "#000",
                      fontSize: "0.875rem",
                      "&.Mui-selected": {
                        bgcolor: "#9C27B0",
                        color: "#fff"
                      },
                      "&.Mui-selected:hover": {
                        bgcolor: "#9C27B0"
                      },
                      "&:hover": {
                        bgcolor: "#9C27B0",
                        color: "#fff",
                      }
                    }
                  }
                }
              }}
            >

              <MenuItem value="" disabled>
                Select Pitch Completeness
              </MenuItem>
              {completenessOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Empty div for alignment */}
        <div className="flex-1" />
      </div>
    </div>
  );


  // Add this function to your component (after renderStep4)
  const renderStep3 = () => (
    <div className="self-stretch px-6 pb-6 inline-flex flex-col justify-start items-start gap-4">
      <div className="self-stretch justify-start text-foreground text-lg font-medium font-['Geist'] leading-7">
        Team Members
      </div>

      {teamMembers.map((member, index) => (
        <div key={index} className="w-full flex flex-col justify-start items-start gap-4">
          {/* Team Member Header with Remove Button (for additional members) */}
          {index > 0 && (
            <div className="self-stretch flex justify-between items-center">
              <div className="text-sm font-medium text-gray-700">Team Member #{index + 1}</div>
              <button
                type="button"
                onClick={() => removeTeamMember(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          )}

          <div className="self-stretch flex  md:flex-row flex-col md:item-center w-full justify-start items-start gap-4">
            <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
              <div className="self-stretch inline-flex justify-start items-start gap-2">
                <div className="flex-1 justify-start text-foreground text-sm font-medium font-['Geist'] leading-tight">
                  Full Name
                </div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="flex-1 px-3 py-2.5 bg-background rounded-md outline outline-1 outline-offset-[-1px] outline-input flex justify-start items-start overflow-hidden">
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="flex-1 justify-start text-foreground text-sm font-normal font-['Geist'] leading-tight bg-transparent outline-none"
                    value={member.fullName}
                    onChange={(e) => handleTeamMemberChange(index, 'fullName', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
              <div className="self-stretch inline-flex justify-start items-start gap-2">
                <div className="flex-1 justify-start text-foreground text-sm font-medium font-['Geist'] leading-tight">
                  Role/Title
                </div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="flex-1 px-3 py-2.5 bg-background rounded-md outline outline-1 outline-offset-[-1px] outline-input flex justify-start items-start overflow-hidden">
                  <input
                    type="text"
                    placeholder="Enter role/title"
                    className="flex-1 justify-start text-foreground text-sm font-normal font-['Geist'] leading-tight bg-transparent outline-none"
                    value={member.role}
                    onChange={(e) => handleTeamMemberChange(index, 'role', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch  flex  md:flex-row flex-col md:item-center w-full justify-start items-start gap-4">
            <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
              <div className="self-stretch inline-flex justify-start items-start gap-2">
                <div className="flex-1 justify-start text-foreground text-sm font-medium font-['Geist'] leading-tight">
                  Email
                </div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="flex-1 px-3 py-2.5 bg-background rounded-md outline outline-1 outline-offset-[-1px] outline-input flex justify-start items-start overflow-hidden">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="flex-1 justify-start text-foreground text-sm font-normal font-['Geist'] leading-tight bg-transparent outline-none"
                    value={member.email}
                    onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-start items-start gap-2 w-full">
              <div className="self-stretch inline-flex justify-start items-start gap-2">
                <div className="flex-1 justify-start text-foreground text-sm font-medium font-['Geist'] leading-tight">
                  LinkedIn Profile URL
                </div>
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <div className="flex-1 px-3 py-2.5 bg-background rounded-md outline outline-1 outline-offset-[-1px] outline-input flex justify-start items-start overflow-hidden">
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="flex-1 justify-start text-foreground text-sm font-normal font-['Geist'] leading-tight bg-transparent outline-none"
                    value={member.linkedInUrl}
                    onChange={(e) => handleTeamMemberChange(index, 'linkedInUrl', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider between team members (except after the last one) */}
          {index < teamMembers.length - 1 && (
            <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-border"></div>
          )}
        </div>
      ))}

      {/* Add Another Team Member Button */}
      <button
        type="button"
        onClick={addTeamMember}
        className="min-w-20 px-3 py-2 rounded-md inline-flex justify-center items-center gap-1 overflow-hidden text-purple-600 hover:bg-purple-50"
      >
        <div className="w-4 h-4 relative overflow-hidden">
          <div className="w-0 h-2.5 left-[8px] top-[3.33px] absolute outline outline-1 outline-offset-[-0.50px] outline-primary" />
          <div className="w-2.5 h-0 left-[3.33px] top-[8px] absolute outline outline-1 outline-offset-[-0.50px] outline-primary" />
        </div>
        <div className="px-1 flex justify-start items-start">
          <div className="justify-start text-primary text-sm font-medium font-['Geist'] leading-normal">
            Add Another Team Member
          </div>
        </div>
      </button>
    </div>
  );
  // New Preview Modal component
  // New Preview Modal component
  const PreviewModal = () => {
    const allFormData = {
      basicInfo: {
        ...formData,
        // Add any additional formatting needed for display
        ticketSize: formData.ticketSize || 'Not specified',
        annualDeployment: formData.annualDeployment || 'Not specified',
        targetOwnership: formData.targetOwnership || 'Not specified',
        investmentPace: formData.investmentPace || 'Not specified',
        residency: formData.residency || 'Not specified',
        website: formData.website || 'Not provided',
        ventureRegistration: formData.ventureRegistration || 'Not provided'
      },
      investmentPreferences: {
        instruments: selectedInstruments.length > 0 ? selectedInstruments : ['Not specified'],
        sectors: selectedSectors.length > 0 ? selectedSectors : ['Not specified'],
        stages: selectedStages.length > 0 ? selectedStages : ['Not specified'],
        geographies: selectedGeographies.length > 0 ? selectedGeographies : ['Not specified'],
        businessModels: selectedBusinessModels.length > 0 ? selectedBusinessModels : ['Not specified']
      },
      pastInvestments: pastInvestments.filter(investment =>
        investment.companyName || investment.stage || investment.year
      ),
      publicLinks: publicLinks || 'Not provided',
      teamMembers: teamMembers.filter(member =>
        member.fullName || member.role || member.email || member.linkedInUrl
      ),

      visibilitySettings: {
        profileVisibility: profileVisibility || 'Not specified',
        minimumTraction: minimumTraction || 'Not specified',
        pitchCompleteness: pitchCompleteness || 'Not specified'
      }
    };

    return (
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle className="text-lg font-semibold">Review Your Venture Capital Profile</DialogTitle>
        <DialogContent>
          <div className="space-y-6 py-4 max-h-[60vh] overflow-y-auto">
            {/* Basic Information */}
            <div>
              <h3 className="text-md font-medium mb-2 border-b pb-1">Basic Information</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-2">
                <p><span className="font-medium">Entity Name:</span> {allFormData.basicInfo.entityName || 'Not provided'}</p>
                <p><span className="font-medium">Website:</span> {allFormData.basicInfo.website}</p>
                <p><span className="font-medium">Ticket Size:</span> {allFormData.basicInfo.ticketSize}</p>
                <p><span className="font-medium">Annual Deployment:</span> {allFormData.basicInfo.annualDeployment}</p>
                <p><span className="font-medium">Target Ownership:</span> {allFormData.basicInfo.targetOwnership}</p>
                <p><span className="font-medium">Investment Pace:</span> {allFormData.basicInfo.investmentPace}</p>
                <p><span className="font-medium">Residency:</span> {allFormData.basicInfo.residency}</p>
                <p><span className="font-medium">LinkedIn URL:</span> {allFormData.basicInfo.linkedInUrl || 'Not provided'}</p>
                <p><span className="font-medium">Registration Number:</span> {allFormData.basicInfo.ventureRegistration}</p>
                <p><span className="font-medium">Registration Document:</span> {allFormData.basicInfo.sebiDoc ? allFormData.basicInfo.sebiDoc.name : 'Not uploaded'}</p>
              </div>
            </div>

            {/* Investment Preferences */}
            <div>
              <h3 className="text-md font-medium mb-2 border-b pb-1">Investment Preferences</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-2">
                <p><span className="font-medium">Instruments:</span> {allFormData.investmentPreferences.instruments.join(', ')}</p>
                <p><span className="font-medium">Sectors:</span> {allFormData.investmentPreferences.sectors.join(', ')}</p>
                <p><span className="font-medium">Stages:</span> {allFormData.investmentPreferences.stages.join(', ')}</p>
                <p><span className="font-medium">Geographies:</span> {allFormData.investmentPreferences.geographies.join(', ')}</p>
                <p><span className="font-medium">Business Models:</span> {allFormData.investmentPreferences.businessModels.join(', ')}</p>
              </div>
            </div>

            {/* Team Members */}
            {allFormData.teamMembers.length > 0 && (
              <div>
                <h3 className="text-md font-medium mb-2 border-b pb-1">Team Members</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                  {allFormData.teamMembers.map((member, index) => (
                    <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                      <p><span className="font-medium">Name:</span> {member.fullName || 'Not provided'}</p>
                      <p><span className="font-medium">Role:</span> {member.role || 'Not provided'}</p>
                      <p><span className="font-medium">Email:</span> {member.email || 'Not provided'}</p>
                      <p><span className="font-medium">LinkedIn:</span> {member.linkedInUrl || 'Not provided'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Investments */}
            {allFormData.pastInvestments.length > 0 && (
              <div>
                <h3 className="text-md font-medium mb-2 border-b pb-1">Past Investments</h3>
                <div className="bg-gray-50 p-4 rounded-md space-y-4">
                  {allFormData.pastInvestments.map((investment, index) => (
                    <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                      <p><span className="font-medium">Company:</span> {investment.companyName || 'Not provided'}</p>
                      <p><span className="font-medium">Stage:</span> {investment.stage || 'Not provided'}</p>
                      <p><span className="font-medium">Year:</span> {investment.year || 'Not provided'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Public Links */}
            <div>
              <h3 className="text-md font-medium mb-2 border-b pb-1">Public Links</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>{allFormData.publicLinks}</p>
              </div>
            </div>

            {/* Visibility Settings */}
            <div>
              <h3 className="text-md font-medium mb-2 border-b pb-1">Visibility Settings</h3>
              <div className="bg-gray-50 p-4 rounded-md space-y-2">
                <p><span className="font-medium">Profile Visibility:</span> {allFormData.visibilitySettings.profileVisibility}</p>
                <p><span className="font-medium">Minimum Traction:</span> {allFormData.visibilitySettings.minimumTraction}</p>
                <p><span className="font-medium">Pitch Completeness:</span> {allFormData.visibilitySettings.pitchCompleteness}</p>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="p-4">
          <button
            onClick={() => setPreviewOpen(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 rounded-md transition-colors"
          >
            Back to Edit
          </button>
          <button
            onClick={handleFinalSubmit}
            className="px-4 py-2 bg-purple-600 text-sm text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Confirm Submission
          </button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div>
      <div className="py-5 flex justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-[#fff] md:rounded-lg md:border md:border-[#eeeeee] md:shadow-md flex flex-col py-10">
          {/* Progress bars */}
          <div className="px-6 pt-6 flex gap-2.5">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`flex-1 h-2.5 rounded-full overflow-hidden ${index <= selectedProgress ? 'bg-purple-500' : 'bg-[#fff] border border-gray-400'
                  }`}
              />
            ))}
          </div>

          {/* Header */}
          <div className="p-6 flex flex-col gap-1.5 text-center">
            <h2 className="text-black text-2xl font-semibold">
              {selectedProgress === 0 ? "Account & Profile" :
                selectedProgress === 1 ? "Your Investment Focus" :
                  selectedProgress === 3 ? "Build Your Investment Credibility" :
                    selectedProgress === 4 ? "How You Want to connect" :
                      selectedProgress === 2 ? "Team & Roles" : // Add this line
                        "Review & Submit"}
            </h2>
            <p className="text-gray-500 text-sm font-normal">
              {selectedProgress === 0
                ? "Tell founders who you are, your typical cheque size, and your preference to participate in deals."
                : selectedProgress === 1
                  ? "Tell as what kinds of startups and deals you're most interested in."
                  : selectedProgress === 3
                    ? "Showcase your past investments and experience to earn founder trust and unlock the verified Angel+ badge. This helps you stand out and get priority access high quality deals"
                    : selectedProgress === 4
                      ? "Set your visibility and communication preferences so you only receive relevant pitches from the right founders."
                      : selectedProgress === 2 // Add this condition
                        ? "Add your investment team, assign roles, and control who can view or manage deals." :
                        "Review all your information before submitting."}
            </p>
          </div>

          {/* Form content */}
          <div className="flex-1 px-6 pb-6 flex flex-col gap-4">
            {selectedProgress === 0 ? renderStep1() :
              selectedProgress === 1 ? renderStep2() :
                selectedProgress === 2 ? renderStep3() :
                  selectedProgress === 3 ? renderStep4() :
                    selectedProgress === 4 ? renderStep5() :
                      <div>Review content would go here</div>}
          </div>

          {/* Buttons */}
          <div className="flex flex-row justify-between gap-2 px-6 pb-6">
            <button
              type="button"
              onClick={selectedProgress === 0 ? handleSkip : handleBack}
              className="max-w-5xl px-3 py-2 rounded-md border cursor-pointer border-[#2a2a2a] text-purple-500 hover:bg-[#eeeeee] text-sm font-medium transition-colors"
            >
              {selectedProgress === 0 ? "Skip" : "Back"}
            </button>
            <button
              type={selectedProgress === 4 ? "button" : "button"}
              onClick={() => {
                if (selectedProgress < 4) {
                  handleNext();
                } else {
                  setPreviewOpen(true); // Show preview modal on step 4
                }
              }}
              className="max-w-5xl px-3 py-2 bg-purple-500 cursor-pointer hover:bg-purple-600 rounded-md text-white text-sm font-medium transition-colors"
            >
              {selectedProgress === 4 ? "Submit" : "Continue"}
            </button>
          </div>
        </form>
      </div>

      {/* Render the preview modal */}
      <PreviewModal />
    </div>
  );
};

export default VentureCapital;