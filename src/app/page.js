"use client"

import ParticlesComponent from '@/components/particles';
import Navbar from '@/components/user/Navbar';

function App() {
  return (
    <div>
      <Navbar />

      <ParticlesComponent />

      <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
        <h1 style={{
          color: 'white',
          pointerEvents: 'auto' // Add this if you want the text to be clickable
        }}>Particles are so fun!</h1>
      </div>

      <div className='h-screen flex items-center justify-center'>
        <h1 className='text-4xl'>Hello, World!</h1>
      </div>
    </div>
  );
}

export default App;