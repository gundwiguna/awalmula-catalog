import Image from 'next/image';
import s from '../styles/Home.module.css';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={`container`}>
      <div className="w-100 vh-75 d-flex flex-column align-items-center mt-5">
        <Image layout="intrinsic" width={260} height={260} objectFit alt={`welcome-awalmula`} className={`w-100 img-fluid ${s.welcomeImg}`} src="/images/logo.png" />
        <h1 className="my-4">Selamat Datang</h1>
        <Link href="/products" passHref><Button variant="success">Mulai Menjelajah Katalog</Button></Link>
      </div>
    </div>
  )
}
