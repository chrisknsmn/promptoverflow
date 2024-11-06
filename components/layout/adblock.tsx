import { ReactNode } from 'react';

interface AdblockProps {
  children: ReactNode;
}

const Adblock: React.FC<AdblockProps> = ({ children }) => {
  return (
    <section className="flex-1 flex flex-col xl:flex-row">
      <div className='flex-1 p-2'>
        {children}
      </div>
      <div className="w-full max-w-[100%] xl:max-w-[300px] text-white flex justify-center items-center bg-background">
        <p className='text-dark p-4'>AD Block</p>
      </div>
    </section>
  )
}

export default Adblock;