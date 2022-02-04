import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={`container`}>
      <div className="w-100 d-flex flex-column align-items-center mt-5">
        <h1>Selamat Datang</h1>
        <Link href="/products"><Button variant="success">Mulai Menjelajah Katalog</Button></Link>
      </div>
    </div>
  )
}
