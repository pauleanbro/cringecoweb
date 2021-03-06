import type { NextPage } from 'next'
import Head from 'next/head'
import { signIn, signOut, useSession, } from 'next-auth/client';
import { useState } from 'react';

const Home: NextPage = () => {
  const [ session ] = useSession();

  const [dataUrl, setDataUrl] = useState("");

  const crinjometro = async () => {

    const rawResponse = await fetch('/api/canvas', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(session)
    });
    
    const content = await rawResponse.json();
    
    setDataUrl(content.image);

  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!session && 
        <div>
          <p>You are not signed in</p>
          <button onClick={() => signIn()}>Login</button>
        </div>
      }

      {session && 
        <div>
          <button onClick={() => crinjometro()}>Crinjometro</button>
          <button onClick={() => signOut()}>Sair</button>
          { dataUrl && <a download="crinjometro.png" href={dataUrl}>Baixar</a> }
        </div>
      }
      
    </div>
  )
}

export default Home
