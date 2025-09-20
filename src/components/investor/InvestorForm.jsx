import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const stages = [
    {
        title: "Angel Investor",
        desc: "Investing your own capital, typically ₹5L–₹2Cr per deal, often in early-stage startups.Focus on high-growth potential and strong founding teams.",
    },
    {
        title: "Venture Capital",
        desc: "Institutional or fund-based investor, providing ₹2Cr–₹50Cr for startups with proven traction.Looking for scalable businesses with high returns.",
    },
    {
        title: "Private Equity",
        desc: "Investing ₹10Cr+ in mature, profitable or near-profitable companies. Focused on strategic growth, buyouts, or expansion capital.",
    },
    {
        title: "Hedge Fund",
        desc: "Specializing in ₹50Cr+ late-stage or pre-IPO companies. Interested in secondary equity deals, valuation growth, and liquidity events.",
    },

];
const InvestorForm = () => {
    const [selectedStage, setSelectedStage] = useState(0); // default to first stage
    const [selectedProgress, setSelectedProgress] = useState(0); // For form steps

    const navigate = useNavigate();
    // Define handleSkip function
    const handleSkip = () => {
        navigate('/'); // Or wherever you want to skip to
        // Alternative: navigate(-1) to go back
    };

    // Define handleBack function
    const handleBack = () => {
        if (selectedProgress > 0) {
            setSelectedProgress(selectedProgress - 1);
        } else {
            navigate(-1); // Go back in history
        }
    };

    // Define handleNext function
    const handleNext = () => {
        if (selectedProgress < 3) {
            setSelectedProgress(selectedProgress + 1);
        }
    };
    const handleContinue = () => {
        const routes = [
            'angel-investor',
            'venture-capital',
            'private-equity',
            'hedge-fund'
        ];

        if (selectedStage >= 0 && selectedStage < routes.length) {
            navigate(`/investor/${routes[selectedStage]}`);
        } else {
            console.error('Invalid selected stage');
            navigate('/investor'); // Fallback to investor page
        }
    };

    const handleFinalSubmit = () => {
        // Navigate to the appropriate investor page based on initial selection
        navigate(`/investor/${routes[selectedStage]}`);
    };

    return (
        <div className='min-h-screen flex justify-center py-5'>
            <div className="max-w-4xl  md:rounded-lg md:border md:border-[#eeeeee] md:shadow flex flex-col">
                {/* Header */}
                <div className="p-6 flex flex-col items-center gap-1.5">
                    <h2 className="text-black text-2xl font-semibold font-['Geist'] leading-normal text-center">
                        Where’s your startup right now?
                    </h2>
                    <p className="text-gray-500 text-sm font-normal font-['Geist'] leading-tight text-center">
                        Your stage determines the type of investors and opportunities you’ll see first.
                    </p>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-4 px-6 pb-6">
                    {stages.map((stage, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedStage(idx)}
                            className={`p-3 rounded-md border ${selectedStage === idx ? "border-purple-500" : "border-gray-300"} flex gap-2 cursor-pointer transition-colors ${selectedStage === idx
                                ? "border-purple-500"
                                : "border-[#eeeeee] hover:border-purple-500"
                                }`}
                        >
                            {/* Radio */}
                            <div className="w-4 h-4 relative flex-shrink-0">
                                <div
                                    className={`w-4 h-4 rounded-full border ${selectedStage === idx
                                        ? "border-purple-500"
                                        : "border-gray-500"
                                        } bg-[#fff]`}
                                />
                                {selectedStage === idx && (
                                    <div className="w-2.5 h-2.5 absolute left-[3px] top-[3px] bg-purple-500 rounded-full" />
                                )}
                            </div>

                            {/* Text */}
                            <div className="flex-1 flex flex-col gap-1">
                                <div className="text-black text-sm font-medium font-['Geist'] leading-none">
                                    {stage.title}
                                </div>
                                <div className="text-gray-500 text-sm font-normal font-['Geist'] leading-tight">
                                    {stage.desc}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Buttons - simplified */}
                <div className="flex flex-row justify-between gap-2 px-6 pb-6">
                    <button
                        type="button"
                        onClick={handleSkip}
                        className="max-w-5xl px-3 py-2 rounded-md border cursor-pointer border-[#2a2a2a] text-purple-500 hover:bg-[#eeeeee] text-sm font-medium transition-colors"
                    >
                        Skip
                    </button>
                    <button
                        type="button"
                        onClick={handleContinue}
                        className="max-w-5xl px-3 py-2 bg-purple-500 cursor-pointer hover:bg-purple-600 rounded-md text-white text-sm font-medium transition-colors"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InvestorForm