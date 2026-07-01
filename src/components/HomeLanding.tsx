"use client";

import Bear3DScene from "@/components/bear/Bear3DScene";
import { HOME_TEMP } from "@/content/site";

export default function HomeLanding() {
  return (
    <div className="home-landing">
      <div className="home-landing__stage">
        <Bear3DScene className="home-landing__bear" />
      </div>
      <p className="home-landing__line">{HOME_TEMP.line}</p>
    </div>
  );
}
