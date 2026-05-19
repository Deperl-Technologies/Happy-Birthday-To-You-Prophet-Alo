import Hero from "../components/Hero.jsx";
import HisStory from "../components/HisStory.jsx";
import TheEmpire from "../components/TheEmpire.jsx";
import PhotoGallery from "../components/PhotoGallery.jsx";
import AdamimogoFM from "../components/AdamimogoFM.jsx";
import VideoSection from "../components/VideoSection.jsx";
import BeyondThePulpit from "../components/BeyondThePulpit.jsx";
import WishesWall from "../components/WishesWall.jsx";
import WordTestimonies from "../components/WordTestimonies.jsx";
import HighlightReel from "../components/HighlightReel.jsx";
import Chamber1 from "../components/Chamber1.jsx";
import Chamber2 from "../components/Chamber2.jsx";
import FooterSection from "../components/FooterSection.jsx";
import ShareButton from "../components/ShareButton.jsx";
import MusicPlayer from "../components/MusicPlayer.jsx";

const Index = () => {
  return (
    <main>
      {/* Section 1 — Hero: Sacred Fire Opening */}
      <Hero />

      {/* Section 2 — His Story: Ancient Fire Scroll */}
      <HisStory />

      {/* Section 3 — The Empire: Fire Editorial */}
      <TheEmpire />

      {/* Section 3.5 — Photo Gallery: Gallery of Fire */}
      <PhotoGallery />

      {/* Section 4 — Adamimogo FM: Fire Broadcast */}
      <AdamimogoFM />

      {/* Section 4.5 — Video Section: The Voice & The Vision */}
      <VideoSection />

      {/* Section 5 — Beyond The Pulpit: Fire Bento */}
      <BeyondThePulpit />

      {/* Section 5.5 — Word Testimonies: Encounters With the Man of God */}
      <WordTestimonies />

      {/* Section 5.6 — Highlight Reel: Moments That Shook the Earth */}
      <HighlightReel />

      {/* Section 6 — Wishes Wall: Sacred Fire Throne */}
      <WishesWall />

      {/* Section 7 — Chamber 1: Sacred Fire Sealed Door (visible from May 17) */}
      <Chamber1 />

      {/* Section 8 — Chamber 2: Grand Fire Chamber (visible from May 25) */}
      <Chamber2 />

      {/* Section 9 — Footer: Sacred Fire Closing */}
      <FooterSection />

      {/* Floating Share Button — fixed bottom-right */}
      <ShareButton />

      {/* Floating Music Player — fixed bottom-left */}
      <MusicPlayer />
    </main>
  );
};

export default Index;
