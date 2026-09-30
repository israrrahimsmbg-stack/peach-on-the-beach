import MinimalHeader from "./minimal/MinimalHeader";
import MinimalHero from "./minimal/MinimalHero";
import Statement from "./minimal/Statement";
import MinimalGallery from "./minimal/MinimalGallery";
import Films from "./minimal/Films";
import Practical from "./minimal/Practical";
import Inquiry from "./components/Inquiry";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-limestone text-navy">
      <MinimalHeader />
      <main>
        <MinimalHero />
        <Statement />
        <MinimalGallery />
        <Films />
        <Practical />
        <Inquiry />
      </main>
      <Footer />
    </div>
  );
}
