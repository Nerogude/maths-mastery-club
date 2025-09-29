// Google Sheets Integration for Maths Mastery Club
// This file handles sending assessment data to Google Sheets

class GoogleSheetsLogger {
    constructor() {
        // We'll set this up with your Google Apps Script URL
        this.scriptURL = ''; // To be filled in after setup
        this.enabled = false; // Enable after setup
    }

    // Send assessment data to Google Sheets
    async logAssessment(assessmentData) {
        if (!this.enabled || !this.scriptURL) {
            console.log('Google Sheets logging not enabled');
            return false;
        }

        try {
            // Prepare data for Google Sheets
            const dataToSend = {
                timestamp: new Date().toISOString(),
                parentName: assessmentData.parentName,
                parentEmail: assessmentData.parentEmail,
                childYear: assessmentData.childYear,
                score: assessmentData.score,
                maxScore: assessmentData.maxScore,
                percentage: Math.round((assessmentData.score / assessmentData.maxScore) * 100),
                timeSpent: assessmentData.timeSpent,
                timeFormatted: this.formatTime(assessmentData.timeSpent),
                answers: assessmentData.answers.join(','),
                userAgent: navigator.userAgent,
                deviceInfo: this.getDeviceInfo()
            };

            // Send to Google Sheets
            const response = await fetch(this.scriptURL, {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            });

            console.log('Assessment data sent to Google Sheets successfully');
            return true;

        } catch (error) {
            console.error('Error sending to Google Sheets:', error);
            // Don't break the app if Google Sheets fails
            return false;
        }
    }

    // Set the Google Apps Script URL
    setScriptURL(url) {
        this.scriptURL = url;
        this.enabled = true;
        console.log('Google Sheets integration enabled');
    }

    // Disable Google Sheets logging
    disable() {
        this.enabled = false;
        console.log('Google Sheets integration disabled');
    }

    // Get basic device information
    getDeviceInfo() {
        return {
            screen: `${screen.width}x${screen.height}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            language: navigator.language
        };
    }

    // Format time helper
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Test the connection
    async testConnection() {
        if (!this.enabled) {
            return { success: false, message: 'Google Sheets not enabled' };
        }

        try {
            const testData = {
                timestamp: new Date().toISOString(),
                parentName: 'Test Parent',
                parentEmail: 'test@example.com',
                childYear: '4',
                score: 5,
                maxScore: 6,
                percentage: 83,
                timeSpent: 300,
                timeFormatted: '5:00',
                answers: '1,2,0,1,2,1',
                userAgent: 'Test Browser',
                deviceInfo: 'Test Device'
            };

            await fetch(this.scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testData)
            });

            return { success: true, message: 'Test data sent successfully' };

        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

// Create global instance
window.googleSheetsLogger = new GoogleSheetsLogger();

// Admin functions for testing
window.testGoogleSheets = () => {
    return window.googleSheetsLogger.testConnection();
};

console.log('Google Sheets integration loaded (disabled by default)');