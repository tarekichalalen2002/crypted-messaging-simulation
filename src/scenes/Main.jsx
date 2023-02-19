import rsa from 'js-crypto-rsa'
import { useEffect, useState } from 'react'
import {FiSend} from 'react-icons/fi';
import { ImArrowUp , ImArrowDown } from "react-icons/im"

const Main = () => {
    const [BobPrivateKey ,setBobPrivateKey] = useState(null);
    const [BobPublicKey , setBobPublicKey] = useState(null);
    const [JhonPublicKey , setJhonPublicKey] = useState(null);
    const [JhonPrivateKey , setJhonPrivateKey] =  useState(null);

    const [BobEncrypted , setBobEncrypted] = useState("");
    const [BobDecrypted , setBobDecrypted] = useState("");
    const [JhonEncrypted , setJhonEncrypted] = useState("");
    const [JhonDecrypted , setJhonDecrypted] = useState("");

    const [bobMessage , setBobMessage] = useState("");
    const [jhonMessage , setJhonMessage] = useState("")

    
    // const msg = "Tarek ICHALALEN";
    
    // const msgBuffer = new TextEncoder().encode(msg);

   useEffect(() => {
    rsa.generateKey(2048).then((key) => {
        setBobPrivateKey(key.privateKey);
        setJhonPublicKey(key.publicKey);
    });

    rsa.generateKey(2048).then((key) => {
        setJhonPrivateKey(key.privateKey);
        setBobPublicKey(key.publicKey)
    });

   },[])

   const handleBobSubmit = (e) => {
    e.preventDefault();
    if (BobPrivateKey && JhonPublicKey) {
        const msgBuffer = new TextEncoder().encode(e.target.BobMessage.value);
        rsa.encrypt(
            msgBuffer,
            JhonPublicKey,
            'SHA-256',
        ).then( (encrypted) => {
            setBobEncrypted(encrypted);
              return rsa.decrypt(
                encrypted,
                BobPrivateKey,
                'SHA-256',
              );
        }).then( (decrypted) => {
            const decoded = new TextDecoder().decode(decrypted)
            setBobDecrypted(decoded)
        });
    }
   }

   const handleJhonSubmit = (e) => {
    e.preventDefault();
    if (BobPublicKey && JhonPrivateKey) {
        const msgBuffer = new TextEncoder().encode(e.target.JhonMessage.value);
        rsa.encrypt(
            msgBuffer,
            BobPublicKey,
            'SHA-256',
        ).then( (encrypted) => {
            setJhonEncrypted(encrypted);
              return rsa.decrypt(
                encrypted,
                JhonPrivateKey,
                'SHA-256',
              );
        }).then( (decrypted) => {
            const decoded = new TextDecoder().decode(decrypted)
            setJhonDecrypted(decoded)
        });
    }
   }

   const handleBobChange = (e) => {
    setBobMessage(e.target.value)
   }

   const handleJhonChange = (e) => {
    setJhonMessage(e.target.value)
   }


    return (
        <section
        className="w-full h-full bg-gradient-to-br from-fuchsia-900 to-fuchsia-500"
        >
            <div
            className="min-h-screen p-8 flex flex-col items-center gap-12"
            >
                <h1
                className="text-3xl font-semibold text-gray-200 tablet:w-1/2 w-5/6 text-center"
                >Demonstration For Asymmetric Cryptography Used in Blockchain Systems</h1>
                <section
                className="w-full flex flex-col gap-5"
                >
                    <h2
                    className="text-2xl font-medium text-gray-300 italic"
                    >Public - Private :</h2>

                    <div
                    className="flex flex-col gap-8"
                    >
                        <div
                        className="bg-gradient-to-br from-fuchsia-200 to-fuchsia-400
                        w-full
                        min-h-[400px] rounded-xl shadow-inner
                        flex flex-col gap-4 p-5 items-center"
                        >
                            <h1
                            className='text-sky-800 text-2xl font-medium'
                            >Bob's Device</h1>
                            <div
                            className="w-full h-full flex tablet:flex-row flex-col gap-6"
                            >
                                <form
                                className='tablet:w-1/2 w-full h-full flex flex-col gap-3'
                                onSubmit={handleBobSubmit}
                                >
                                    <h3
                                    className='text-sky-800 font-medium'
                                    >Message :</h3>
                                    <textarea 
                                    className='h-2/3 rounded-lg shadow-inner p-3'
                                    placeholder="Bob's message . . ."
                                    value={bobMessage}
                                    onChange={handleBobChange}
                                    name="BobMessage"
                                    />

                                    <button
                                    type='submit'
                                    className="text-gray-200 bg-sky-800 px-5 py-2 font-medium rounded-xl self-end flex items-center gap-3"
                                    >
                                        Send <FiSend />
                                    </button>

                                    <h3
                                    className='text-sky-800 font-medium'
                                    >Received :</h3>
                                    <div
                                    className={`
                                    w-full bg-white h-[120px] rounded-xl
                                    shadow-inner p-4
                                    ${(JhonDecrypted.length > 0 && jhonMessage === JhonDecrypted) ? "border-2 border-green-500" : "border-2 border-red-500"}
                                    `}
                                    >
                                        {JhonDecrypted ? <p> {JhonDecrypted} </p> : <p className='text-red-500'>Decryption error</p>}
                                    </div>
                                </form>

                                <div
                                className='flex flex-col gap-3 tablet:w-1/2'
                                >
                                    <h3
                                    className='text-sky-800 font-medium'
                                    >Private Key :</h3>

                                    <div
                                    className='p-2 bg-slate-50 rounded-xl h-[130px] w-full overflow-y-scroll cursor-not-allowed'
                                    >
                                    
                                    {BobPrivateKey && `${BobPrivateKey.d} \n ${BobPrivateKey.dp} \n
                                    ${BobPrivateKey.dq} \n ${BobPrivateKey.e} \n ${BobPrivateKey.kty} \n ${BobPrivateKey.qi} \n
                                    ${BobPrivateKey.n} \n ${BobPrivateKey.p} \n ${BobPrivateKey.q}
                                    
                                    `}
                                    </div>

                                    <h3
                                    className='text-sky-800 font-medium'
                                    >Public Key :</h3>

                                    <div
                                    className='p-2 bg-slate-50 rounded-xl h-[130px] w-full overflow-y-scroll cursor-not-allowed'
                                    >
                                        <p>{JhonPublicKey && `${JhonPublicKey.e} \n ${JhonPublicKey.n} \n ${JhonPublicKey.kty}
                                        `}</p>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div
                        className="w-full flex justify-around"
                        >
                            <span
                            className='text-sky-800 text-[20vh]'
                            ><ImArrowDown /></span>
                            <span
                            className='text-sky-800 text-[20vh]'
                            ><ImArrowUp /></span>

                        </div>


                        <div
                        className="w-full h-auto bg-fuchsia-200
                        rounded-xl shadow-inner flex tablet:flex-row flex-col gap-5 items-center p-8"
                        >

                            <div
                            className="tablet:w-1/2 w-full h-[80%]"
                            >
                                <div
                                className='flex flex-col gap-3'
                                >
                                    <h3
                                    className='text-xl font-medium text-sky-800'
                                    >Bob's encryption :</h3>
                                    <div
                                    className='bg-white rounded-xl shadow-inner w-full h-[50px] p-4 overflow-x-scroll'
                                    >
                                        {BobEncrypted && <p>{BobEncrypted}</p>}
                                    </div>
                                </div>
                            </div>

                            
                            <div
                            className="tablet:w-1/2 w-full h-[80%]"
                            >
                                <div
                                className='flex flex-col gap-3'
                                >
                                    <h3
                                    className='text-xl font-medium text-sky-800'
                                    >Jhon's encryption :</h3>
                                    <div
                                    className='bg-white rounded-xl shadow-inner w-full h-[50px] p-4 overflow-x-scroll'
                                    >
                                        {JhonEncrypted && <p>{JhonEncrypted}</p>}
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div
                        className="w-full flex justify-around"
                        >
                            <span
                            className='text-sky-800 text-[20vh]'
                            ><ImArrowDown /></span>
                            <span
                            className='text-sky-800 text-[20vh]'
                            ><ImArrowUp /></span>

                        </div>



                        <div
                        className="bg-gradient-to-br from-fuchsia-200 to-fuchsia-400
                        w-full
                        min-h-[400px] rounded-xl shadow-inner
                        flex flex-col gap-4 p-5 items-center"
                        >
                            <h1
                            className='text-sky-800 text-2xl font-medium'
                            >Jhon's Device</h1>
                            <div
                            className="w-full h-full flex tablet:flex-row flex-col gap-6"
                            >
                                <form
                                className='tablet:w-1/2 w-full h-full flex flex-col gap-3'
                                onSubmit={handleJhonSubmit}
                                >
                                    <h3
                                    className='text-sky-800 font-medium'
                                    >Message :</h3>
                                    <textarea 
                                    className='h-2/3 rounded-lg shadow-inner p-3'
                                    placeholder="Jhon's message . . ."
                                    value={jhonMessage}
                                    onChange={handleJhonChange}
                                    name="JhonMessage"
                                    />

                                    <button
                                    type='submit'
                                    className="text-gray-200 bg-sky-800 px-5 py-2 font-medium rounded-xl self-end flex items-center gap-3"
                                    >
                                        Send <FiSend />
                                    </button>

                                    <h3
                                    className='text-sky-800 font-medium'
                                    >Received :</h3>
                                    <div
                                    className={`
                                    w-full bg-white h-[120px] rounded-xl
                                    shadow-inner p-5
                                    ${(BobDecrypted.length >0 && bobMessage === BobDecrypted) ? "border-2 border-green-500" : "border-2 border-red-500"}
                                    `} 
                                    >
                                        {BobDecrypted ? <p>{BobDecrypted}</p> : <p className='text-red-500'>Decryption error</p>}
                                    </div>
                                </form>

                                <div
                                className='flex flex-col gap-3 tablet:w-1/2'
                                >
                                    <h3
                                    className='text-sky-800 font-medium'
                                    >Private Key :</h3>

                                    <div
                                    className='p-2 bg-slate-50 rounded-xl h-[130px] w-full overflow-y-scroll cursor-not-allowed'
                                    >
                                        <p>{JhonPrivateKey && `${JhonPrivateKey.d} \n ${JhonPrivateKey.dp} \n
                                        ${JhonPrivateKey.dq} \n ${JhonPrivateKey.e} \n ${JhonPrivateKey.kty} \n ${JhonPrivateKey.qi} \n
                                        ${JhonPrivateKey.n} \n ${JhonPrivateKey.p} \n ${JhonPrivateKey.q}
                                        `}</p>
                                    </div>

                                    <h3
                                    className='text-sky-800 font-medium'
                                    >Public Key :</h3>

                                    <div
                                    className='p-2 bg-slate-50 rounded-xl h-[130px] w-full overflow-y-scroll cursor-not-allowed'
                                    >
                                        <p>{BobPublicKey && `${BobPublicKey.e} \n ${BobPublicKey.n} \n ${BobPublicKey.kty}
                                        `}</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>


                    
                </section>
            </div>

        </section>
    )
}

export default Main