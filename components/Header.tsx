import Image from "next/image"

const Header = () => {
  return (
    <header className='flex justify-center items-center w-full h-[200] bg-[#0D0D0D]'>
      <Image
        src="/static/rocket.svg"
        width={22}
        height={36}
        alt="Rocket"
      />
      <h1 className="text-[40px] font-bold ml-2">
        <span className="text-primary">Todo </span>
        <span className="text-secondary">App</span>
      </h1>
    </header>
  )
}

export default Header