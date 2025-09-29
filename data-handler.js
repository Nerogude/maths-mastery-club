// Simple data handler for Maths Mastery Club assessments
// This file provides utility functions for managing assessment data

class AssessmentDataHandler {
    constructor() {
        this.storageKey = 'mathsAssessments';
    }

    // Save assessment data to localStorage
    saveAssessment(assessmentData) {
        try {
            const timestamp = new Date().toISOString();
            const fullData = {
                ...assessmentData,
                timestamp: timestamp,
                id: this.generateId(),
                userAgent: navigator.userAgent
            };

            let existingData = this.getAllAssessments();
            existingData.push(fullData);

            localStorage.setItem(this.storageKey, JSON.stringify(existingData));
            return fullData.id;
        } catch (error) {
            console.error('Error saving assessment:', error);
            return null;
        }
    }

    // Get all assessment data
    getAllAssessments() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        } catch (error) {
            console.error('Error retrieving assessments:', error);
            return [];
        }
    }

    // Get assessment by ID
    getAssessmentById(id) {
        const assessments = this.getAllAssessments();
        return assessments.find(assessment => assessment.id === id);
    }

    // Get assessments by date range
    getAssessmentsByDateRange(startDate, endDate) {
        const assessments = this.getAllAssessments();
        return assessments.filter(assessment => {
            const assessmentDate = new Date(assessment.timestamp);
            return assessmentDate >= startDate && assessmentDate <= endDate;
        });
    }

    // Export data as CSV
    exportToCSV() {
        const assessments = this.getAllAssessments();
        if (assessments.length === 0) {
            alert('No assessment data to export.');
            return;
        }

        const headers = [
            'ID', 'Timestamp', 'Parent Name', 'Parent Email',
            'Child Year', 'Score', 'Max Score', 'Percentage',
            'Time Spent (seconds)', 'Time Spent (formatted)',
            'Answers', 'User Agent'
        ];

        const rows = assessments.map(item => [
            item.id || '',
            item.timestamp || '',
            item.parentName || '',
            item.parentEmail || '',
            item.childYear || '',
            item.score || 0,
            item.maxScore || 0,
            item.maxScore ? Math.round((item.score / item.maxScore) * 100) + '%' : '0%',
            item.timeSpent || 0,
            this.formatTime(item.timeSpent || 0),
            (item.answers || []).join(';'),
            item.userAgent || ''
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
            .join('\n');

        this.downloadFile(csvContent, 'maths_assessments.csv', 'text/csv');
    }

    // Export data as JSON
    exportToJSON() {
        const assessments = this.getAllAssessments();
        if (assessments.length === 0) {
            alert('No assessment data to export.');
            return;
        }

        const jsonContent = JSON.stringify(assessments, null, 2);
        this.downloadFile(jsonContent, 'maths_assessments.json', 'application/json');
    }

    // Clear all assessment data (use with caution)
    clearAllData() {
        if (confirm('Are you sure you want to delete all assessment data? This cannot be undone.')) {
            localStorage.removeItem(this.storageKey);
            alert('All assessment data has been cleared.');
        }
    }

    // Generate a simple unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Format time in seconds to MM:SS format
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Helper function to download files
    downloadFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Get summary statistics
    getSummaryStats() {
        const assessments = this.getAllAssessments();
        if (assessments.length === 0) return null;

        const yearGroups = {};
        let totalScore = 0;
        let totalMaxScore = 0;

        assessments.forEach(assessment => {
            const year = assessment.childYear;
            if (!yearGroups[year]) {
                yearGroups[year] = { count: 0, totalScore: 0, totalMaxScore: 0 };
            }
            yearGroups[year].count++;
            yearGroups[year].totalScore += assessment.score;
            yearGroups[year].totalMaxScore += assessment.maxScore;

            totalScore += assessment.score;
            totalMaxScore += assessment.maxScore;
        });

        return {
            totalAssessments: assessments.length,
            overallPercentage: totalMaxScore ? Math.round((totalScore / totalMaxScore) * 100) : 0,
            yearGroupBreakdown: Object.keys(yearGroups).map(year => ({
                year: year,
                count: yearGroups[year].count,
                averagePercentage: Math.round((yearGroups[year].totalScore / yearGroups[year].totalMaxScore) * 100)
            })),
            firstAssessment: assessments[0]?.timestamp,
            lastAssessment: assessments[assessments.length - 1]?.timestamp
        };
    }
}

// Create global instance
window.assessmentDataHandler = new AssessmentDataHandler();

// Admin panel functions (accessible via browser console)
window.adminPanel = {
    exportCSV: () => window.assessmentDataHandler.exportToCSV(),
    exportJSON: () => window.assessmentDataHandler.exportToJSON(),
    viewStats: () => console.log(window.assessmentDataHandler.getSummaryStats()),
    viewAllData: () => console.log(window.assessmentDataHandler.getAllAssessments()),
    clearData: () => window.assessmentDataHandler.clearAllData()
};

console.log('Assessment Data Handler loaded. Use adminPanel.viewStats() to see summary statistics.');