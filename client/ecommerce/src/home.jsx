import React from "react";
import { ImageSlider } from "./ImageSlider";
import chamberlain from "./images/chamberlain.jpg"
import fortyniners from "./images/49ers.jpg";
import Knicks from "./images/Knicks.jpg";
import yankees from "./images/yankees.jpg";

const IMAGES = [chamberlain, fortyniners, Knicks, yankees];

export function Home() {
  return (
    <div style={{ maxWidth: "1200px", width: "100%", aspectRatio: "10/6", margin: "0 auto" }}>
      <ImageSlider imageUrls={IMAGES} />
    </div>
  );
}