import { ProfileData } from '../types.js';

export const initialProfileData: ProfileData = {
  email: "asmithatm.mbrdi@gmail.com",
  name: "Asmitha T M",
  pronunciation: "As-mee-tha T M",
  subtitle: "First, you know my name. Then, you know my world. Then, you know my heart. Then, you know my dreams.",
  deskItems: [
    { id: "desk-1", emoji: "📚", label: "Reading:", content: "whatever sparks curiosity." },
    { id: "desk-2", emoji: "🎼", label: "Listening To:", content: "Sitar, hindustani classical music, Bollywood music and playlists that match the weather." },
    { id: "desk-3", emoji: "💻", label: "Building:", content: "Software products, side projects, and occasionally ambitious plans." },
    { id: "desk-4", emoji: "🎨", label: "Creating:", content: "Sketches, paintings, and unfinished creative experiments." },
    { id: "desk-5", emoji: "🏸", label: "Doing:", content: "Trying to balance fitness, badminton, hobbies, and adult responsibilities." },
    { id: "desk-6", emoji: "💭", label: "Wondering:", content: "Far too many things." }
  ],

  layer1: {
    title: "The World Sees",
    description: "The world usually begins with facts. Here is the outline of my professional journey, upbringing roots, and daily stats.",
    caption: "Layer 1: Outward Identities",
    stats: [
      { id: "stat-1", icon: "Calendar", label: "Age", value: "26, Born March 2000" },
      { id: "stat-2", icon: "MapPin", label: "Location", value: "Residing in Bengaluru" },
      { id: "stat-3", icon: "Briefcase", label: "Profession", value: "Software Developer" },
      { id: "stat-4", icon: "GraduationCap", label: "Education", value: "B.E in Computer Science" },
      { id: "stat-5", icon: "Sparkles", label: "Community", value: "Smartha Brahmin },
      { id: "stat-6", icon: "Leaf", label: "Lifestyle", value: "Vegetarian & Teetotaler" },
      { id: "stat-7", icon: "Ruler", label: "Height", value: "4'10\" (147 cm)" },
      { id: "stat-8", icon: "Heart", label: "Weight", value: "45 kgs" }
    ],
    education: "B.Tech in Computer Science from a top-tier institution in Karnataka, with a deep appreciation for logical problem-solving and systems design.",
    career: "Working as a Senior Frontend/Full Stack Engineer, crafting intuitive human experiences at a modern technology firm. Balancing analytical rigor with creative expression.",
    height: "5'4\"",
    maternalStatus: "Never Married",
    portraitImages: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800", // Saree Portrait
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", // Office Style Portrait
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"  // Tech Workspace
    ]
  },

  layer2: {
    title: "Places I've Called Home",
    subtitle: "A few cities, a few chapters, and one continuing journey.",
    caption: "Layer 2: Places I've Called Home",
    familyTitle: "Family & Foundations",
    familyBadge: "Layer 2",
    description: "No story is built alone. Behind every chapter are the people, traditions, and values that helped shape it. Here is a small glimpse into the family and roots I come from.",
    valuesList: [],
    familyPhotos: [],
    familyNoteTitle: "Family",
    familyNoteItems: [
      "Nuclear Family",
      "Moderate Values",
      "Only Child"
    ],
    rootsNoteTitle: "Roots",
    rootsNoteItems: [
      "Kannada Speaking",
      "Smartha Brahmin",
      "Hoysala Karnataka"
    ],
    parentsNoteTitle: "Parents",
    parentsNoteItems: [
      "Father: Tax Consultant",
      "Mother: Accounts Manager in Software Company"
    ],
    lifestyleNoteTitle: "Lifestyle",
    lifestyleNoteItems: [
      "Vegetarian",
      "Family-Oriented",
      "Modern Yet Rooted In Traditions"
    ],
    homeBaseNoteTitle: "Home Base",
    homeBaseNoteItems: [
      "Mysuru Roots",
      "Dharwad Years",
      "Bangalore Chapter"
    ],
    familyCursiveQuote: "I enjoy discovering new places, cafés, planning a trip, discovering new experiences, or spending a quiet evening at home with family, music, and good conversation.",
    chapters: [
      {
        id: "dharwad-beginning",
        city: "Dharwad",
        timeline: "The Beginning",
        emoji: "🌱",
        shortDesc: "The story begins here.",
        longDesc: "Born in Dharwad, where the first page of my journey was quietly written.",
        bulletDesc: ["Opening my eyes to the world", "Warmth of Ajja Ajji"]
      },
      {
        id: "mysuru-childhood",
        city: "Mysuru",
        timeline: "Early Childhood Years",
        emoji: "🌸",
        shortDesc: "The city of my childhood years.",
        longDesc: "School days at DAV Public School. Filled with growing school-day curiosity, exploring the heritage lanes, and nurturing many of my earliest beautiful memories.",
        bulletDesc: ["DAV Public School", "Bachpana", "Childlike Innocence"]
      },
      {
        id: "dharwad-higher",
        city: "Dharwad",
        timeline: "Higher Studies",
        emoji: "📚",
        shortDesc: "Returned for higher studies.",
        longDesc: "Academics that slowly shaped my career path. Pursued learning with deep focus at JSS Shri Manjunatheshwara Central School, Hanchinamani PUC College, and SDM College Of Engineering.",
        bulletDesc: ["JSS Central School", "Hanchinamani PUC College", "SDM College of Engineering"]
      },
      {
        id: "bangalore-tech",
        city: "Bangalore",
        timeline: "The Current Chapter",
        emoji: "💻",
        shortDesc: "The current chapter.",
        longDesc: "Working at Mercedes Benz Research & Development India. A phase characterized by professional work, independent growth, and everything still beautiful and unfolding.",
        bulletDesc: ["Mercedes Benz R&D India", "Independence & Career", "Safe Aesthetic Rented Space"]
      }
    ]
  },

  layer3: {
    title: "My Interests",
    subtitle: "Creativity & Moving with Intent",
    caption: "Layer 3: Little Things",
    creativeProjects: [
      {
        id: "cr-1",
        title: "Sitar & Silence",
        description: "Learning classical Indian Sitar has taught me that the spaces between notes — the silence — are as critical as the strums themselves.",
        imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800"
      },{
        id: "cr-2",
        title: "Bharatanatyam",
        description: "A disciplined container of storytelling, rhythm, and devotion. Moving my body to complex rhythms brings a deep emotional grounding.",
        imageUrl: "https://images.unsplash.com/photo-1599818815152-f584e0cca9b7?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: "cr-3",
        title: "Painting & Sketches",
        description: "An escape to colors. Creating abstract oils and traditional Tanjore art allows my analytical mind to take a back seat.",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: "cr-4",
        title: "Curious Reader",
        description: "Finding solace in classic literature, psychology journals, and spiritual commentaries that challenge my daily perspective.",
        imageUrl: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: "cr-5",
        title: "Weekend Badminton",
        description: "Fast-paced agility and cheerful sweat on Saturday mornings with a close-knit circle of childhood friends.",
        imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800"
      },
      {
        id: "cr-6",
        title: "Trekking",
        description: "Connecting with mountains, exploring new trails, and finding peace in nature's quiet vastness.",
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },

  layer4: {
    title: "The Quiet Things That Shape Me",
    caption: "Layer 4: Quiet Character",
    description: "What stays when titles and temporary noise disappear? These are a few of the quiet anchors I keep returning to, that guide me when life gets complicated.",
    natureWalkImage: "https://images.unsplash.com/photo-1437419764061-2473afe69fc2?auto=format&fit=crop&q=80&w=800",
    cards: [
      {
        "id": "v-1",
        "cluster": 1,
        "title": "Honest Conversations",
        "phrases": [
          "Truth over convenience",
          "Say it clearly",
          "No hidden chapters"
        ],
        "description": "I would rather have an honest conversation than maintain a comfortable illusion. Clarity may feel difficult in the moment, but it builds trust that lasts far longer than pleasing words."
      },
      {
        "id": "v-2",
        "cluster": 2,
        "title": "Accountability Over Perfection",
        "phrases": [
          "Own your mistakes",
          "Learn and repair",
          "Progress over pride"
        ],
        "description": "I don't expect perfection from myself or from others. What matters more is the willingness to acknowledge mistakes, learn from them, apologize sincerely, repair where possible, and keep growing."
      },
      {
        "id": "v-3",
        "cluster": 3,
        "title": "Integrity When Nobody Is Watching",
        "phrases": [
          "Right over easy",
          "Character first",
          "Values in action"
        ],
        "description": "I try to make decisions I can respect when I look back on them later. Doing the right thing is not always the easiest path, but it helps me sleep peacefully at night."
      },
      {
        "id": "v-4",
        "cluster": 4,
        "title": "Understanding Before Judgement",
        "phrases": [
          "Seek the full picture",
          "Empathy first",
          "Relationship over ego"
        ],
        "description": "I feel things deeply and sometimes react quickly. But once emotions settle, I try hard to understand every side of a situation. I'd rather seek understanding and connection than win an argument."
      },
      {
        "id": "v-5",
        "cluster": 5,
        "title": "Show Up And Follow Through",
        "phrases": [
          "Carry your share",
          "Reliability matters",
          "Commitment in action"
        ],
        "description": "To me, responsibility is one of the simplest forms of love. Showing up when needed, keeping promises where possible, and doing my part are some of the ways I try to care for the people around me."
      },
      {
        "id": "v-6",
        "cluster": 6,
        "title": "Partners, Not Roles",
        "phrases": [
          "Shared responsibilities",
          "Build together",
          "Team before titles"
        ],
        "description": "I believe a strong relationship is built through partnership. Whether it is careers, household responsibilities, family commitments, or future plans, both people contribute, support one another, and grow together."
      },
      {
        "id": "v-7",
        "cluster": 7,
        "title": "Never Stop Growing",
        "phrases": [
          "Stay curious",
          "Learn continuously",
          "Evolve with life"
        ],
        "description": "Curiosity shapes much of who I am. I enjoy learning about technology, psychology, spirituality, art, and people. Growth is not a destination for me. It is a lifelong journey."
      }
    ],
    memoTitle: "Off The Record Memo",
    memoText: "I take my values seriously, but not myself. Life is lighter when there is laughter, curiosity, good company, and a little room for silliness.",
    disclaimerTitle: "A Humble Disclaimer",
    disclaimerText1: "Despite all the serious principles mapped in the compass above, I am not walking around giving TED Talks or grading people on their moral coordinates.",
    disclaimerText2: "I laugh loudly, get excited about completely minor details, ask far too many questions, and occasionally become emotionally invested in entirely unnecessary topics of curiosity.",
    disclaimerFooter: "✦ Cozy & human, always in progress"
  },

  layer5: {
    title: "Personality Constellation",
    caption: "Layer 5: Personality Snapshots",
    description: "The facts tell one story. The values tell another. Somewhere in between lives the person I am on ordinary Tuesdays, difficult days, joyful moments, and everything in between.",
    items: [
      {
        id: "uni-1",
        title: "Deep Feelings, Deep Connections",
        imageUrl: "Emotionally Deep",
        reflection: "I experience life intensely and form meaningful connections with the people I care about. Relationships are rarely casual for me. When someone becomes important, I naturally invest my time, attention, and heart into that bond."
      },
      {
        id: "uni-2",
        title: "Thoughtful, Not Surface-Level",
        imageUrl: "Reflective",
        reflection: "I rarely stop at the first answer. Whether it is people, emotions, decisions, or life itself, I am naturally drawn to understanding what lies beneath the surface and why things are the way they are. Curiosity tends to follow me into almost every conversation."
      },
      {
        id: "uni-3",
        title: "Equal Parts Logic And Creativity",
        imageUrl: "Creative",
        reflection: "By profession, I write code and solve problems. Outside work, you'll usually find me painting, reading, playing the sitar, dancing Bharatanatyam, or disappearing into a new idea. I enjoy having one foot in structure and the other in imagination."
      },
      {
        id: "uni-4",
        title: "Curiosity Is My Default Setting",
        imageUrl: "Curious",
        reflection: "Psychology, spirituality, human behaviour, technology, culture, relationships, astronomy, art... I genuinely enjoy learning. A simple question can send me down an unexpected rabbit hole for hours, and somehow I usually emerge with ten more questions than I started with."
      },
      {
        id: "uni-5",
        title: "Warmth, Laughter, And Questionable Humor",
        imageUrl: "Playful",
        reflection: "Despite all the introspection, I am not serious all the time. I enjoy memes, playful banter, random observations, and laughing at things that probably shouldn't be funny. Life feels lighter when there is room for curiosity, kindness, and a healthy amount of nonsense."
      },
      {
        id: "uni-6",
        title: "Authentic & Grounded (Real Over Polished)",
        imageUrl: "Authentic & Real",
        reflection: "I have never been particularly good at pretending. What you see is usually what you get. I appreciate authenticity, honest conversations, and people who are comfortable being themselves. I'd rather be real than impressive."
      },
      {
        id: "uni-7",
        title: "Bollywood at Heart (A Little Bit Filmy)",
        imageUrl: "Bollywood Filmy",
        reflection: "I may be practical about life, but somewhere inside me lives a person who still pauses for beautiful sunsets, gets emotionally invested in movie scenes, and occasionally imagines background music during important life moments."
      },
      {
        id: "uni-8",
        title: "Mindfully Inward & Self-Reflective",
        imageUrl: "Self-Reflective",
        reflection: "I spend a fair amount of time reflecting on my choices, emotions, and experiences. This helps me learn and grow, although it occasionally means I can turn a simple thought into a full-length internal documentary."
      }
    ]
  },

  layer6: {
    title: "The Life I Hope To Build",
    caption: "Layer 6: The Blueprint of a Home",
    description: "Not a checklist or a perfect picture. Just a few glimpses of the kind of partnership, home, and life I hope to create over time.",
    dreams: [
      {
        id: "dr-1",
        title: "Foundation",
        description: "Marriage, to me, is not a single event but a long-term partnership. I hope to build a life with someone who is willing to grow together, navigate challenges together, and create something meaningful that neither of us could build alone.",
        imageUrl: "Building A Life, Not Just A Wedding"
      },
      {
        id: "dr-2",
        title: "Living Room",
        description: "I hope our home becomes a place where both people feel understood, respected, and accepted. Not a place without disagreements, but a place where difficult conversations can happen without fear and where repair matters more than being right.",
        imageUrl: "A Home That Feels Safe"
      },
      {
        id: "dr-3",
        title: "Kitchen",
        description: "I don't dream of doing everything alone, nor do I expect someone else to. I hope for a partnership where responsibilities, decisions, and everyday life are approached as a team effort.",
        imageUrl: "Shared Responsibilities"
      },
      {
        id: "dr-4",
        title: "Dining Space",
        description: "Some of my favourite moments are surprisingly ordinary. Sharing a meal after a long day, discussing something interesting, laughing over something silly, going for a walk, or simply enjoying each other's company without needing an elaborate plan.",
        imageUrl: "Small Everyday Joys"
      },
      {
        id: "dr-5",
        title: "Family Courtyard",
        description: "I hope to stay connected to the traditions and relationships that shaped me while creating new memories, rituals, and celebrations that belong uniquely to our own family.",
        imageUrl: "Family, Traditions, And New Memories"
      },
      {
        id: "dr-6",
        title: "Study",
        description: "I hope we continue encouraging each other's ambitions, interests, and personal growth. A relationship should provide stability, but it should also create space for both people to keep evolving.",
        imageUrl: "Growing Side By Side"
      },
      {
        id: "dr-7",
        title: "Balcony",
        description: "Life can be serious enough on its own. I hope for a relationship that makes room for affection, humour, inside jokes, playful moments, and the kind of companionship that makes ordinary days feel a little brighter.",
        imageUrl: "Room For Love And Laughter"
      },
      {
        id: "dr-8",
        title: "Prayer Corner",
        description: "I hope we build a life grounded not only in achievement, but also in gratitude, reflection, and a sense of purpose larger than ourselves.",
        imageUrl: "A Sense Of Meaning"
      }
    ]
  },

  layer7: {
    title: "The Kind of Companion I Hope to Meet",
    subheading: "I am not looking for perfection. I simply hope to meet someone sincere and grounded, with whom we can build a meaningful life.",
    caption: "Layer 7: The Bridge",
    reflection: "As I peeled my own layers and understood myself better, I discovered the kind of person with whom I may build a meaningful life. Here are the pillars that guide my search:",
    bridgeTitle: "The Bridge",
    bridgeText: "As I learned more about myself, I also began to understand the kind of person with whom I may build a meaningful life. I am not looking for perfection. These lanterns simply reflect a few qualities that, in my experience, help two people build something meaningful together.",
    pinnedNoteTitle: "📌 Pinned near the end of the bridge",
    pinnedNoteText: "If you've noticed, none of these qualities mention income brackets, luxury lifestyles, status symbols, or perfection. I simply believe that when two people share similar values, communicate with kindness, and are willing to grow together, many beautiful things can be built over time.",
    smallNoteTitle: "A Small Note",
    smallNoteText: "While I have shared the qualities I value, I believe relationships work best when both people bring those qualities to the table. Growth, kindness, respect, responsibility, and effort are things I try to practice myself as well.",
    invitationTitle: "An Invitation To Connect Minds",
    invitationText: "Eight glowing lanterns line the bridge. Each holds a part of the future path she imagines. Click any lantern above to read her handwritten reflections from her personal diary.",
    whisperText: "A Whisper of Shared Joys",
    smileTitle: "Things That Would Make Me Smile",
    lanterns: [
      {
        id: 1,
        title: "Character",
        labels: ["Honest", "Trustworthy", "Principled"],
        reflection: "Someone whose words and actions generally align. Someone who values honesty, treats people with respect, and tries to do the right thing even when it is inconvenient.",
        color: "border-amber-400",
        bgClass: "bg-amber-50/95",
        shadowClass: "shadow-amber-400/40",
        accentHex: "#f59e0b",
        icon: "🛡️",
        x: 16,
        y: 61,
      },
      {
        id: 2,
        title: "Responsibility",
        labels: ["Dependable", "Proactive", "Stable"],
        reflection: "Someone who takes ownership of his responsibilities, follows through on commitments, and approaches life with maturity rather than avoidance.",
        color: "border-emerald-400",
        bgClass: "bg-emerald-50/95",
        shadowClass: "shadow-emerald-400/40",
        accentHex: "#10b981",
        icon: "💼",
        x: 25,
        y: 50,
      },
      {
        id: 3,
        title: "Emotional Maturity",
        labels: ["Self-aware", "Steady", "Respectful"],
        reflection: "Someone who can regulate emotions reasonably well, communicate openly, and work through disagreements without letting ego take the lead.",
        color: "border-cyan-400",
        bgClass: "bg-cyan-50/95",
        shadowClass: "shadow-cyan-400/40",
        accentHex: "#06b6d4",
        icon: "🌸",
        x: 34,
        y: 42,
      },
      {
        id: 4,
        title: "Partnership",
        labels: ["Teamwork", "Mutual Respect", "Shared Effort"],
        reflection: "Someone who sees marriage as a partnership rather than a set of predefined roles. A person willing to contribute, communicate, and build a life together.",
        color: "border-pink-400",
        bgClass: "bg-pink-50/95",
        shadowClass: "shadow-pink-400/40",
        accentHex: "#ec4899",
        icon: "🤝",
        x: 43,
        y: 37,
      },
      {
        id: 5,
        title: "Kindness",
        labels: ["Empathetic", "Considerate", "Supportive"],
        reflection: "Someone who is naturally compassionate, tries to understand before judging, and offers emotional support during difficult seasons of life.",
        color: "border-purple-400",
        bgClass: "bg-purple-50/95",
        shadowClass: "shadow-purple-400/40",
        accentHex: "#a855f7",
        icon: "💝",
        x: 53,
        y: 37,
      },
      {
        id: 6,
        title: "Growth",
        labels: ["Curious", "Open-minded", "Evolving"],
        reflection: "Someone who remains willing to learn, adapt, and grow throughout life. Not because he is perfect, but because he values becoming better over staying comfortable.",
        color: "border-orange-400",
        bgClass: "bg-orange-50/95",
        shadowClass: "shadow-orange-400/40",
        accentHex: "#f97316",
        icon: "🌱",
        x: 62,
        y: 42,
      },
      {
        id: 7,
        title: "Loyalty & Boundaries",
        labels: ["Trustworthy", "Courageous", "Grounded"],
        reflection: "Someone who protects the relationship, maintains healthy boundaries, and stands by what is right when it matters most.",
        color: "border-rose-400",
        bgClass: "bg-rose-50/95",
        shadowClass: "shadow-rose-400/40",
        accentHex: "#f43f5e",
        icon: "🗝️",
        x: 71,
        y: 50,
      },
      {
        id: 8,
        title: "Lifestyle Compatibility",
        labels: ["Vegetarian", "Non-Smoker", "Similar Values"],
        reflection: "Shared values often make everyday life simpler. A vegetarian, non-smoking lifestyle would naturally align well with my own way of living.",
        color: "border-yellow-400",
        bgClass: "bg-yellow-50/95",
        shadowClass: "shadow-yellow-400/35",
        accentHex: "#facc15",
        icon: "☀",
        x: 80,
        y: 61,
      },
    ],
    smileTags: [
      { text: "Enjoys meaningful conversations", top: "15%", left: "8%", delay: 0.5, rotate: -4 },
      { text: "Has his own passions", top: "82%", left: "7%", delay: 1.8, rotate: 5 },
      { text: "Emotionally expressive", top: "48%", left: "3%", delay: 3.2, rotate: -3 },
      { text: "Appreciates humour", top: "12%", left: "38%", delay: 0, rotate: 6 },
      { text: "Curious about life", top: "80%", left: "42%", delay: 2.5, rotate: -6 },
      { text: "Comfortable with both conversation and silence", top: "24%", left: "74%", delay: 4.1, rotate: 3 },
      { text: "Enjoys creating memories together", top: "86%", left: "76%", delay: 1.2, rotate: -2 },
      { text: "Values family", top: "34%", left: "89%", delay: 2.9, rotate: 7 },
      { text: "Loves learning", top: "4%", left: "68%", delay: 0.8, rotate: -5 },
      { text: "Slightly filmy is welcome 😄", top: "65%", left: "90%", delay: 3.6, rotate: 4 },
    ]
  },

  storiesMeet: {
    title: "Perhaps Our Stories Meet Here",
    subtitle: "THE ROAD AHEAD",
    paragraph1: "Every meaningful connection begins with a simple conversation.",
    paragraph2: "You now know far more than my profession, education, hobbies, or qualifications. You've seen the values I hold, the life I hope to build, and the person behind the profile.",
    paragraph3: "If some part of this story resonated with you, I'd be happy to hear yours too. After all, every meaningful relationship begins with a simple conversation.",
    dearTravelerText: "Dear Traveler,",
    letterBody: "Thank you for lingering in this digital space. Connecting on common ground is rare, and I look forward to hearing from you.",
    connectDirectlyText: "Connect Directly",
    thankYouFooterText: "Thank you for spending time with my story. 🌸",
    deskClosedEnvelopeText: "If you feel our values resonate, I'd love to hear your story too.",
    deskLetterTitle: "Tell Me A Little About Yourself",
    deskSubmitButtonText: "📩 Send Your Letter",
    deskSuccessTitle: "Letter Received 💌",
    deskSuccessText: "Thank you for taking the time to write. If our stories are meant to continue, perhaps this won't be the last page."
  },

  core: {
    glowingQuote: "I am not searching for a flawless person.",
    concludingText: "I am hoping to meet someone sincere, grounded, emotionally steady, and ready to build a beautiful ordinary life. Because ordinary days, lived with the right person, become extraordinary.",
    imageUrl: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=1200"
  }
};
