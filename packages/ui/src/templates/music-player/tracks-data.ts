import track1Src from "./assets/track-1.png";
import track2Src from "./assets/track-2.png";
import track3Src from "./assets/track-3.png";
import track4Src from "./assets/track-4.png";
import track5Src from "./assets/track-5.png";
import track6Src from "./assets/track-6.png";
import track7Src from "./assets/track-7.png";
import track8Src from "./assets/track-8.png";
import track9Src from "./assets/track-9.png";
import track10Src from "./assets/track-10.png";

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  added: string;
  duration: string;
  coverSrc: string;
}

export const summerChillTracks: Track[] = [
  {
    id: "1",
    title: "Global Rebellion",
    artist: "Dianne Russell",
    album: "Calming Shine",
    added: "5 Dec 2023",
    duration: "3:52",
    coverSrc: track1Src,
  },
  {
    id: "2",
    title: "Lullaby of Noise",
    artist: "Floyd Miles",
    album: "Impossible",
    added: "3 Dec 2024",
    duration: "3:55",
    coverSrc: track2Src,
  },
  {
    id: "3",
    title: "Clear Mission to Paris",
    artist: "Eleanor Pena",
    album: "Lounge Technology",
    added: "2 Dec 2023",
    duration: "3:42",
    coverSrc: track3Src,
  },
  {
    id: "4",
    title: "Stubborn Love Symphony",
    artist: "Jane Cooper",
    album: "Unlax Feelings",
    added: "24 Nov 2024",
    duration: "3:56",
    coverSrc: track4Src,
  },
  {
    id: "5",
    title: "Wind Down Crash",
    artist: "Arlene McCoy",
    album: "Calming Density",
    added: "22 Nov 2024",
    duration: "4:05",
    coverSrc: track5Src,
  },
  {
    id: "6",
    title: "Sunset Vibes",
    artist: "Cameron Williamson",
    album: "Kerosene",
    added: "5 Dec 2023",
    duration: "3:52",
    coverSrc: track6Src,
  },
  {
    id: "7",
    title: "Mellow Tides",
    artist: "Annette Black",
    album: "Breezy Bliss",
    added: "3 Dec 2023",
    duration: "3:55",
    coverSrc: track7Src,
  },
  {
    id: "8",
    title: "Tropical Pulse",
    artist: "Wade Warren",
    album: "Coastal Calm",
    added: "2 Dec 2023",
    duration: "3:42",
    coverSrc: track8Src,
  },
  {
    id: "9",
    title: "Solar Groove",
    artist: "Leslie Alexander",
    album: "Sunset Lounge",
    added: "24 Nov 2024",
    duration: "3:56",
    coverSrc: track9Src,
  },
  {
    id: "10",
    title: "Heatwave Harmony",
    artist: "Albert Flores",
    album: "Seaside Serenity",
    added: "22 Nov 2023",
    duration: "4:05",
    coverSrc: track10Src,
  },
];
