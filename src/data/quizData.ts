import { Theme } from '@/types';

export const quizThemes: Theme[] = [
  {
    id: 'gaming',
    name: 'Gaming',
    description: 'Questions sur les jeux vidéo, les streamers et l\'industrie du gaming',
    questions: [
      {
        id: 'gaming-1',
        question: 'Quel est le jeu le plus vendu de tous les temps ?',
        options: ['Minecraft', 'Tetris', 'GTA V', 'Wii Sports'],
        correctAnswer: 0,
        explanation: 'Minecraft a dépassé les 300 millions d\'exemplaires vendus.'
      },
      {
        id: 'gaming-2',
        question: 'Quel streamer est connu pour ses "PogChamp" ?',
        options: ['Ninja', 'Pokimane', 'xQc', 'Shroud'],
        correctAnswer: 2,
        explanation: 'xQc est célèbre pour ses réactions expressives.'
      },
      {
        id: 'gaming-3',
        question: 'Quelle année est sorti le premier Call of Duty ?',
        options: ['2001', '2003', '2005', '2007'],
        correctAnswer: 1,
        explanation: 'Call of Duty est sorti en 2003 sur PC.'
      },
      {
        id: 'gaming-4',
        question: 'Quel est le nom du protagoniste principal de The Legend of Zelda ?',
        options: ['Zelda', 'Link', 'Ganon', 'Epona'],
        correctAnswer: 1,
        explanation: 'Link est le héros, Zelda est la princesse.'
      },
      {
        id: 'gaming-5',
        question: 'Quel studio a développé Fortnite ?',
        options: ['Riot Games', 'Epic Games', 'Valve', 'Blizzard'],
        correctAnswer: 1,
        explanation: 'Epic Games est le créateur de Fortnite.'
      },
      {
        id: 'gaming-6',
        question: 'Quel est le jeu le plus regardé sur Twitch en 2023 ?',
        options: ['League of Legends', 'Just Chatting', 'Valorant', 'Minecraft'],
        correctAnswer: 1,
        explanation: 'Just Chatting est la catégorie la plus populaire.'
      },
      {
        id: 'gaming-7',
        question: 'Quel est le nom du créateur de Minecraft ?',
        options: ['Notch', 'Dinnerbone', 'Jeb', 'Herobrine'],
        correctAnswer: 0,
        explanation: 'Markus Persson, alias Notch, a créé Minecraft.'
      },
      {
        id: 'gaming-8',
        question: 'Quel est le premier jeu vidéo commercialisé ?',
        options: ['Pong', 'Space Invaders', 'Pac-Man', 'Donkey Kong'],
        correctAnswer: 0,
        explanation: 'Pong, sorti en 1972, est considéré comme le premier jeu commercial.'
      },
      {
        id: 'gaming-9',
        question: 'Quel est le nom de la console de Nintendo sortie en 2017 ?',
        options: ['Wii U', 'Switch', '3DS', 'GameCube'],
        correctAnswer: 1,
        explanation: 'La Nintendo Switch est sortie en mars 2017.'
      },
      {
        id: 'gaming-10',
        question: 'Quel est le jeu le plus joué au monde ?',
        options: ['Minecraft', 'Roblox', 'Fortnite', 'PUBG'],
        correctAnswer: 1,
        explanation: 'Roblox compte plus de 200 millions d\'utilisateurs actifs.'
      }
    ]
  },
  {
    id: 'anime',
    name: 'Anime & Manga',
    description: 'Questions sur les animes, mangas et la culture japonaise',
    questions: [
      {
        id: 'anime-1',
        question: 'Quel est l\'anime le plus populaire au monde ?',
        options: ['Dragon Ball', 'One Piece', 'Naruto', 'Attack on Titan'],
        correctAnswer: 1,
        explanation: 'One Piece est l\'anime le plus vendu avec plus de 500 millions d\'exemplaires.'
      },
      {
        id: 'anime-2',
        question: 'Quel est le nom du protagoniste de Death Note ?',
        options: ['L', 'Light Yagami', 'Ryuk', 'Misa'],
        correctAnswer: 1,
        explanation: 'Light Yagami est le personnage principal de Death Note.'
      },
      {
        id: 'anime-3',
        question: 'Quel studio a produit Demon Slayer ?',
        options: ['MAPPA', 'ufotable', 'A-1 Pictures', 'Madhouse'],
        correctAnswer: 1,
        explanation: 'ufotable est le studio responsable de Demon Slayer.'
      },
      {
        id: 'anime-4',
        question: 'Quel est le nom du village caché de Naruto ?',
        options: ['Konoha', 'Suna', 'Kiri', 'Kumo'],
        correctAnswer: 0,
        explanation: 'Konoha est le village caché de la feuille.'
      },
      {
        id: 'anime-5',
        question: 'Quel est l\'anime le plus long de l\'histoire ?',
        options: ['One Piece', 'Dragon Ball', 'Sazae-san', 'Doraemon'],
        correctAnswer: 2,
        explanation: 'Sazae-san détient le record avec plus de 7000 épisodes.'
      },
      {
        id: 'anime-6',
        question: 'Quel est le nom du créateur de One Piece ?',
        options: ['Tite Kubo', 'Eiichiro Oda', 'Masashi Kishimoto', 'Hirohiko Araki'],
        correctAnswer: 1,
        explanation: 'Eiichiro Oda est l\'auteur de One Piece.'
      },
      {
        id: 'anime-7',
        question: 'Quel est le nom du protagoniste de My Hero Academia ?',
        options: ['All Might', 'Deku', 'Bakugo', 'Todoroki'],
        correctAnswer: 1,
        explanation: 'Izuku Midoriya, alias Deku, est le héros principal.'
      },
      {
        id: 'anime-8',
        question: 'Quel est l\'anime le plus regardé sur Netflix ?',
        options: ['Demon Slayer', 'Attack on Titan', 'Death Note', 'One Punch Man'],
        correctAnswer: 0,
        explanation: 'Demon Slayer est l\'anime le plus populaire sur Netflix.'
      },
      {
        id: 'anime-9',
        question: 'Quel est le nom du studio qui a produit Attack on Titan ?',
        options: ['Wit Studio', 'MAPPA', 'Production I.G', 'Bones'],
        correctAnswer: 0,
        explanation: 'Wit Studio a produit les 3 premières saisons.'
      },
      {
        id: 'anime-10',
        question: 'Quel est le nom du protagoniste de Dragon Ball ?',
        options: ['Goku', 'Vegeta', 'Gohan', 'Trunks'],
        correctAnswer: 0,
        explanation: 'Son Goku est le héros principal de Dragon Ball.'
      }
    ]
  },
  {
    id: 'tech',
    name: 'Technologie',
    description: 'Questions sur l\'informatique, les réseaux sociaux et la tech',
    questions: [
      {
        id: 'tech-1',
        question: 'Quel est le langage de programmation le plus populaire en 2024 ?',
        options: ['Python', 'JavaScript', 'Java', 'C++'],
        correctAnswer: 0,
        explanation: 'Python est le langage le plus utilisé selon l\'index TIOBE.'
      },
      {
        id: 'tech-2',
        question: 'Quel est le fondateur de Facebook (Meta) ?',
        options: ['Mark Zuckerberg', 'Bill Gates', 'Elon Musk', 'Jeff Bezos'],
        correctAnswer: 0,
        explanation: 'Mark Zuckerberg a créé Facebook en 2004.'
      },
      {
        id: 'tech-3',
        question: 'Quel est le navigateur web le plus utilisé au monde ?',
        options: ['Chrome', 'Firefox', 'Safari', 'Edge'],
        correctAnswer: 0,
        explanation: 'Google Chrome domine avec plus de 60% de parts de marché.'
      },
      {
        id: 'tech-4',
        question: 'Quel est le nom du système d\'exploitation mobile d\'Apple ?',
        options: ['Android', 'iOS', 'Windows Phone', 'BlackBerry OS'],
        correctAnswer: 1,
        explanation: 'iOS est le système d\'exploitation d\'Apple.'
      },
      {
        id: 'tech-5',
        question: 'Quel est le nom du créateur de Twitter ?',
        options: ['Jack Dorsey', 'Elon Musk', 'Evan Williams', 'Biz Stone'],
        correctAnswer: 0,
        explanation: 'Jack Dorsey est le co-fondateur de Twitter.'
      },
      {
        id: 'tech-6',
        question: 'Quel est le nom de la première version d\'iPhone ?',
        options: ['iPhone 1', 'iPhone Original', 'iPhone Classic', 'iPhone'],
        correctAnswer: 3,
        explanation: 'Le premier iPhone s\'appelait simplement "iPhone".'
      },
      {
        id: 'tech-7',
        question: 'Quel est le nom du créateur de YouTube ?',
        options: ['Steve Chen', 'Chad Hurley', 'Jawed Karim', 'Tous les trois'],
        correctAnswer: 3,
        explanation: 'Les trois ont co-fondé YouTube en 2005.'
      },
      {
        id: 'tech-8',
        question: 'Quel est le nom du système d\'exploitation de Google ?',
        options: ['Android', 'Chrome OS', 'Fuchsia', 'Tous les trois'],
        correctAnswer: 3,
        explanation: 'Google développe plusieurs systèmes d\'exploitation.'
      },
      {
        id: 'tech-9',
        question: 'Quel est le nom du créateur de Minecraft ?',
        options: ['Notch', 'Dinnerbone', 'Jeb', 'Herobrine'],
        correctAnswer: 0,
        explanation: 'Markus Persson, alias Notch, a créé Minecraft.'
      },
      {
        id: 'tech-10',
        question: 'Quel est le nom du premier ordinateur personnel ?',
        options: ['Apple I', 'IBM PC', 'Commodore 64', 'Altair 8800'],
        correctAnswer: 3,
        explanation: 'L\'Altair 8800 est considéré comme le premier PC.'
      }
    ]
  }
];

export const getThemeById = (id: string): Theme | undefined => {
  return quizThemes.find(theme => theme.id === id);
};

export const getAllThemes = (): Theme[] => {
  return quizThemes;
}; 