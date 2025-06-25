// frontend/script.js

// URLs do seu backend
const API_BASE_URL = 'http://localhost:3000/api'; // STILL USED FOR LOGIN/REGISTER/BACKEND PIREPS

document.addEventListener('DOMContentLoaded', () => {

    // ======== Referências de navegação (HTML IDs) ========
    const navLinks = document.querySelectorAll('nav ul li a'); // All navigation links
    const navHome = document.getElementById('nav-home');
    const navFleet = document.getElementById('nav-fleet');
    const navHubs = document.getElementById('nav-hubs');
    const navProfile = document.getElementById('nav-profile');

    // Main content sections
    const homeContent = document.getElementById('home-content'); // This is your crewCenterSection
    const fleetContent = document.getElementById('fleet-content');
    const hubsContent = document.getElementById('hubs-content');
    const profileContent = document.getElementById('profile-content');

    const allContentSections = document.querySelectorAll('main .content-section'); // All sections to hide/show
    const authSection = document.getElementById('auth-section'); // Authentication section
    const crewCenterSection = document.getElementById('crew-center-section'); // Your main dashboard

    // Authentication Elements
    const loginContainer = document.getElementById('login-container');
    const registerContainer = document.getElementById('register-container');
    const authMessage = document.getElementById('auth-message');
    const loginForm = document.getElementById('login-form');
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');
    const registerForm = document.getElementById('register-form');
    const registerUsernameInput = document.getElementById('register-username');
    const registerPasswordInput = document.getElementById('register-password');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const pilotUsernameSpan = document.getElementById('pilot-username');
    const logoutButton = document.getElementById('logout-button');

    // ======== Dados das Aeronaves (Static - from your old script) ========
    const aircraftListContainer = document.getElementById('aircraft-list-container');
    const airportFilter = document.getElementById('airport-filter');

    const aircrafts = [
        { id: '3032', registration: 'PR-MBN', type: 'A319', location: 'SBGR', status: 'Available', totalHours: 1540.3, lastPilot: 'None' },
        { id: '3588', registration: 'PR-MBU', type: 'A319', location: 'KJFK', status: 'In Flight', totalHours: 987.1, lastPilot: 'Jane Doe' },
        { id: '3595', registration: 'PR-MBV', type: 'A319', location: 'EHAM', status: 'Maintenance', totalHours: 230.5, lastPilot: 'John Smith' },
        { id: '3710', registration: 'PR-MBW', type: 'A319', location: 'SBGR', status: 'Available', totalHours: 1210.0, lastPilot: 'None' },
        { id: '3733', registration: 'PR-MYC', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4734', registration: 'PR-MYL', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4756', registration: 'PR-MYM', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4000', registration: 'PT-TMA', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4163', registration: 'PT-TMB', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4171', registration: 'PT-TMC', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4192', registration: 'PT-TMD', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4389', registration: 'PT-TME', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4773', registration: 'PT-TMG', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5345', registration: 'PT-TMI', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '2887', registration: 'PT-TML', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4563', registration: 'PT-TMO', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '2321', registration: 'PT-TMT', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5005', registration: 'PT-TPA', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5097', registration: 'PT-TPB', type: 'A319', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '1832', registration: 'PR-MAG', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '1825', registration: 'PR-MAK', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '2734', registration: 'PR-MBA', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '2896', registration: 'PR-MBF', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '1459', registration: 'PR-MBG', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '2904', registration: 'PR-MBH', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '2924', registration: 'PR-MHA', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3111', registration: 'PR-MHE', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3180', registration: 'PR-MHF', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3002', registration: 'PR-MHG', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3035', registration: 'PR-MHI', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3047', registration: 'PR-MHJ', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3058', registration: 'PR-MHK', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3211', registration: 'PR-MHM', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3266', registration: 'PR-MHP', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3284', registration: 'PR-MHQ', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3313', registration: 'PR-MHR', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3391', registration: 'PR-MHU', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3630', registration: 'PR-MHW', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3565', registration: 'PR-MHX', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3658', registration: 'PR-MHZ', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '3662', registration: 'PR-MYA', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4441', registration: 'PR-MYH', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4446', registration: 'PR-MYI', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4465', registration: 'PR-MYJ', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4544', registration: 'PR-MYK', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4953', registration: 'PR-MYN', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4974', registration: 'PR-MYO', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5066', registration: 'PR-MYP', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5101', registration: 'PR-MYQ', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5107', registration: 'PR-MYR', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5184', registration: 'PR-MYT', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5222', registration: 'PR-MYV', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5240', registration: 'PR-MYW', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5342', registration: 'PR-MYX', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5591', registration: 'PR-MYY', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4827', registration: 'PR-TQB', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '4860', registration: 'PR-TQC', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5643', registration: 'PR-TYA', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5749', registration: 'PR-TYD', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5752', registration: 'PR-TYF', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '5883', registration: 'PR-TYH', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6139', registration: 'PR-TYI', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6173', registration: 'PR-TYJ', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6528', registration: 'PR-TYK', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6536', registration: 'PR-TYL', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6561', registration: 'PR-TYM', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6598', registration: 'PR-TYN', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6634', registration: 'PR-TYO', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6800', registration: 'PR-TYP', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6806', registration: 'PR-TYQ', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6813', registration: 'PR-TYR', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6689', registration: 'PR-TYS', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6712', registration: 'PR-TYT', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6871', registration: 'PR-TYU', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '6876', registration: 'PR-TYV', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
        { id: '1376', registration: 'PT-MZL', type: 'A320', location: 'SBGL', status: 'Available', totalHours: 650.8, lastPilot: 'None' },
    ];

    let currentPilotName = "You (Pilot)"; // This will be updated on login
    let bookedAircraftRegistration = null; // Stores the currently booked aircraft by the user

    // === Banco de Dados de Rotas (from your old script) ===
    const routesDatabase = {
        'LA1001': { origin: 'SBGR', destination: 'KJFK', defaultTime: 10.00 },
        'LA1002': { origin: 'KJFK', destination: 'SBGR', defaultTime: 9.30 },
        'LA2001': { origin: 'SBGR', destination: 'SBGL', defaultTime: 1.00 },
        'LA2002': { origin: 'SBGL', destination: 'SBGR', defaultTime: 1.05 },
        'LA3001': { origin: 'SBGL', destination: 'EHAM', defaultTime: 11.45 },
        'LA4000': { origin: 'SBRJ', destination: 'SBSP', defaultTime: 0.45 },
        'LA5000': { origin: 'EGLL', destination: 'LFPG', defaultTime: 1.20 }
    };

    // ======== Variáveis para os Gráficos do Chart.js ========
    let aircraftTypeChartInstance = null;
    let originAirportChartInstance = null;
    let destinationAirportChartInstance = null;

    // ======== PIREP History (Local) ========
    // This will store PIREPs locally in the browser, not from the backend API.
    // If you want PIREPs to persist via the backend, you'll need to modify
    // the PIREP filing logic to send data to your backend's /api/pireps route
    // and fetch from there instead of using this local array.
    const pireps = []; 

    // ======== Functions for UI Messages ========
    function displayMessage(element, message, isError = false) {
        element.textContent = message;
        element.style.color = isError ? 'red' : 'green';
    }

    // ======== Authentication & UI Update Logic ========
    function updateUI() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (token && username) {
            // User is logged in
            authSection.style.display = 'none';
            crewCenterSection.style.display = 'block'; // Show the main dashboard
            pilotUsernameSpan.textContent = username;
            currentPilotName = username; // Set current pilot name from logged-in user

            // Show navigation links and logout button
            document.querySelector('nav').style.display = 'block';
            document.getElementById('logout-nav-item').style.display = 'inline-block'; // Or 'list-item'
            
            // Set 'Home' as active and show its content
            navLinks.forEach(link => link.classList.remove('active'));
            navHome.classList.add('active');
            showSection(homeContent); // Show main dashboard
            
            // Ensure PIREPs for dashboard are fetched from backend (if applicable)
            // fetchPireps(); // This was for backend PIREPs, now using local 'pireps' array
                               // If you want backend PIREPs on dashboard, you'd add this back
                               // and modify fetchPireps to target the right container.

        } else {
            // User is not logged in
            authSection.style.display = 'block';
            loginContainer.style.display = 'block';
            registerContainer.style.display = 'none';
            crewCenterSection.style.display = 'none'; // Hide the main dashboard
            authMessage.textContent = ''; // Clear auth messages

            // Hide navigation links and logout button
            document.querySelector('nav').style.display = 'none';
            document.getElementById('logout-nav-item').style.display = 'none';
            hideAllContentSections(true); // Hide all sections, including crew center, if logged out
        }
    }

    // --- Authentication Event Listeners ---
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = registerUsernameInput.value;
        const password = registerPasswordInput.value;

        displayMessage(authMessage, 'Registrando...');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                displayMessage(authMessage, data.message, false);
                setTimeout(() => {
                    showLoginLink.click();
                    registerForm.reset();
                    authMessage.textContent = '';
                }, 2000);
            } else {
                displayMessage(authMessage, data.message || 'Erro ao registrar.', true);
            }
        } catch (error) {
            console.error('Erro de registro:', error);
            displayMessage(authMessage, 'Erro de conexão ou servidor.', true);
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = loginUsernameInput.value;
        const password = loginPasswordInput.value;

        displayMessage(authMessage, 'Autenticando...');

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                displayMessage(authMessage, data.message, false);
                loginForm.reset();
                updateUI(); // Update UI after successful login
            } else {
                displayMessage(authMessage, data.message || 'Erro ao fazer login.', true);
            }
        } catch (error) {
            console.error('Erro de login:', error);
            displayMessage(authMessage, 'Erro de conexão ou servidor.', true);
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        bookedAircraftRegistration = null; // Clear booked aircraft on logout
        updateUI(); // Return to auth screen
    });

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        authMessage.textContent = '';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        authMessage.textContent = '';
    });

    // ======== Navigation Functions ========
    function hideAllContentSections(includeCrewCenter = false) {
        allContentSections.forEach(section => {
            if (section.id !== 'auth-section' || includeCrewCenter) { // Always hide auth section, but crew center only if specified
                section.classList.add('hidden');
            }
        });
        if (includeCrewCenter) {
            crewCenterSection.classList.add('hidden');
        }
    }

    function showSection(sectionToShow) {
        hideAllContentSections(true); // Hide all sections including crewCenter by default

        // Handle specific sections
        if (sectionToShow === homeContent) {
            crewCenterSection.classList.remove('hidden'); // Home is crewCenterSection
        } else {
            sectionToShow.classList.remove('hidden');
        }
        
        // NOVIDADE: Atualiza o perfil e renderiza gráficos sempre que a seção é mostrada
        if (sectionToShow === profileContent) {
            updateProfileDashboard();
            updateActiveBookingDisplay();
            populatePirepHistoryFilters();
            renderPirepHistory(document.getElementById('pirep-history-list'));
            renderAircraftTypeChart();
            renderOriginAirportChart();
            renderDestinationAirportChart();
        } else if (sectionToShow === fleetContent) {
            renderAircrafts(airportFilter.value); // Re-render fleet when entering the tab
        }
    }

    // Add event listeners for the navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove 'active' from all links and add to the clicked one
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            switch(link.id) {
                case 'nav-home':
                    showSection(homeContent);
                    break;
                case 'nav-fleet':
                    showSection(fleetContent);
                    break;
                case 'nav-hubs':
                    showSection(hubsContent);
                    break;
                case 'nav-profile':
                    showSection(profileContent);
                    break;
                default:
                    break;
            }
        });
    });

    // ======== Functions for Fleet Management ========
    function renderAircrafts(filterAirport = '') {
        aircraftListContainer.innerHTML = ''; // Clear current list

        const filteredAircrafts = filterAirport
            ? aircrafts.filter(ac => ac.location === filterAirport)
            : aircrafts;

        if (filteredAircrafts.length === 0) {
            aircraftListContainer.innerHTML = '<p>No aircraft found matching your criteria.</p>';
            return;
        }

        filteredAircrafts.forEach(aircraft => {
            const aircraftCard = document.createElement('div');
            aircraftCard.classList.add('aircraft-card');
            if (aircraft.status !== 'Available') {
                aircraftCard.classList.add('unavailable');
            }

            const isBookedByMe = (bookedAircraftRegistration === aircraft.registration);
            const canBook = (aircraft.status === 'Available' && bookedAircraftRegistration === null);
            const isReleaseOrPirepAvailable = isBookedByMe;

            aircraftCard.innerHTML = `
                <h3>${aircraft.registration} (${aircraft.type})</h3>
                <p><strong>Location:</strong> ${aircraft.location}</p>
                <p><strong>Status:</strong> ${aircraft.status} ${aircraft.status === 'In Flight' && aircraft.lastPilot !== currentPilotName ? `(by ${aircraft.lastPilot})` : ''}</p>
                <p><strong>Total Hours:</strong> ${aircraft.totalHours.toFixed(1)} hrs</p>
                
                <button class="book-button" data-aircraft-registration="${aircraft.registration}" ${!canBook ? 'disabled' : ''}>
                    ${isBookedByMe ? 'Booked' : 'Book this Aircraft'}
                </button>
                <button class="release-button" data-aircraft-registration="${aircraft.registration}" ${!isReleaseOrPirepAvailable ? 'disabled' : ''} style="${isReleaseOrPirepAvailable ? '' : 'display: none;'}">
                    Release this Aircraft
                </button>
                <button class="file-pirep-fleet-button" data-aircraft-registration="${aircraft.registration}" ${!isReleaseOrPirepAvailable ? 'disabled' : ''} style="${isReleaseOrPirepAvailable ? '' : 'display: none;'}">
                    File PIREP for this Aircraft
                </button>
                <button class="move-button" data-aircraft-registration="${aircraft.registration}" ${!canBook || isBookedByMe ? 'disabled' : ''}>Move to My Location</button>
                <button class="details-button" data-aircraft-registration="${aircraft.registration}">View Details</button>
            `;

            aircraftListContainer.appendChild(aircraftCard);
        });
        addAircraftButtonListeners();
    }

    function addAircraftButtonListeners() {
        document.querySelectorAll('.book-button').forEach(button => {
            button.onclick = (e) => bookAircraft(e.target.dataset.aircraftRegistration);
        });
        document.querySelectorAll('.release-button').forEach(button => {
            button.onclick = (e) => releaseAircraft(e.target.dataset.aircraftRegistration);
        });
        document.querySelectorAll('.file-pirep-fleet-button').forEach(button => {
            button.onclick = (e) => filePirepForAircraft(e.target.dataset.aircraftRegistration);
        });
        document.querySelectorAll('.move-button').forEach(button => {
            button.onclick = (e) => moveAircraft(e.target.dataset.aircraftRegistration);
        });
        document.querySelectorAll('.details-button').forEach(button => {
            button.onclick = (e) => viewAircraftDetails(e.target.dataset.aircraftRegistration);
        });
    }

    // Initial render of aircrafts when the page loads
    // This will happen only after login, due to updateUI calling showSection('home-content')
    // and navigation to 'fleet-content' calls renderAircrafts
    // renderAircrafts(); 

    airportFilter.addEventListener('change', () => {
        const selectedAirport = airportFilter.value;
        renderAircrafts(selectedAirport);
    });

    // ======== Aircraft Interaction Functions ========
    function bookAircraft(registration) {
        const aircraft = aircrafts.find(ac => ac.registration === registration);
        if (aircraft && aircraft.status === 'Available' && !bookedAircraftRegistration) {
            bookedAircraftRegistration = registration;
            // You might want to update aircraft status here if you had a backend for it
            // aircraft.status = 'Booked'; // Locally mark as booked
            displayMessage(document.getElementById('fleet-message'), `Aircraft ${registration} booked! You can now file a PIREP.`, false);
            updateActiveBookingDisplay();
            renderAircrafts(airportFilter.value); // Re-render fleet to update buttons
        } else if (bookedAircraftRegistration) {
            displayMessage(document.getElementById('fleet-message'), `You already have ${bookedAircraftRegistration} booked. Release it first.`, true);
        } else {
            displayMessage(document.getElementById('fleet-message'), `Aircraft ${registration} is not available for booking.`, true);
        }
    }

    function releaseAircraft(registration) {
        if (bookedAircraftRegistration === registration) {
            bookedAircraftRegistration = null;
            const aircraft = aircrafts.find(ac => ac.registration === registration);
            // if (aircraft) aircraft.status = 'Available'; // Mark as available locally
            displayMessage(document.getElementById('fleet-message'), `Aircraft ${registration} released.`, false);
            updateActiveBookingDisplay();
            renderAircrafts(airportFilter.value); // Re-render fleet to update buttons
        } else {
            displayMessage(document.getElementById('fleet-message'), `You don't have aircraft ${registration} booked.`, true);
        }
    }

    function filePirepForAircraft(registration) {
        if (bookedAircraftRegistration === registration) {
            pirepAircraftInput.value = registration;
            showSection(profileContent); // Navigate to profile to file PIREP
            filePirepFormContainer.classList.remove('hidden');
            toggleFilePirepBtn.textContent = 'Hide PIREP Form';
        } else {
            alert(`You must book aircraft ${registration} before filing a PIREP for it.`);
        }
    }

    function moveAircraft(registration) {
        const aircraft = aircrafts.find(ac => ac.registration === registration);
        if (aircraft && aircraft.status === 'Available' && !bookedAircraftRegistration) {
            const newLocation = prompt(`Enter new location for ${registration} (e.g., SBGR, KJFK):`).toUpperCase();
            if (newLocation) {
                aircraft.location = newLocation;
                displayMessage(document.getElementById('fleet-message'), `${registration} moved to ${newLocation}.`, false);
                renderAircrafts(airportFilter.value);
            }
        } else if (bookedAircraftRegistration) {
            displayMessage(document.getElementById('fleet-message'), `You must release ${bookedAircraftRegistration} before moving other aircraft.`, true);
        } else {
            displayMessage(document.getElementById('fleet-message'), `Aircraft ${registration} is not available to move.`, true);
        }
    }

    function viewAircraftDetails(registration) {
        const aircraft = aircrafts.find(ac => ac.registration === registration);
        if (aircraft) {
            alert(`Details for ${aircraft.registration}:\nType: ${aircraft.type}\nLocation: ${aircraft.location}\nStatus: ${aircraft.status}\nTotal Hours: ${aircraft.totalHours.toFixed(1)} hrs\nLast Pilot: ${aircraft.lastPilot}`);
        }
    }


    // ======== PIREP Form Elements (Profile Section) ========
    const pirepAircraftInput = document.getElementById('pirep-aircraft-id');
    const pirepFlightNumberInput = document.getElementById('pirep-flight-number');    
    const pirepOriginInput = document.getElementById('pirep-origin');
    const pirepDestinationInput = document.getElementById('pirep-destination');
    const pirepFlightTimeInput = document.getElementById('pirep-flight-time');      
    const filePirepBtn = document.getElementById('file-pirep-btn');    
    const pirepMessage = document.getElementById('pirep-message'); // This message is for the PIREP form in Profile

    const toggleFilePirepBtn = document.getElementById('toggle-file-pirep-btn');
    const filePirepFormContainer = document.getElementById('file-pirep-form-container');

    const pirepHistoryFilterAircraft = document.getElementById('pirep-history-filter-aircraft');
    const pirepHistoryFilterOrigin = document.getElementById('pirep-history-filter-origin');
    const pirepHistoryFilterDestination = document.getElementById('pirep-history-filter-destination');

    toggleFilePirepBtn.addEventListener('click', () => {
        filePirepFormContainer.classList.toggle('hidden');
        toggleFilePirepBtn.textContent = filePirepFormContainer.classList.contains('hidden')
            ? 'File New PIREP'
            : 'Hide PIREP Form';
        pirepMessage.textContent = ''; // Clear message when toggling
    });

    pirepFlightNumberInput.addEventListener('input', () => {
        const flightNumber = pirepFlightNumberInput.value.trim().toUpperCase();
        const route = routesDatabase[flightNumber];

        if (route) {
            pirepOriginInput.value = route.origin;
            pirepDestinationInput.value = route.destination;
            pirepFlightTimeInput.value = route.defaultTime || ''; 
        } else {
            pirepOriginInput.value = '';
            pirepDestinationInput.value = '';
            pirepFlightTimeInput.value = '';
        }
    });

    filePirepBtn.addEventListener('click', () => {
        const aircraftRegistration = pirepAircraftInput.value.trim().toUpperCase();
        const flightNumber = pirepFlightNumberInput.value.trim().toUpperCase();
        const origin = pirepOriginInput.value.trim().toUpperCase();
        const destination = pirepDestinationInput.value.trim().toUpperCase();
        const flightTimeStr = pirepFlightTimeInput.value.trim();

        if (!aircraftRegistration || !flightNumber || !origin || !destination || !flightTimeStr) { 
            displayMessage(pirepMessage, 'Please fill in all PIREP fields (Aircraft, Flight Number, Origin, Destination, Flight Time).', true);
            return;
        }

        const flightTime = parseFloat(flightTimeStr); 
        if (isNaN(flightTime) || flightTime <= 0) {
            displayMessage(pirepMessage, 'Flight Time must be a valid positive number (e.g., 2.30 for 2h 30m).', true);
            return;
        }

        const aircraft = aircrafts.find(ac => ac.registration === aircraftRegistration);

        if (!aircraft) {
            displayMessage(pirepMessage, `Aircraft with registration "${aircraftRegistration}" not found.`, true);
            return;
        }
        
        if (bookedAircraftRegistration !== aircraftRegistration) {
            displayMessage(pirepMessage, `You must file a PIREP for the aircraft you booked: ${bookedAircraftRegistration}.`, true);
            return;
        }

        if (aircraft.location !== origin) {
            displayMessage(pirepMessage, `Error: Aircraft ${aircraftRegistration} is currently at ${aircraft.location}, but your PIREP origin is ${origin}. Please adjust the origin or move the aircraft.`, true);
            return; 
        }

        const aircraftType = aircrafts.find(ac => ac.registration === aircraftRegistration)?.type || 'Unknown';
        addPirepToHistory(aircraft.registration, aircraftType, flightNumber, origin, destination, flightTime, currentPilotName);

        // Update local aircraft data (status, location, totalHours)
        const hours = Math.floor(flightTime);
        const minutes = (flightTime - hours) * 60; // Convert decimal part to minutes
        const totalFlightHours = hours + (minutes / 60); // Total hours for adding

        aircraft.location = destination;
        aircraft.status = 'Available';
        aircraft.lastPilot = currentPilotName; 
        aircraft.totalHours += totalFlightHours;

        displayMessage(pirepMessage, `PIREP filed successfully! ${aircraft.registration} is now at ${destination}.`, false);

        pirepAircraftInput.value = '';
        pirepFlightNumberInput.value = ''; 
        pirepOriginInput.value = '';
        pirepDestinationInput.value = '';
        pirepFlightTimeInput.value = '';    

        bookedAircraftRegistration = null; // Release the aircraft after filing PIREP
        
        setTimeout(() => {
            filePirepFormContainer.classList.add('hidden');
            toggleFilePirepBtn.textContent = 'File New PIREP';
            pirepMessage.textContent = ''; 
        }, 3000); 

        // Update all relevant sections
        renderAircrafts(airportFilter.value); // Update fleet view
        updateProfileDashboard(); // Update profile stats
        updateActiveBookingDisplay(); // Update booked aircraft display
        populatePirepHistoryFilters(); // Update PIREP history filters
        renderPirepHistory(document.getElementById('pirep-history-list')); // Update PIREP history list

        // Update charts after filing a PIREP
        renderAircraftTypeChart();
        renderOriginAirportChart();
        renderDestinationAirportChart();
    });

    // ======== PIREP History (centralized from your old script) ========
    const pirepHistoryList = document.getElementById('pirep-history-list');
    // `pireps` array is defined globally at the top of this script

    function addPirepToHistory(registration, aircraftType, flightNumber, origin, destination, flightTime, pilotName) {
        const newPirep = {
            registration: registration,
            aircraftType: aircraftType, 
            flightNumber: flightNumber,
            origin: origin,
            destination: destination,
            flightTime: flightTime,
            pilot: pilotName,
            date: new Date().toLocaleString()
        };
        pireps.push(newPirep);
    }

    function populatePirepHistoryFilters() {
        const aircraftsSet = new Set();
        const originsSet = new Set();
        const destinationsSet = new Set();

        pireps.forEach(pirep => {
            aircraftsSet.add(pirep.registration);
            originsSet.add(pirep.origin);
            destinationsSet.add(pirep.destination);
        });

        pirepHistoryFilterAircraft.innerHTML = '<option value="">All Aircraft</option>';
        Array.from(aircraftsSet).sort().forEach(reg => {
            const option = document.createElement('option');
            option.value = reg;
            option.textContent = reg;
            pirepHistoryFilterAircraft.appendChild(option);
        });

        pirepHistoryFilterOrigin.innerHTML = '<option value="">All Origins</option>';
        Array.from(originsSet).sort().forEach(origin => {
            const option = document.createElement('option');
            option.value = origin;
            option.textContent = origin;
            pirepHistoryFilterOrigin.appendChild(option);
        });

        pirepHistoryFilterDestination.innerHTML = '<option value="">All Destinations</option>';
        Array.from(destinationsSet).sort().forEach(dest => {
            const option = document.createElement('option');
            option.value = dest;
            option.textContent = dest;
            pirepHistoryFilterDestination.appendChild(option);
        });
    }

    function renderPirepHistory(containerElement) {
        containerElement.innerHTML = '';

        let filteredPireps = pireps;

        const filterAircraft = pirepHistoryFilterAircraft.value;
        const filterOrigin = pirepHistoryFilterOrigin.value;
        const filterDestination = pirepHistoryFilterDestination.value;

        if (filterAircraft) {
            filteredPireps = filteredPireps.filter(pirep => pirep.registration === filterAircraft);
        }
        if (filterOrigin) {
            filteredPireps = filteredPireps.filter(pirep => pirep.origin === filterOrigin);
        }
        if (filterDestination) {
            filteredPireps = filteredPireps.filter(pirep => pirep.destination === filterDestination);
        }

        if (filteredPireps.length === 0) {
            containerElement.innerHTML = '<p>No PIREPs found matching your criteria.</p>';
            return;
        }

        const ul = document.createElement('ul');
        filteredPireps.sort((a, b) => new Date(b.date) - new Date(a.date));

        filteredPireps.forEach(pirep => {
            const li = document.createElement('li');
            const displayFlightTime = parseFloat(pirep.flightTime).toFixed(2);
            li.innerHTML = `
                <strong>${pirep.flightNumber}</strong>: ${pirep.registration} (${pirep.aircraftType}) from ${pirep.origin} to ${pirep.destination} <br>
                (Pilot: ${pirep.pilot}, Flight Time: ${displayFlightTime} hrs, Date: ${pirep.date})
            `;
            ul.appendChild(li);
        });
        containerElement.appendChild(ul);
    }
    
    pirepHistoryFilterAircraft.addEventListener('change', () => renderPirepHistory(pirepHistoryList));
    pirepHistoryFilterOrigin.addEventListener('change', () => renderPirepHistory(pirepHistoryList));
    pirepHistoryFilterDestination.addEventListener('change', () => renderPirepHistory(pirepHistoryList));


    // ======== Pilot Statistics Dashboard (Profile Section) ========
    const statTotalPireps = document.getElementById('stat-total-pireps');
    const statTotalFlightHours = document.getElementById('stat-total-flight-hours');
    const statFavoriteAircraft = document.getElementById('stat-favorite-aircraft');
    const statMostFlownOrigin = document.getElementById('stat-most-flown-origin');

    function updateProfileDashboard() {
        statTotalPireps.textContent = pireps.length;

        let totalHours = 0;
        const aircraftHours = {}; 
        const originCounts = {}; 

        pireps.forEach(pirep => {
            totalHours += parseFloat(pirep.flightTime); 

            aircraftHours[pirep.registration] = (aircraftHours[pirep.registration] || 0) + parseFloat(pirep.flightTime);

            originCounts[pirep.origin] = (originCounts[pirep.origin] || 0) + 1;
        });

        statTotalFlightHours.textContent = totalHours.toFixed(1);

        let favAircraft = 'N/A';
        let maxHours = 0;
        for (const reg in aircraftHours) {
            if (aircraftHours[reg] > maxHours) {
                maxHours = aircraftHours[reg];
                favAircraft = reg;
            }
        }
        statFavoriteAircraft.textContent = favAircraft;

        let mostFlownOrigin = 'N/A';
        let maxFlights = 0;
        for (const origin in originCounts) {
            if (originCounts[origin] > maxFlights) {
                maxFlights = originCounts[origin];
                mostFlownOrigin = origin;
            }
        }
        statMostFlownOrigin.textContent = mostFlownOrigin;
    }

    // ======== Active Flight / Booked Aircraft Display ========
    const activeBookingDetails = document.getElementById('active-booking-details');

    function updateActiveBookingDisplay() {
        if (bookedAircraftRegistration) {
            const aircraft = aircrafts.find(ac => ac.registration === bookedAircraftRegistration);
            if (aircraft) {
                activeBookingDetails.innerHTML = `
                    <p>You have **${aircraft.registration}** (${aircraft.type}) currently booked.</p>
                    <p><strong>Current Location:</strong> ${aircraft.location}</p>
                    <p>Please proceed to the PIREP form below or release the aircraft if you are not flying.</p>
                `;
            }
        } else {
            activeBookingDetails.innerHTML = `<p>No aircraft currently booked.</p>`;
        }
    }


    // ======== Functions for Charts (Chart.js) ========

    function generateRandomColor() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.7)`;
    }

    function renderAircraftTypeChart() {
        const aircraftTypeCounts = {};
        pireps.forEach(pirep => {
            aircraftTypeCounts[pirep.aircraftType] = (aircraftTypeCounts[pirep.aircraftType] || 0) + 1;
        });

        const labels = Object.keys(aircraftTypeCounts);
        const data = Object.values(aircraftTypeCounts);
        const backgroundColors = labels.map(() => generateRandomColor());

        const ctx = document.getElementById('aircraftTypeChart').getContext('2d');
        if (aircraftTypeChartInstance) {
            aircraftTypeChartInstance.destroy(); 
        }
        aircraftTypeChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Flights',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Flights by Aircraft Type'
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Flights'
                        },
                        ticks: {
                            stepSize: 1 
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Aircraft Type'
                        }
                    }
                }
            }
        });
    }

    function renderOriginAirportChart() {
        const originCounts = {};
        pireps.forEach(pirep => {
            originCounts[pirep.origin] = (originCounts[pirep.origin] || 0) + 1;
        });

        const labels = Object.keys(originCounts);
        const data = Object.values(originCounts);
        const backgroundColors = labels.map(() => generateRandomColor());

        const ctx = document.getElementById('originAirportChart').getContext('2d');
        if (originAirportChartInstance) {
            originAirportChartInstance.destroy(); 
        }
        originAirportChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Departures',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Flights by Origin Airport'
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Flights'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Origin Airport'
                        }
                    }
                }
            }
        });
    }

    function renderDestinationAirportChart() {
        const destinationCounts = {};
        pireps.forEach(pirep => {
            destinationCounts[pirep.destination] = (destinationCounts[pirep.destination] || 0) + 1;
        });

        const labels = Object.keys(destinationCounts);
        const data = Object.values(destinationCounts);
        const backgroundColors = labels.map(() => generateRandomColor());

        const ctx = document.getElementById('destinationAirportChart').getContext('2d');
        if (destinationAirportChartInstance) {
            destinationAirportChartInstance.destroy(); 
        }
        destinationAirportChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Arrivals',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Flights by Destination Airport'
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Flights'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Destination Airport'
                        }
                    }
                }
            }
        });
    }

    // --- Initial setup on page load ---
    updateUI(); // Check login status and update UI
});