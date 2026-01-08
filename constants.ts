import { SinType, WagonCard } from './types';

export const ADMIN_EMAIL = "serkantur@yahoo.com";
export const ADMIN_PASS = "defneturan2008";

export const WAGON_CARDS: WagonCard[] = [
  {
    id: 1,
    title: "The Wagon of Forgotten Suitcases",
    description: "Shelves are filled with thousands of unclaimed leather suitcases. Some are trembling, others emit muffled moans. There are dried tear stains on the floor.",
    question: "Which suitcase looks like it belongs to you, and what great mistake does the object you find inside throw in your face?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_1.jpg/:/"
  },
  {
    id: 2,
    title: "The Corridor of Broken Mirrors",
    description: "A wagon covered from floor to ceiling with cracked mirrors instead of walls. Your reflection moves, but not synchronously with you; it follows you with a momentary delay and a mocking expression.",
    question: "What ugly truth about you that others do not know does your reflection in the mirror whisper?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_2.jpg/:/"
  },
  {
    id: 3,
    title: "The Eternal Banquet Hall",
    description: "Tables are full of rotten pheasants, moldy fruits, and congealed wines. A heavy perfume smell tries to suppress the smell of rotting meat but fails.",
    question: "Which food on the table reminds you of your past insatiability or greed, and why are you forced to take a bite of it?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_3.jpg/:/"
  },
  {
    id: 4,
    title: "The Weeping Botanical Garden",
    description: "The interior is humid and warm. The leaves of the plants have the texture of human skin. Water dripping from the ceiling spells out someone's name as it falls onto the grates on the floor.",
    question: "What is that object hidden among the vines, and when and to hide from whom did you bury it there?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_4.jpg/:/"
  },
  {
    id: 5,
    title: "The Medical Intervention Room",
    description: "Rusty surgical instruments clatter on a metal tray. Under the sheet on the stretcher, something not in human form is stirring. There is a smell of iodine and fear in the air.",
    question: "Your name is in the registry book next to the stretcher; which 'spiritual disease' is written in the diagnosis section?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_5.jpg/:/"
  },
  {
    id: 6,
    title: "The Puppet Theatre",
    description: "Velvet curtains are closed. The sound of strings stretching and wooden feet clicking comes from behind the stage. Porcelain dolls with gouged-out eyes are sitting in the audience seats.",
    question: "When the curtain opens, which shameful memory from your life does the play being performed on stage re-enact?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_6.jpg/:/"
  },
  {
    id: 7,
    title: "The Dusty Library",
    description: "None of the books are made of paper; their pages are dried leaves, their covers are bone. Every sentence written here consists of lies never spoken.",
    question: "When you pull a book at random, to whom was the old letter you found between the pages written, and why was it never sent?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_7.jpg/:/"
  },
  {
    id: 8,
    title: "The Clockmaker's Shop",
    description: "Thousands of clocks tick-tock simultaneously, but at different rhythms. Time does not flow here, it accumulates. Some clocks have the faces of your loved ones on their dials instead of numbers.",
    question: "One of the clocks starts running backwards; to which regret-filled minute of your life does it take you back?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_8.jpg/:/"
  },
  {
    id: 9,
    title: "The Underwater Aquarium Wagon",
    description: "Behind the glass is not the ocean, but a dark void. Giant, phosphorescent creatures swimming outside look at you hungrily. The inside is cold and oppressive.",
    question: "Who does that silhouette you see in the darkness behind the glass resemble, whom you allowed to 'drown' or did not help in the past?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_9.jpg/:/"
  },
  {
    id: 10,
    title: "The Confession Booths",
    description: "A corridor separated by narrow, wooden compartments. A telephone handset hangs inside each booth. At the other end of the handset is only the sound of your own breathing.",
    question: "Which past betrayal of yours does the voice you hear when you lift the handset command you to confess?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_10.jpg/:/"
  },
  {
    id: 11,
    title: "The Burnt Photo Gallery",
    description: "Walls are hung with thousands of passport photos, faces burned out by cigarettes. Frames are soot-stained. Walking makes broken glass crunch underfoot.",
    question: "When you place your own photo in the empty frame, why does the face in the picture slowly turn into a demonic expression?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_11.jpg/:/"
  },
  {
    id: 12,
    title: "The Abandoned Nursery",
    description: "A rocking horse creaks. Broken toy soldiers and dusty teddy bears cover the floor. Sobs come from the cradle, but it is empty.",
    question: "Which toy on the floor symbolizes the day you lost your innocence?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_12.jpg/:/"
  },
  {
    id: 13,
    title: "The Butcher's Car",
    description: "Hanging from hooks are not meats, but human clothes. Some pockets are still full. The floors are sticky and red.",
    question: "That familiar coat hanging on the hook belonged to whom, and what was your role in their 'disappearance'?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_13.jpg/:/"
  },
  {
    id: 14,
    title: "The Whispering Sleeper Car",
    description: "Curtains on the bunks are tightly drawn. Instead of the sounds of breathing, whispers of praying or begging people come from within.",
    question: "Which whisper coming from behind a curtain repeats your biggest secret?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_14.jpg/:/"
  },
  {
    id: 15,
    title: "The Caged Zoo",
    description: "Cages do not hold animals, but the embodied, monstrous forms of human emotions like 'anger', 'pride', and 'envy'.",
    question: "Which cage door was left open, and where in the carriage is that 'monster' that escaped from within you hiding now?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_15.jpg/:/"
  },
  {
    id: 16,
    title: "The Courtroom",
    description: "The judge's bench is very high, touching the ceiling. Faceless mannequins sit in the jury seats. The carriage shakes when the gavel sounds.",
    question: "When you sit in the defendant's chair, which 'immoral' but 'legal' crime of yours does the prosecutor read to your face?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_16.jpg/:/"
  },
  {
    id: 17,
    title: "The Labyrinth Warehouse",
    description: "Wooden boxes stacked high, reaching the ceiling. Corridors are constantly shifting. Boxes are stamped 'Returned'.",
    question: "When you lose your way, what is inside the box you find, and what did you sacrifice in life to possess it, only for it to be worthless now?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_17.jpg/:/"
  },
  {
    id: 18,
    title: "The Frozen Lake Car",
    description: "The carriage floor is a completely frozen lake. Frozen people look up from beneath the ice. The sound of cracking ice underfoot turns into cries of 'help me'.",
    question: "Which face beneath the ice looks familiar to you, and what cold behavior of yours pushed them there?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_18.jpg/:/"
  },
  {
    id: 19,
    title: "The Mummified Museum",
    description: "Glass vitrines display dried hands, eyes preserved in jars. Each piece has a label and a date underneath.",
    question: "Which vitrine's glass do you want to break to take 'that piece' inside, and which deficiency of yours will this piece complete?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_19.jpg/:/"
  },
  {
    id: 20,
    title: "The Reverse Gravity Room",
    description: "Furniture is nailed to the ceiling. To walk, you must stand on your head. Chandeliers rise from the floor upwards. Your stomach turns.",
    question: "When the world turns upside down, what is that small object that falls from your pocket and hits the ceiling (floor), revealing what?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_20.jpg/:/"
  },
  {
    id: 21,
    title: "The Ash and Smoke Hall",
    description: "Everything is covered in grey ash. The shapes of furniture are indistinct. Light beams entering from the windows illuminate dust motes. The ground crumbles where you step.",
    question: "What is that unburned object you pull from the ashes, and of which 'destructive anger' of yours is it the sole witness?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_21.jpg/:/"
  },
  {
    id: 22,
    title: "The Masked Ball",
    description: "Lifeless mannequins, dressed in elegant attire and Venetian masks, are frozen in dance poses. There is no music, but the rhythmic sound of feet shuffling can be heard.",
    question: "When you remove the mask from one of the mannequins, you encounter your own face. Which of your 'fake' personalities does this represent?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_22.jpg/:/"
  },
  {
    id: 23,
    title: "The Sewing Workshop",
    description: "Spools, needles, and red threads are everywhere. A sewing machine runs by itself, stitching skin instead of fabric.",
    question: "The unfinished stitching on the table symbolizes which relationship you tried to 'patch up' in life but failed?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_23.jpg/:/"
  },
  {
    id: 24,
    title: "The Wax Statue Car",
    description: "The carriage is filled with melting wax statues of people, known or unknown. As the heat increases, faces deform.",
    question: "Which melting statue represents the 'envy' you felt towards someone, and why does watching it melt away give you pleasure?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_24.jpg/:/"
  },
  {
    id: 25,
    title: "The Chained Dungeon",
    description: "Rusty chains and shackles hang from the walls. The floor is cold stone. In a corner, a skeleton, having been there for years, holds a key.",
    question: "Is that key your freedom, or the key to the lock where you imprisoned someone else?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_25.jpg/:/"
  },
  {
    id: 26,
    title: "The Misty Swamp",
    description: "The carriage interior is covered in knee-deep murky water and reeds. Things moving within the water brush against your legs. There is a heavy smell of rotten eggs.",
    question: "That rusty object you pull from the bottom of the water, what past crime you 'covered up' does it bring to light?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_26.jpg/:/"
  },
  {
    id: 27,
    title: "The Tailor and the Puppeteer",
    description: "On one side a workbench where stylish suits are sewn, on the other human-sized puppet strings. The tailor measures not your height, but the value of your soul with his tape measure.",
    question: "Why did the tailor sew the 'pockets' shut on the outfit he made for you? What is he depriving you of that you need to hide?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_27.jpg/:/"
  },
  {
    id: 28,
    title: "The Casino",
    description: "The roulette table spins, but instead of a ball, there is a human eye. Cards are dealt, but dates of death are written on them instead of numbers.",
    question: "The thing you put down as a 'bet' was your most valuable virtue in life. What did you lose it for?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_28.jpg/:/"
  },
  {
    id: 29,
    title: "The Alchemist's Lab",
    description: "Bubbling alembics, smoky tubes. On a table, a recipe not for 'Gold Making', but for a 'Conscience Cleaning' elixir. Ingredients are missing.",
    question: "The missing ingredient requires a part of your body. Which part would you sacrifice, and for which sin would this be the atonement?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_29.jpg/:/"
  },
  {
    id: 30,
    title: "The Lost Letters Office",
    description: "Shelves reach the ceiling, full of letters stamped 'Undeliverable'. There is no clerk opening letters, a paper shredder runs constantly.",
    question: "You snatch that letter just before it hits the shredder. Whose cry for 'help' from you is written inside?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_30.jpg/:/"
  },
  {
    id: 31,
    title: "The Observatory Car",
    description: "The carriage has no roof, looking directly into a cosmic, purple sky. The stars do not twinkle, they watch you. A telescope points down, showing the world.",
    question: "When you look through the telescope, who is that person 'celebrating' in the world in your absence, and what emotion does this evoke in you?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_31.jpg/:/"
  },
  {
    id: 32,
    title: "The Morgue Drawers",
    description: "Cold metal walls are covered floor to ceiling with drawers. Some drawers are being pounded from the inside. Labels have sins written on them instead of names.",
    question: "When you open the drawer labeled with your own sin, what do you find inside instead of a corpse?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_32.jpg/:/"
  },
  {
    id: 33,
    title: "The Antique Shop",
    description: "Every object seems cursed. A vase shows the aging of whoever looks at it. A necklace chokes the wearer.",
    question: "Which object here do you feel an unbearable desire to 'steal', and what deficiency of yours will this theft cover?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_33.jpg/:/"
  },
  {
    id: 34,
    title: "The Broken Toy Hospital",
    description: "A grotesque workshop where limb transplants are performed on dolls. Dolls with bear legs, spider dolls with baby heads... They all look at you as if saying \"you broke us\".",
    question: "Which toy reminds you of a moment of \"cruelty\" from your childhood?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_34.jpg/:/"
  },
  {
    id: 35,
    title: "The Silent Choir",
    description: "Choir members with sewn-shut mouths are lined up in rows. They cannot make a sound, but bloody tears flow from their eyes. There are blank papers on the music stand.",
    question: "If you undid those stitches, which 'gossip' about you would the choir shout to the whole world?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_35.jpg/:/"
  },
  {
    id: 36,
    title: "The Archive Room",
    description: "Endless file cabinets. Every second of a person's life is recorded in each file. A clerk is crossing out some lines with a red pen.",
    question: "What was written in that section of your file that was crossed out and 'censored' with a red pen?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_36.jpg/:/"
  },
  {
    id: 37,
    title: "The Quarantine Zone",
    description: "An area separated by yellow plastic curtains marked 'Do Not Enter'. The patient inside carries a spiritual, not physical, plague.",
    question: "When you part the curtain, the patient you see is yourself, but from the past. Why are you disgusted by approaching them?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_37.jpg/:/"
  },
  {
    id: 38,
    title: "The Giant's Table",
    description: "The furniture is so large you have to climb onto the chair. The food on the plate is human-sized. You feel like an ant.",
    question: "Does this immense scale symbolize how great your 'pride' is, or how small your 'self-confidence' actually is?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_38.jpg/:/"
  },
  {
    id: 39,
    title: "The Execution Corridor",
    description: "Electric chair, guillotine, and gallows stand side by side. Each one is newly cleaned. A sign on the wall reads \"Choose Your Punishment\".",
    question: "Which execution device is most fitting for the punishment you deserve for your sin, and why?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_39.jpg/:/"
  },
  {
    id: 40,
    title: "The Final Stop: The Locomotive",
    description: "This place runs not on coal, but on memories. The stoker shovels photographs and letters into the furnace. The pressure gauge reads 'About to Explode'.",
    question: "What is that 'most precious but most painful' memory you are forced to watch being thrown into the furnace to burn?",
    imageUrl: "https://img1.wsimg.com/isteam/ip/737abd0e-0f9b-4bc1-b87a-d9bc32cd8f98/card_40.jpg/:/"
  }
];

// Replaced emojis with Hellish Text representations
export const SIN_ICONS: Record<SinType, string> = {
  [SinType.PRIDE]: "PRIDE",
  [SinType.GREED]: "GREED",
  [SinType.LUST]: "LUST",
  [SinType.ENVY]: "ENVY",
  [SinType.GLUTTONY]: "GLUTTONY",
  [SinType.WRATH]: "WRATH",
  [SinType.SLOTH]: "SLOTH"
};

// CSS text colors and glows for each sin to look "hellish"
export const SIN_STYLES: Record<SinType, string> = {
  [SinType.PRIDE]: "text-purple-500 drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]",
  [SinType.GREED]: "text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.8)]",
  [SinType.LUST]: "text-pink-600 drop-shadow-[0_0_5px_rgba(219,39,119,0.8)]",
  [SinType.ENVY]: "text-green-600 drop-shadow-[0_0_5px_rgba(22,163,74,0.8)]",
  [SinType.GLUTTONY]: "text-orange-600 drop-shadow-[0_0_5px_rgba(234,88,12,0.8)]",
  [SinType.WRATH]: "text-red-600 drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]",
  [SinType.SLOTH]: "text-slate-400 drop-shadow-[0_0_5px_rgba(148,163,184,0.8)]"
};

export const SIN_DESCRIPTIONS: Record<SinType, string> = {
  [SinType.PRIDE]: "The pedestal built on hollow bones.",
  [SinType.GREED]: "Gold weighs heavier than blood.",
  [SinType.LUST]: "A fire that consumes the flesh.",
  [SinType.ENVY]: "The poison of another's joy.",
  [SinType.GLUTTONY]: "The hunger that swallows the world.",
  [SinType.WRATH]: "A blinding storm of red ruin.",
  [SinType.SLOTH]: "The slow decay of a wasted will."
};