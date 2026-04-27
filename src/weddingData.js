const A = '/assets/';

export const weddingData = {
    clientId: 'Shubham-Samiksha-wedding-2026',

    assets: {
        entryVideo: `${A}entry-video.mp4`,
        backgroundVideo: `${A}background.mp4`,
        bgMusic: `${A}bg-music.mp3`,
        memoriesVideo: `${A}memories.mp4`,
        ganeshImage:
            'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/Shriya%20%26%20Ashutosh/Vianyak%20png.png',
        venueImage:
            'https://pub-1953a6673e864f3488c645252f75de98.r2.dev/Shubham%20%26%20Samiksha/Venue.webp',
    },

    seo: {
        title: 'Shubham Raj & Samiksha Soni — A Sacred Union',
    },

    hero: {
        mantra: [
            'Auspicious is Lord Vishnu',
            'Auspicious is the lotus-eyed one',
            'Auspicious is the one whose flag bears Garuda',
        ],

        welcomeLine:
            'Mere bade bhaiya ke shubh vivah avsar par aap sabhi ka hardik swagat hai',

        specialNote:
            'You are warmly invited to the wedding celebration of my elder brother.',

        blessing:
            'With deep faith and devotion, and by the blessings of the Almighty, we cordially invite you to grace this auspicious occasion.',

        groom: {
            name: 'Shubham Raj',
            parents: 'Son of Mr. Sanjay Kumar & Mrs. Chandrakala Devi',
            grandparents:
                '(Grandson of Mr. Parasnath Prasad & Mrs. Radhika Devi)',
            residence:
                'Subhash Chandra Path, Jyoti Nagar, Kharagajhar, Telco, Jamshedpur',
        },

        bride: {
            name: 'Samiksha Soni',
            parents: 'Daughter of Mr. Navlesh Chandra Verma & Mrs. Kanchan Verma',
            grandparents:
                '(Granddaughter of Late Mr. Jageshwar Prasad Verma & Late Mrs. Lakhpati Devi)',
            residence: 'Padam Nagar, Milai-3, Chhattisgarh',
        },

        guestNames: [
            'Sanjana Shree',
            'Aman',
            'Samridh',
            'Rishu',
            'Manas',
            'Aniruddh',
            'Muskan',
            'Pihu',
            'Ansh',
            'Harsh',
            'Rounak',
            'Khilesh',
        ],
    },

    countdown: {
        label: 'Wedding Muhurat',
        quote:
            'In Vikram Samvat 2083, Ashadha month Krishna Paksha, Tuesday — the sacred union will be solemnized.',
        displayDate: 'Tuesday · 07 July 2026',
        targetDate: '2026-07-07T19:30:00+05:30',
        completedText: 'Just Married ❤️',
    },

    memories: {
        label: 'Sacred Message',
        headingLine1: 'Two Hearts',
        headingLine2: 'One Journey',
        quote:
            'Marriage is the sacred union where two hearts become one. It is the confluence of two families and the beginning of a new life.',
    },

    venue: {
        label: 'Wedding Venue',
        headingLine1: 'Join Us At',
        headingLine2: 'Son Mandap',
        name: 'Son Mandap',
        addressLines: ['Sidhgora Campus', 'Jamshedpur'],
        mapEmbedUrl: '',
        directionsUrl: '',
    },

    eventsSection: {
        label: 'Ceremony Details',
        headingLine1: 'Wedding',
        headingLine2: 'Celebrations',
    },

    ceremonies: [
        {
            roman: 'I',
            subtitle: 'Matkor, Haldi & Tilak',
            title: '05 July 2026 (Sunday)',
            description: '4:00 PM onwards',
            video: `${A}136.mp4`,
        },
        {
            roman: 'II',
            subtitle: 'Mehendi & Sangeet',
            title: '06 July 2026 (Monday)',
            description: '4:00 PM onwards',
            video: `${A}137.mp4`,
        },
        {
            roman: 'III',
            subtitle: 'Wedding & Reception Dinner',
            title: '07 July 2026 (Tuesday)',
            description: '7:30 PM onwards',
            video: `${A}138.mp4`,
        },
    ],

    barat: {
        title: 'Barat Information',
        details:
            'The Barat will depart from our residence on 07 July 2026 at 5:00 PM towards Son Mandap, Sidhgora.',
    },

    rsvp: {
        apiUrl: 'https://wedding-backend-k67l.onrender.com/api/rsvp',
        label: 'Join the Celebration',
        headingLine1: 'Celebrate',
        headingLine2: 'With Us',
        intro:
            'We humbly request your gracious presence along with your family to bless the couple.',

        contactNumbers: ['9204976811', '9835552456'],

        eventOptions: [
            {
                label: '05 July - Haldi & Tilak',
                date: 'Sunday',
                value: '05 July',
            },
            {
                label: '06 July - Mehendi & Sangeet',
                date: 'Monday',
                value: '06 July',
            },
            {
                label: '07 July - Wedding',
                date: 'Tuesday',
                value: '07 July',
            },
        ],
    },

    footer: {
        coupleName: 'Shubham & Samiksha',

        hostsTitle: 'Hosts',
        hosts: [
            'Mr. Sanjay Kumar',
            'Mr. Santosh Kumar',
            'Mr. Manoj Kumar',
            'Sanjana Shree',
        ],

        blessingsFrom: ['Mr. Parasnath Prasad'],

        invitedBy: ['Jitendra Soni', 'Rajesh Soni', 'Vicky Soni'],

        specialThanks:
            'With love from Sanjana Shree, Aman, Samridh, Rishu, Manas, Aniruddh, Muskan, Pihu, Ansh, Harsh, Rounak, Khilesh',

        endNote: '07 July 2026 · Son Mandap, Sidhgora, Jamshedpur',
    },
};