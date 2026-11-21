const KanikaSharma1 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795242674/KanikaSharma1_1.mp4";
const KanikaSharma2 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795242749/KanikaSharma2_1.mp4";
const KanikaSharma3 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795242965/KanikaSharma3_1.mp4";
const KanikaSharma4 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795240912/KanikaSharma4.mp4";
const KanikaSharma5 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241048/KanikaSharma5.mp4";

const bhavyasharma1 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241083/bhavyasharma1.mov";
const bhavyasharma2 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241051/bhavyasharma2.mov";
const bhavyasharma3 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795243761/bhavyasharma3_1.mp4";
const bhavyasharma4 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795243857/bhavyasharma4_1.mp4";
const bhavyasharma5 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241092/bhavyasharma5.mov";


const deepaviskrama1 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795245679/deepaviskrama1_2.mp4";
const deepaviskrama2 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795244188/deepaviskrama2_1.mp4";
const deepaviskrama3 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795246998/deepaviskrama3_1.mp4";
const deepaviskrama4 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795247043/deepaviskrama4_1.mp4";
const deepaviskrama5 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795244591/deepaviskrama5_1.mp4";




const fiza1 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241015/fiza1.mp4";
const fiza2 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241026/fiza2.mp4";
const fiza3 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795240711/fiza3.mp4";
const fiza4 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795240741/fiza4.mp4";
const fiza5 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795240805/fiza5.mp4";



const saloni1 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795240871/saloni1.mp4";
const saloni2 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241041/saloni2.mp4";
const saloni3 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241038/saloni3.mp4";
const saloni4 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241032/saloni4.mp4";
const saloni5 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795243516/saloni5_1.mp4";


const ishwariya1 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795240902/Ishwariya1.mp4";
const ishwariya2 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241094/Ishwariya2.mp4";
const ishwariya3 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241008/Ishwariya3.mp4";
const ishwariya4 = "https://res.cloudinary.com/dtuwcxxxu/video/upload/v1795241019/Ishwariya4.mp4";

// Creator-wise video collection
const creatorVideos = [
  {
    creator: "Kanika Sharma",
    videos: [
      KanikaSharma1,
      KanikaSharma2,
      KanikaSharma3,
      KanikaSharma4,
      KanikaSharma5,
    ],
  },
  {
    creator: "Bhavya Sharma",
    videos: [
      bhavyasharma1,
      bhavyasharma2,
      bhavyasharma3,
      bhavyasharma4,
      bhavyasharma5,
    ],
  },
  {
    creator: "Deepa Viskrama",
    videos: [
      deepaviskrama1,
      deepaviskrama2,
      deepaviskrama3,
      deepaviskrama4,
      deepaviskrama5,
    ],
  },
  {
    creator: "Fiza",
    videos: [
      fiza1,
      fiza2,
      fiza3,
      fiza4,
      fiza5,
    ],
  },
  {
    creator: "Saloni",
    videos: [
      saloni1,
      saloni2,
      saloni3,
      saloni4,
      saloni5,
    ],
  },
    {
    creator: "ishwariya",
    videos: [
      ishwariya1,
      ishwariya2,
      ishwariya3,
      ishwariya4,
    
    ],
  },
];





// Generate videos in round-robin order
export const videos = Array.from(
  { length: Math.max(...creatorVideos.map((item) => item.videos.length)) },
  (_, videoIndex) =>
    creatorVideos.flatMap((creatorData) => {
      const video = creatorData.videos[videoIndex];

      if (!video) return [];

      const id =
        creatorVideos
          .slice(0, creatorVideos.indexOf(creatorData))
          .reduce((total, item) => total + item.videos.length, 0) +
        videoIndex +
        1;

      return [
        {
          id,
          number: String(id).padStart(2, "0"),

          title: creatorData.creator.toUpperCase(),
          creator: creatorData.creator,

          category: "Cinematic Editing",
          video,

          duration: "00:30",
          platform: "Instagram",
          aspectRatio: "9:16",

          tags: [
            "Creative",
            "Cinematic",
            "Visual Storytelling",
          ],

          status: "published",
        },
      ];
    })
).flat();


