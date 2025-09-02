import { BrowserRouter, Route, Routes } from "react-router-dom";
import SlotClassic from "../pages/SlotClassicPage";
import SlotPokemonPage from "../pages/SlotPokemonPage";
import SlotDeluxePage from "../pages/SlotDeluxePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/slot-classic" element={<SlotClassic />} />
        <Route path="/slot-pokemon" element={<SlotPokemonPage />} />
        <Route path="/slot-deluxe" element={<SlotDeluxePage />} />
      </Routes>
    </BrowserRouter>
  );
}
