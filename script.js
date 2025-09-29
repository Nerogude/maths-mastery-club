// Quiz questions for each year group
const quizQuestions = {
    "2": [
        // Simple questions (easy fluency/basic fact recall)
        {
            question: "What is 4 + 2?",
            options: ["5", "6", "7", "8"],
            correct: 1
        },
        {
            question: "What is 10 - 3?",
            options: ["6", "7", "8", "9"],
            correct: 1
        },
        // Mid-range questions (typical Year 2 expectations)
        {
            question: "What is double 8?",
            options: ["14", "15", "16", "17"],
            correct: 2
        },
        {
            question: "How many 10p coins make £1?",
            options: ["5", "10", "15", "20"],
            correct: 1
        },
        // Stretched questions (challenging but age-appropriate)
        {
            question: "Tom has 23 marbles. He gives away 7 marbles. How many does he have left?",
            options: ["15", "16", "17", "18"],
            correct: 1
        },
        {
            question: "What is the missing number: 15, 20, 25, __, 35?",
            options: ["28", "30", "32", "33"],
            correct: 1
        }
    ],
    "3": [
        // Simple questions (easy fluency/basic fact recall)
        {
            question: "What is 6 × 5?",
            options: ["25", "30", "35", "40"],
            correct: 1
        },
        {
            question: "What is 48 ÷ 8?",
            options: ["5", "6", "7", "8"],
            correct: 1
        },
        // Mid-range questions (typical Year 3 expectations)
        {
            question: "What is 1/4 of 20?",
            options: ["4", "5", "6", "7"],
            correct: 1
        },
        {
            question: "Round 87 to the nearest 10:",
            options: ["80", "85", "90", "95"],
            correct: 2
        },
        // Stretched questions (challenging but age-appropriate)
        {
            question: "A shop has 156 apples. They sell 89 apples. How many apples are left?",
            options: ["67", "77", "87", "97"],
            correct: 0
        },
        {
            question: "What is the perimeter of a rectangle that is 8cm long and 5cm wide?",
            options: ["22cm", "24cm", "26cm", "28cm"],
            correct: 2
        }
    ],
    "4": [
        // Simple questions (easy fluency/basic fact recall)
        {
            question: "What is 9 × 7?",
            options: ["56", "63", "72", "81"],
            correct: 1
        },
        {
            question: "What is 144 ÷ 12?",
            options: ["11", "12", "13", "14"],
            correct: 1
        },
        // Mid-range questions (typical Year 4 expectations)
        {
            question: "What is 3/5 of 25?",
            options: ["12", "15", "18", "20"],
            correct: 1
        },
        {
            question: "Convert 1.8 metres to centimetres:",
            options: ["18cm", "180cm", "1800cm", "18000cm"],
            correct: 1
        },
        // Stretched questions (challenging but age-appropriate)
        {
            question: "A school has 847 pupils. 359 are boys. How many are girls?",
            options: ["478", "488", "498", "508"],
            correct: 1
        },
        {
            question: "What is the area of a square with sides of 9cm?",
            options: ["72cm²", "81cm²", "90cm²", "99cm²"],
            correct: 1
        }
    ],
    "5": [
        // Simple questions (easy fluency/basic fact recall)
        {
            question: "What is 12 × 8?",
            options: ["84", "96", "104", "112"],
            correct: 1
        },
        {
            question: "What is 360 ÷ 15?",
            options: ["22", "24", "26", "28"],
            correct: 1
        },
        // Mid-range questions (typical Year 5 expectations)
        {
            question: "Simplify the fraction 18/24:",
            options: ["2/3", "3/4", "4/5", "5/6"],
            correct: 1
        },
        {
            question: "What is 25% of 80?",
            options: ["15", "20", "25", "30"],
            correct: 1
        },
        // Stretched questions (challenging but age-appropriate)
        {
            question: "A rectangular garden is 15m long and 8m wide. What is its area?",
            options: ["115m²", "120m²", "125m²", "130m²"],
            correct: 1
        },
        {
            question: "Convert 0.75 to a fraction in its simplest form:",
            options: ["3/4", "7/10", "15/20", "75/100"],
            correct: 0
        }
    ],
    "6": [
        // Simple questions (easy fluency/basic fact recall)
        {
            question: "What is 15 × 12?",
            options: ["160", "170", "180", "190"],
            correct: 2
        },
        {
            question: "What is 420 ÷ 20?",
            options: ["19", "21", "23", "25"],
            correct: 1
        },
        // Mid-range questions (typical Year 6 expectations)
        {
            question: "Convert 5/8 to a decimal:",
            options: ["0.6", "0.625", "0.65", "0.675"],
            correct: 1
        },
        {
            question: "What is 40% of 125?",
            options: ["45", "50", "55", "60"],
            correct: 1
        },
        // Stretched questions (challenging but age-appropriate)
        {
            question: "The ratio of boys to girls in a class is 3:5. If there are 15 boys, how many girls are there?",
            options: ["20", "25", "30", "35"],
            correct: 1
        },
        {
            question: "Solve: 4y - 9 = 31. What is y?",
            options: ["8", "9", "10", "11"],
            correct: 2
        }
    ]
};

// Assessment feedback templates
const feedbackTemplates = {
    excellent: "Your child is performing exceptionally well! They demonstrate strong understanding across all key areas.",
    good: "Your child shows good mathematical understanding with room for growth in specific areas.",
    developing: "Your child is developing their mathematical skills and would benefit from targeted support.",
    needsSupport: "Your child would benefit significantly from structured maths support to build confidence and skills."
};

// Store assessment data
let assessmentData = {
    parentName: '',
    parentEmail: '',
    childYear: '',
    answers: [],
    score: 0,
    maxScore: 0,
    startTime: null,
    endTime: null,
    timeSpent: 0
};

// Timer variables
let assessmentTimer = null;
let timeRemaining = 480; // 8 minutes in seconds
const ASSESSMENT_TIME_LIMIT = 480; // 8 minutes
let audioContext = null;
let soundEnabled = true;

// DOM elements
const parentForm = document.getElementById('parent-form');
const startAssessmentBtn = document.getElementById('start-assessment');
const quizContainer = document.getElementById('quiz-container');
const quizContent = document.getElementById('quiz-content');
const submitQuizBtn = document.getElementById('submit-quiz');
const resultsContainer = document.getElementById('results-container');
const scoreDisplay = document.getElementById('score-display');
const feedbackDisplay = document.getElementById('feedback-display');

// Event listeners
startAssessmentBtn.addEventListener('click', startAssessment);
submitQuizBtn.addEventListener('click', submitAssessment);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function startAssessment() {
    // Get form data
    const parentName = document.getElementById('parent-name').value.trim();
    const parentEmail = document.getElementById('parent-email').value.trim();
    const childYear = document.getElementById('child-year').value;

    // Validate form
    if (!parentName || !parentEmail || !childYear) {
        alert('Please fill in all fields before starting the assessment.');
        return;
    }

    // Validate email format
    if (!isValidEmail(parentEmail)) {
        alert('Please enter a valid email address (e.g., parent@example.com).');
        document.getElementById('parent-email').focus();
        return;
    }

    // Store parent data
    assessmentData.parentName = parentName;
    assessmentData.parentEmail = parentEmail;
    assessmentData.childYear = childYear;
    assessmentData.answers = [];
    assessmentData.startTime = new Date();

    // Reset timer
    timeRemaining = ASSESSMENT_TIME_LIMIT;

    // Hide form and show quiz
    parentForm.style.display = 'none';
    quizContainer.style.display = 'block';

    // Generate quiz
    generateQuiz(childYear);

    // Start timer
    startTimer();
}

function generateQuiz(year) {
    const questions = quizQuestions[year];
    assessmentData.maxScore = questions.length;

    let quizHTML = `
        <div class="quiz-header">
            <h3>Assessment Questions - Year ${year}</h3>
            <div class="timer-container">
                <div class="timer-header">
                    <div class="timer-display" id="timer-display">
                        <span class="timer-icon">⏱️</span>
                        <span id="timer-text">8:00</span>
                    </div>
                    <button type="button" id="sound-toggle" class="sound-toggle" title="Toggle sound effects">
                        <span id="sound-icon">🔊</span>
                    </button>
                </div>
                <div class="timer-progress">
                    <div class="timer-progress-bar" id="timer-progress-bar"></div>
                </div>
            </div>
        </div>
    `;

    questions.forEach((question, index) => {
        quizHTML += `
            <div class="question">
                <h4>Question ${index + 1}: ${question.question}</h4>
                <ul class="options">
        `;

        question.options.forEach((option, optionIndex) => {
            quizHTML += `
                <li>
                    <input type="radio" id="q${index}_${optionIndex}" name="question_${index}" value="${optionIndex}">
                    <label for="q${index}_${optionIndex}">${option}</label>
                </li>
            `;
        });

        quizHTML += '</ul></div>';
    });

    quizContent.innerHTML = quizHTML;
    submitQuizBtn.style.display = 'block';

    // Add sound toggle event listener
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');

    if (soundToggle && soundIcon) {
        soundToggle.addEventListener('click', function() {
            soundEnabled = !soundEnabled;
            soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
            soundToggle.title = soundEnabled ? 'Disable sound effects' : 'Enable sound effects';

            // Play a test sound when enabling
            if (soundEnabled) {
                playTickSound();
            }
        });
    }
}

function submitAssessment() {
    // Stop timer
    stopTimer();

    const questions = quizQuestions[assessmentData.childYear];
    let score = 0;

    // Record end time and calculate time spent
    assessmentData.endTime = new Date();
    assessmentData.timeSpent = Math.round((assessmentData.endTime - assessmentData.startTime) / 1000);

    // Check answers
    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="question_${index}"]:checked`);
        if (selectedAnswer) {
            const answerValue = parseInt(selectedAnswer.value);
            assessmentData.answers.push(answerValue);
            if (answerValue === question.correct) {
                score++;
            }
        } else {
            assessmentData.answers.push(-1); // No answer selected
        }
    });

    assessmentData.score = score;

    // Save assessment data locally
    saveAssessmentData();

    // Send to Google Sheets (non-blocking)
    if (window.googleSheetsLogger) {
        googleSheetsLogger.logAssessment(assessmentData).catch(error => {
            console.log('Google Sheets logging failed (app continues normally):', error);
        });
    }

    // Show results
    showResults();
}

function showResults() {
    const { score, maxScore, childYear, timeSpent } = assessmentData;
    const percentage = Math.round((score / maxScore) * 100);

    // Hide quiz, show results
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';

    // Display score with time
    scoreDisplay.innerHTML = `
        <h4>Assessment Complete!</h4>
        <p>Your child scored <strong>${score} out of ${maxScore}</strong> (${percentage}%)</p>
        <p class="time-spent">Time spent: <strong>${formatTime(timeSpent)}</strong></p>
    `;

    // Generate feedback
    let feedback = generateFeedback(percentage, childYear);
    feedbackDisplay.innerHTML = feedback;

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

function generateFeedback(percentage, year) {
    let level = '';
    let strengthsAndAreas = getDetailedFeedback(assessmentData.answers, year);

    if (percentage >= 85) {
        level = feedbackTemplates.excellent;
    } else if (percentage >= 70) {
        level = feedbackTemplates.good;
    } else if (percentage >= 50) {
        level = feedbackTemplates.developing;
    } else {
        level = feedbackTemplates.needsSupport;
    }

    return `
        <h4>Assessment Feedback</h4>
        <p><strong>Performance Level:</strong> ${level}</p>
        <div class="detailed-feedback">
            <p><strong>Strengths:</strong> ${strengthsAndAreas.strengths}</p>
            <p><strong>Areas to improve:</strong> ${strengthsAndAreas.improvements}</p>
        </div>
        <p><strong>Recommendation:</strong> Based on this assessment, your child would benefit from our structured approach to build confidence and fill any gaps in understanding.</p>
    `;
}

function getDetailedFeedback(answers, year) {
    const topicAreas = {
        "2": ["Basic addition", "Basic subtraction", "Doubling", "Money (coins)", "Word problems", "Number sequences"],
        "3": ["Times tables", "Division facts", "Fractions", "Rounding", "Subtraction with regrouping", "Perimeter"],
        "4": ["Times tables", "Division", "Fractions", "Measurement conversion", "Large number subtraction", "Area calculations"],
        "5": ["Multiplication", "Division", "Fraction simplification", "Percentages", "Area calculations", "Decimal to fraction conversion"],
        "6": ["Multiplication", "Division", "Decimal conversion", "Percentages", "Ratio problems", "Basic algebra"]
    };

    const questions = quizQuestions[year];
    const areas = topicAreas[year];
    let strengths = [];
    let improvements = [];

    answers.forEach((answer, index) => {
        if (answer === questions[index].correct) {
            strengths.push(areas[index]);
        } else if (answer !== -1) {
            improvements.push(areas[index]);
        }
    });

    return {
        strengths: strengths.length > 0 ? strengths.join(', ') : 'Needs comprehensive review',
        improvements: improvements.length > 0 ? improvements.join(', ') : 'Continue building on current strengths'
    };
}

function saveAssessmentData() {
    // In a real application, this would send data to a server
    // For now, we'll store it in localStorage and log it
    const timestamp = new Date().toISOString();
    const fullData = {
        ...assessmentData,
        timestamp: timestamp,
        userAgent: navigator.userAgent
    };

    // Store in localStorage
    let existingData = JSON.parse(localStorage.getItem('mathsAssessments') || '[]');
    existingData.push(fullData);
    localStorage.setItem('mathsAssessments', JSON.stringify(existingData));

    // Log for debugging (remove in production)
    console.log('Assessment data saved:', fullData);

    // In production, you would send this data to your backend:
    // fetch('/api/save-assessment', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(fullData)
    // });
}

// Function to export assessment data (for admin use)
function exportAssessmentData() {
    const data = JSON.parse(localStorage.getItem('mathsAssessments') || '[]');
    const csv = convertToCSV(data);
    downloadCSV(csv, 'maths_assessments.csv');
}

function convertToCSV(data) {
    if (data.length === 0) return '';

    const headers = ['Timestamp', 'Parent Name', 'Parent Email', 'Child Year', 'Score', 'Max Score', 'Percentage', 'Answers'];
    const rows = data.map(item => [
        item.timestamp,
        item.parentName,
        item.parentEmail,
        item.childYear,
        item.score,
        item.maxScore,
        Math.round((item.score / item.maxScore) * 100) + '%',
        item.answers.join(';')
    ]);

    return [headers, ...rows].map(row =>
        row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
}

function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Make export function available globally for admin use
window.exportAssessmentData = exportAssessmentData;

// Email validation function
function isValidEmail(email) {
    // Comprehensive email regex pattern
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Additional checks for common issues
    if (email.length === 0) return false;
    if (email.length > 254) return false; // RFC 5321 limit
    if (email.includes('..')) return false; // Consecutive dots not allowed
    if (email.startsWith('.') || email.endsWith('.')) return false;
    if (email.includes('@.') || email.includes('.@')) return false;

    return emailRegex.test(email);
}

// Audio functions
function initializeAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        return true;
    } catch (e) {
        console.warn('Web Audio API not supported:', e);
        soundEnabled = false;
        return false;
    }
}

function playBeep(frequency = 800, duration = 200, volume = 0.3) {
    if (!soundEnabled || !audioContext) return;

    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
        console.warn('Audio playback failed:', e);
    }
}

function playTickSound() {
    playBeep(600, 100, 0.2);
}

function playWarningSound() {
    playBeep(400, 300, 0.4);
}

function playUrgentSound() {
    playBeep(300, 500, 0.5);
}

function playFinalCountdown() {
    // Play a more urgent beep pattern for the last 10 seconds
    playBeep(800, 150, 0.6);
    setTimeout(() => playBeep(800, 150, 0.6), 200);
}

// Timer functions
function startTimer() {
    // Initialize audio on first user interaction
    if (!audioContext) {
        initializeAudio();
    }
    assessmentTimer = setInterval(updateTimer, 1000);
}

function stopTimer() {
    if (assessmentTimer) {
        clearInterval(assessmentTimer);
        assessmentTimer = null;
    }
}

function updateTimer() {
    timeRemaining--;

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    const timerText = document.getElementById('timer-text');
    const timerDisplay = document.getElementById('timer-display');
    const progressBar = document.getElementById('timer-progress-bar');

    if (timerText) {
        timerText.textContent = timeDisplay;
    }

    // Update progress bar
    if (progressBar) {
        const progressPercentage = ((ASSESSMENT_TIME_LIMIT - timeRemaining) / ASSESSMENT_TIME_LIMIT) * 100;
        progressBar.style.width = progressPercentage + '%';
    }

    // Play sound effects at key moments
    if (timeRemaining <= 10) {
        // Final countdown - double beep for last 10 seconds
        playFinalCountdown();
    } else if (timeRemaining === 60) {
        // One minute warning - urgent sound
        playUrgentSound();
    } else if (timeRemaining === 180) {
        // Three minute warning - warning sound
        playWarningSound();
    } else if (timeRemaining === 300) {
        // Five minute mark - gentle tick
        playTickSound();
    }

    // Change color when time is running low
    if (timerDisplay) {
        if (timeRemaining <= 60) { // Last minute - red
            timerDisplay.classList.add('timer-warning');
            timerDisplay.classList.remove('timer-normal', 'timer-caution');
        } else if (timeRemaining <= 180) { // Last 3 minutes - orange
            timerDisplay.classList.add('timer-caution');
            timerDisplay.classList.remove('timer-normal', 'timer-warning');
        } else {
            timerDisplay.classList.add('timer-normal');
            timerDisplay.classList.remove('timer-warning', 'timer-caution');
        }
    }

    // Auto-submit when time runs out
    if (timeRemaining <= 0) {
        stopTimer();
        alert('Time is up! Your assessment will be submitted automatically.');
        submitAssessment();
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Add some visual feedback for form interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add focus effects to form inputs
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#3498db';
            this.style.boxShadow = '0 0 5px rgba(52, 152, 219, 0.3)';
        });

        input.addEventListener('blur', function() {
            this.style.borderColor = '#bdc3c7';
            this.style.boxShadow = 'none';
        });
    });

    // Add real-time email validation
    const emailInput = document.getElementById('parent-email');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            const isValid = isValidEmail(email);

            // Remove existing validation classes
            this.classList.remove('valid-email', 'invalid-email');

            if (email.length > 0) {
                if (isValid) {
                    this.classList.add('valid-email');
                    this.style.borderColor = '#27ae60';
                    this.style.boxShadow = '0 0 5px rgba(39, 174, 96, 0.3)';
                } else {
                    this.classList.add('invalid-email');
                    this.style.borderColor = '#e74c3c';
                    this.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
                }
            } else {
                // Empty field - reset to default
                this.style.borderColor = '#bdc3c7';
                this.style.boxShadow = 'none';
            }
        });
    }

    // Add loading state to buttons
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.id === 'start-assessment' || this.id === 'submit-quiz') {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;

                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 1000);
            }
        });
    });
});