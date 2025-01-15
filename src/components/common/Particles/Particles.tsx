import { useEffect } from 'react';
import generate from '../../../utils/generate-particles';

const Particles = () => {
    // const canvasRef = useRef<any>(null);
    useEffect(() => {
        generate();
    }, [])
    return (
        <canvas className="particles_design" id="particles_design">
        </canvas>
    )
}

export default Particles
