export const servicesData = {
    'assisted-living': {
        id: 'assisted-living',
        title: 'Assisted Living & Physical Support',
        description: 'Comprehensive support for daily living, mobility, and rehabilitation.',
        icon: '❤️',
        breakdown: [
            'Daily activity assistance',
            'Bathing & hygiene support',
            'Meal preparation & feeding',
            'Medication reminders',
            'Mobility support & walking assistance',
            'Physiotherapy sessions',
            'Fall prevention care',
            '24/7 caretaker support'
        ],
        covered: [
            'Assistance with bathing and grooming',
            'Help with dressing and toileting',
            'Feeding and meal preparation',
            'Light housekeeping related to the senior',
            'Assisted walking and transfer',
            'Prescribed physiotherapy exercises',
            'Post-surgery rehabilitation'
        ],
        notCovered: [
            'Medical procedures (injections, wound care)',
            'Heavy lifting or furniture moving',
            'Deep cleaning of the entire house',
            'Medical diagnosis',
            'High-intensity gym training'
        ],
        requirements: [
            { label: 'Clean Towels', icon: '🧴' },
            { label: 'Change of Clothes', icon: '👕' },
            { label: 'Toiletries', icon: '🪥' },
            { label: 'Doctor Note (Physio)', icon: '📝' }
        ],
        options: [
            { id: 'al-caretaker-day', name: 'Assisted Living Caretaker (Day)', duration: '12 Hours', price: '₹800/day' },
            { id: 'al-caretaker-24', name: 'Assisted Living Caretaker (24x7)', duration: '24 Hours', price: '₹1500/day' },
            { id: 'al-hygiene', name: 'Bathing & Hygiene Visit', duration: '1 Hour', price: '₹300/visit' },
            { id: 'pa-physio', name: 'Physiotherapy Session', duration: '45 Mins', price: '₹600/session' },
            { id: 'pa-mobility', name: 'Mobility Assistance Visit', duration: '1 Hour', price: '₹400/visit' }
        ]
    },
    'medical-care': {
        id: 'medical-care',
        title: 'Medical & Dementia Care',
        description: 'Professional medical attention and specialized memory care at home.',
        icon: '🏥',
        breakdown: [
            'General physician home visits',
            'Specialist consultations',
            'Lab tests at home',
            'Dementia & Alzheimer’s care',
            'Cognitive therapy',
            'Emergency medical assistance',
            'Chronic illness management'
        ],
        covered: [
            'General health checkup and consultation',
            'Prescription and medication advice',
            'Blood pressure and sugar monitoring',
            'Supervision to prevent wandering (Dementia)',
            'Engagement in memory games',
            'Behavioral management'
        ],
        notCovered: [
            'Emergency surgery at home',
            'ICU-level critical care (unless specified)',
            'Providing free medicines',
            'Physical restraint (unless emergency)',
            'Psychiatric medical treatment'
        ],
        requirements: [
            { label: 'Previous Reports', icon: '📄' },
            { label: 'Prescriptions', icon: '💊' },
            { label: 'Quiet Room', icon: '🤫' },
            { label: 'Family History', icon: '📋' }
        ],
        options: [
            { id: 'mc-physician', name: 'General Physician Visit', duration: 'Consultation', price: '₹1000/visit' },
            { id: 'mc-specialist', name: 'Specialist Consultation', duration: 'Consultation', price: '₹2000/visit' },
            { id: 'mc-lab', name: 'Home Lab Sample Collection', duration: 'Visit', price: '₹200/visit' },
            { id: 'dc-caregiver-day', name: 'Dementia Caregiver (Day)', duration: '12 Hours', price: '₹1200/day' },
            { id: 'dc-therapy', name: 'Cognitive Therapy Session', duration: '1 Hour', price: '₹800/session' }
        ]
    },
    'nursing-care': {
        id: 'nursing-care',
        title: 'Nursing Care',
        description: 'Skilled nursing procedures and monitoring for medical needs.',
        icon: '👩‍⚕️',
        breakdown: [
            'Home nurses (hourly / daily)',
            'Post-surgery care',
            'Injections & IV care',
            'Wound dressing',
            'Long-term patient monitoring'
        ],
        covered: [
            'Administering injections and IVs',
            'Wound cleaning and dressing',
            'Catheter care',
            'Vitals monitoring (BP, Sugar, O2)',
            'Post-operative care'
        ],
        notCovered: [
            'Surgery at home',
            'Prescribing new medications',
            'Domestic help / cleaning',
            'Cooking meals'
        ],
        requirements: [
            { label: 'Prescription', icon: '💊' },
            { label: 'Medical Kit', icon: '🧰' },
            { label: 'Clean Bed', icon: '🛏️' }
        ],
        options: [
            { id: 'nc-nurse-visit', name: 'Nurse Visit (Procedure)', duration: '1 Hour', price: '₹500/visit' },
            { id: 'nc-nurse-day', name: 'Nurse (12 Hours)', duration: '12 Hours', price: '₹1500/day' },
            { id: 'nc-injection', name: 'Injection / IV Administration', duration: 'Visit', price: '₹300/visit' }
        ]
    },
    'utility-services': {
        id: 'utility-services',
        title: 'Utility Services',
        description: 'Helping seniors run daily life smoothly without stress or technical confusion.',
        icon: '⚙️',
        breakdown: [
            'Electricity & Power Setup',
            'Water & Plumbing Repairs',
            'Gas Connection & Safety',
            'Internet & Phone Setup',
            'TV & Media Configuration',
            'Home Maintenance Support',
            'Bill & Documentation Help',
            'Safety & Security Setup'
        ],
        covered: [
            'Professional installation and repair',
            'Safety checks and inspections',
            'Assistance with bill payments',
            'Setup of senior-friendly devices',
            'Coordination with service providers'
        ],
        notCovered: [
            'Payment of actual utility bills',
            'Purchase of new appliances (service only)',
            'Major construction work',
            'Illegal connections'
        ],
        requirements: [
            { label: 'Access to Meters', icon: '⚡' },
            { label: 'Documents', icon: '📄' },
            { label: 'Safety Clearance', icon: '✅' }
        ],
        options: [
            { id: 'us-electrician', name: 'Electrician Visit', duration: 'Visit', price: '₹300/visit' },
            { id: 'us-plumber', name: 'Plumber Consultation', duration: 'Visit', price: '₹300/visit' },
            { id: 'us-internet', name: 'Internet/WiFi Setup', duration: 'Installation', price: '₹500/setup' },
            { id: 'us-tv', name: 'TV & Media Setup', duration: 'Installation', price: '₹400/setup' },
            { id: 'us-gas', name: 'Gas Safety Inspection', duration: 'Checkup', price: '₹250/visit' }
        ]
    },
    'entertainment-services': {
        id: 'entertainment-services',
        title: 'Entertainment & Wellness',
        description: 'Focusing on mental wellness, social connection, and emotional happiness.',
        icon: '🎭',
        breakdown: [
            'Music & Audio Activities',
            'Reading & Book Clubs',
            'Creative Arts & Crafts',
            'Mind & Memory Games',
            'Wellness & Yoga',
            'Digital Entertainment Help',
            'Social Events & Outings'
        ],
        covered: [
            'Group activity coordination',
            'Venue arrangements for events',
            'Materials for arts & crafts',
            'Professional instruction (Yoga/Music)',
            'Digital device setup for entertainment'
        ],
        notCovered: [
            'Personal travel expenses',
            'Purchase of musical instruments',
            'Expensive art supplies (basic provided)',
            'Medical treatment during wellness'
        ],
        requirements: [
            { label: 'Comfy Clothes', icon: '👕' },
            { label: 'Enthusiasm', icon: '😊' },
            { label: 'Water Bottle', icon: '💧' }
        ],
        options: [
            { id: 'es-yoga', name: 'Group Yoga Session', duration: '1 Hour', price: '₹200/session' },
            { id: 'es-music', name: 'Music Therapy Session', duration: '1 Hour', price: '₹300/session' },
            { id: 'es-brain', name: 'Brain Exercise Program', duration: '45 Mins', price: '₹250/session' },
            { id: 'es-event', name: 'Festival Event Participation', duration: 'Event', price: '₹500/event' }
        ]
    },
    'spiritual-care': {
        id: 'spiritual-care',
        title: 'Spiritual Care',
        description: 'Nurturing the soul with prayer, meditation, and community.',
        icon: '🙏',
        breakdown: [
            'Prayer & meditation sessions',
            'Religious service coordination',
            'Spiritual counseling',
            'Group satsangs / bhajans',
            'Festival & ritual assistance'
        ],
        covered: [
            'Guided meditation sessions',
            'Reading religious scriptures',
            'Organizing small poojas',
            'Spiritual counseling and listening',
            'Bhajan / Kirtan sessions'
        ],
        notCovered: [
            'Religious conversion activities',
            'Financial or legal advice',
            'Large scale event management',
            'Providing religious items (unless requested)'
        ],
        requirements: [
            { label: 'Quiet Space', icon: '🤫' },
            { label: 'Prayer Items', icon: '🕯️' },
            { label: 'Mat/Cushion', icon: '🧘' }
        ],
        options: [
            { id: 'sc-counseling', name: 'Spiritual Counseling', duration: '1 Hour', price: '₹500/session' },
            { id: 'sc-group', name: 'Group Satsang / Bhajans', duration: '2 Hours', price: 'Free' },
            { id: 'sc-meditation', name: 'Guided Meditation', duration: '45 Mins', price: '₹300/session' }
        ]
    }
};
