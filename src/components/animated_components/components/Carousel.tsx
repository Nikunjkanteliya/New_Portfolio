import "../css/Carousel.css";
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import about from '@/data/about.json'
import { Paper, Typography } from "@mui/material";
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import { SiMui } from "react-icons/si";
import { FaDocker } from "react-icons/fa";
import { FaGitlab } from "react-icons/fa6";
import { GiMatterStates } from "react-icons/gi";
import { FaReact } from "react-icons/fa";
import { IoLogoNodejs } from "react-icons/io5";
import { BiLogoMongodb } from "react-icons/bi";
import { BiLogoPostgresql } from "react-icons/bi";
import { RiSupabaseFill } from "react-icons/ri";
import { RiNextjsFill } from "react-icons/ri";
import { RiTailwindCssFill } from "react-icons/ri";
import { SiRedux } from "react-icons/si";
import { SiTypescript } from "react-icons/si";

const data = about 

const carousel: KeenSliderPlugin = (slider) => {
  const z = 370;
  function rotate() {
    const deg = 360 * slider.track.details.progress;
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
  }
  slider.on("created", () => {
    const deg = 360 / slider.slides.length;
    slider.slides.forEach((element, idx) => {
      element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
    });
    rotate();
  });
  slider.on("detailsChanged", rotate);
};
function skillIcon(name: string) {
  const n = name.toLowerCase()
  if (n.includes('react')) return <FaReact />
  if (n.includes('typescript')) return <SiTypescript />
  if (n.includes('mui') || n.includes('material')) return <SiMui />
  if (n.includes('mongodb')) return <BiLogoMongodb />
  if (n.includes('postgresql')) return <BiLogoPostgresql />
  if (n.includes('supabase')) return <RiSupabaseFill />
  if (n.includes('next')) return <RiNextjsFill />
  if (n.includes('express')) return <IoLogoNodejs />
  if (n.includes('tailwind')) return <RiTailwindCssFill />
  if (n.includes('zustand')) return <GiMatterStates />
  if (n.includes('gitlab')) return <FaGitlab />
  if (n.includes('docker')) return <FaDocker />
  if (n.includes('redux toolkit')) return <SiRedux />
  return <CodeRoundedIcon />
}
export default function Carousel() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      selector: ".carousel__cell",
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel]
  );

  return (
    <div className="wrapper">
      <div className="scene">
        <div className="carousel keen-slider" ref={sliderRef}>
          {data.skills?.map((skill,_id) => (
                  <Paper
                    key={_id}
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.25,
                      
                    }}
                    className="carousel__cell"
                    aria-label={skill}
                  >
                    {skillIcon(skill)}
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{
                        fontSize: {
                          xs: '0.65rem', 
                          sm: '1rem',    // default on small and up
                        },
                      }}
                    >
                      {skill}
                    </Typography>
                  </Paper>
              ))}
        </div>
      </div>
    </div>
  );
}
