import React from "react";
import EconomistNavbar from "../components/EconomistNavbar.jsx";
import "../components/TeamSection.css";

import AbhijeethImg from "../assets/Abhijeeth.jpeg";
import VaishnaviImg from "../assets/Vaishnavi.jpeg";
import RamanujaImg from "../assets/Ramanuja.jpeg";
import varshithaImg from "../assets/varshitha.jpeg";
import manasImg from "../assets/manas.jpeg";

const squad = [
  {
    name: "Manas",
    role: "Team Lead | Full Stack Developer",
    desc: "Leads project strategy and integrates CGE simulation.",
    img: manasImg,
  },
  {
    name: "Varshitha Reddy",
    role: "Full Stack Developer",
    desc: "Builds dashboard and APIs.",
    img: varshithaImg,
  },
  {
    name: "Ramanuja",
    role: "Frontend Developer",
    desc: "Designs UI and visualizations.",
    img: RamanujaImg,
  },
  {
    name: "Abhijeeth",
    role: "Economic Research",
    desc: "Develops SAM and validates models.",
    img: AbhijeethImg,
  },
  {
    name: "Vaishnavi Reddy",
    role: "UI/UX Designer",
    desc: "Improves user experience.",
    img: VaishnaviImg,
  },
];

export default function Squad() {
  return (
    <>
      <EconomistNavbar />

      <section className="team-section">
        <h2 className="team-title">Meet Our Team</h2>

        <div className="team-container">
          {squad.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="card-image">
                <img src={member.img} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="description">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}