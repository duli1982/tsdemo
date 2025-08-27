import React, { useEffect, useMemo, useState } from 'react'
<div className="w-full md:w-1/3 lg:w-1/4 flex flex-col space-y-4">
<div className="bg-slate-800/70 backdrop-blur-sm shadow-xl rounded-xl p-1">
<div className="p-4">
<h2 className="text-xl font-semibold text-sky-400 mb-3 flex items-center">
<Briefcase className="mr-2 h-5 w-5" />Job Requisitions
</h2>
<div className="relative mb-3">
<input
type="text"
placeholder="Search jobs..."
className="w-full p-2 pl-8 rounded-md bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
/>
<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
</div>
</div>
<div className="max-h-[calc(100vh-350px)] overflow-y-auto px-2 pb-2 custom-scrollbar">
{filteredJobs.length > 0 ? (
filteredJobs.map((job) => (
<JobListItem key={job.id} job={job} selected={job.id === selectedJobId} onSelect={() => handleSelectJob(job.id)} />
))
) : (
<p className="text-center text-gray-400 p-4">No jobs match your search.</p>
)}
</div>
</div>
</div>


<div className="w-full md:w-2/3 lg:w-3/4 flex flex-col space-y-6">
{isLoading ? (
<div className="flex justify-center items-center h-full bg-slate-800/70 backdrop-blur-sm shadow-xl rounded-xl p-6">
<div className="text-center">
<Brain className="h-16 w-16 text-sky-500 animate-pulse mx-auto mb-4" />
<p className="text-xl text-sky-400">Talent Sonar is searching...</p>
</div>
</div>
) : selectedJob ? (
<>
<JobDetails job={selectedJob} onAnalyzeJob={handleAnalyzeJobDescription} isAnalyzing={isAnalyzingJob} />
<div className="bg-slate-800/70 backdrop-blur-sm shadow-xl rounded-xl p-1">
<div className="p-4 sm:p-6">
<div className="flex items-center justify-between border-b border-slate-700 mb-4">
<div className="flex">
<TabButton icon={<Users className="mr-2 h-5 w-5" />} label="Internal Talent" count={internalMatches.length} isActive={activeTab === 'internal'} onClick={() => setActiveTab('internal')} />
<TabButton icon={<UserCheck className="mr-2 h-5 w-5" />} label="Past Applicants" count={pastMatches.length} isActive={activeTab === 'past'} onClick={() => setActiveTab('past')} />
</div>
<button
onClick={() => exportCsv(activeTab === 'internal' ? internalMatches : pastMatches)}
className="text-xs bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 font-medium py-1.5 px-3 rounded-lg"
>
Export CSV
</button>
</div>
{activeTab === 'internal' && (
<CandidateList
candidates={internalMatches}
onGenerateOutreach={(candidate) => handleGenerateOutreach(candidate, 'internal')}
onSummarizeCandidate={handleSummarizeCandidate}
onAnalyzeFitAndGaps={handleAnalyzeFitAndGaps}
onHiddenGemDeepDive={handleHiddenGemDeepDive}
summarizingCandidateId={summarizingCandidateId}
analyzingFitGapsCandidateId={analyzingFitGapsCandidate?.id}
analyzingHiddenGemCandidateId={analyzingHiddenGemCandidate?.id}
type="internal"
/>
)}
{activeTab === 'past' && (
<CandidateList
candidates={pastMatches}
