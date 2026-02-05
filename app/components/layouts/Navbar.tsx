import Link from "next/link";
import { IoSearchOutline, IoPersonOutline, IoHeartOutline, IoBagOutline } from 'react-icons/io5'

export default function Navbar() {
  const menuItems = [
    { name: 'Collections', href: '/Collections' },
    { name: 'Skincare', href: '/Skincare' },
    { name: 'Makeup', href: '/Makeup' },
    { name: 'Fragrance', href: '/Fragrance' },
    { name: 'Technology', href: '/Technology' },
    { name: 'Journal', href: '/journal' },
  ];

  return (
    <header className="min-h-[80px] bg-white/95 backdrop-blur-sm border-b border-[#E8E3D9] flex items-center justify-between px-[120px] sticky top-0 z-50">
      {/* Logo */}
      <div className="font-semibold text-[32px] text-[#1A1A1A] tracking-[3px]">
        <Link href="/">SHAN LORAY</Link>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-[48px]">
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} className={`text-[16px] font-normal cursor-pointer ${item.name === 'Collections' ? 'text-[#8B7355] font-medium' : 'text-[#3D3D3D]'}`}>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Icons */}
      <div className="flex items-center gap-[28px]">
        <span className="text-[14px] font-light text-[#3D3D3D]">EN / RU</span>
        <div className="w-[1px] h-4 bg-[#E8E3D9]" />
        <IoSearchOutline className="w-6 h-6 text-[#2B2B2B] cursor-pointer" />
           <Link href="/Dashboard">
            <IoPersonOutline className="w-6 h-6 text-[#2B2B2B] cursor-pointer" />
          </Link>
        <IoHeartOutline className="w-6 h-6 text-[#2B2B2B] cursor-pointer" />
          <Link href="/Payment">
            <IoBagOutline className="w-6 h-6 text-[#2B2B2B] cursor-pointer" />
          </Link>
      </div>
    </header>
  )
}
