import { useCallback, useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = (props) => {
    const [init, setInit] = useState(false);

    // Preload the engine with useCallback
    const initEngine = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    useEffect(() => {
        initParticlesEngine(initEngine).then(() => setInit(true));
    }, [initEngine]);

    const particlesLoaded = useCallback((container) => {
        console.log("Particles Loaded:", container);
    }, []);

    const options = useMemo(() => ({
        fullScreen: {
            enable: false,
            zIndex: -1
        },
        particles: {
            number: {
                value: 200,
                density: {
                    enable: true,
                    value_area: 300
                }
            },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: { value: 3, random: true },
            links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 4,
                outModes: { default: "out" }
            }
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 }
            }
        },
        detectRetina: true,
        background: { color: "#000000" },
        fpsLimit: 120
    }), []);

    return (
        <div id="home">
            {init && (
                <Particles
                    id={props.id || "tsparticles"}
                    className="h-screen w-full"
                    init={particlesLoaded}
                    options={options}
                />
            )}
        </div>
    );
};

export default ParticlesComponent;
