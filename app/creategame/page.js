"use client";
import "./createGame.css";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@/components/ui/button";
import { righteous } from "../fonts";
import Link from "next/link";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import Info from "../Components/Info";

function CreateGame() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [roomId, setRoomId] = useState("");
    const [copyIcon, setCopyIcon] = useState(true);
    const [roomStatus, setRoomStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const handleClickOpen = () => {
        setOpen(true);
    };

    function handdlePlayerNumber(e) {
        const theNumber = e.target.value.replace(/[^0-9]/g, "");
        setNumber(theNumber);
    }

    function handleCopyRoomId() {
        setCopyIcon(false);
        setTimeout(() => {
            setCopyIcon(true);
        }, 2000);
        navigator.clipboard.writeText(roomId);
    }
    useEffect(() => {
        const roomId = Math.random().toString(36).substring(2, 8);
        setRoomId(roomId.toUpperCase());
    }, []);

    async function createRoom() {
        try {
            await setDoc(doc(db, "rooms", roomId), {
                players: {
                    player1: {
                        name: name || " ",
                        secretNumber: number || " ",
                        guesses: [],
                    },
                    player2: {
                        name: "",
                        secretNumber: "",
                        guesses: [],
                    },
                },
                status: "waiting",
                turn: "player1",
                winner: null,
            });
            setRoomStatus(true);
        } catch (error) {
            console.error("Firebase Error:", error.message);
        }
    }

    return (
        <Container
            maxWidth="xs"
            className="h-[100vh] bg-background bubble-shadow relative p-0"
        >
            <Link href="/">
                <p
                    className={`${righteous.className} text-6xl absolute left-[50%] translate-x-[-50%] w-[100%] text-center text-[black]`}
                >
                    Guess It
                </p>
            </Link>
            <div className="center-element h-[100%] flex-col gap-[15px]">
                <div className="flex flex-col  items-center w-[70%]">
                    <label
                        htmlFor="player-name"
                        className=" font-bold text-[20px] text-primary"
                    >
                        Name
                    </label>
                    <input
                        placeholder="Enter Name"
                        id="player-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-[100%] px-3 py-2 rounded-md bg-[#b16900] text-center text-[white] uppercase focus:outline-2 focus:outline-[#2196f3]"
                    />
                </div>
                <div className="flex flex-col items-center w-[70%] ">
                    <label
                        htmlFor="player-number"
                        className=" font-bold text-[20px] text-primary"
                    >
                        Number
                    </label>
                    <input
                        placeholder="Select Number"
                        maxLength={4}
                        id="player-number"
                        value={number}
                        onChange={handdlePlayerNumber}
                        className="w-[100%] px-3 py-2 rounded-md bg-[#b16900] text-center text-[white] uppercase focus:outline-2 focus:outline-primary"
                    />
                </div>
                <div className="w-[70%]">
                    <p className=" font-bold text-[20px] text-primary text-center m-0">
                        Room ID
                    </p>
                    <div className="flex justify-between items-center bg-primary py-2 px-3 rounded-md h-[52px]">
                        <p className="text-3xl m-0 text-[white]">{roomId}</p>
                        {copyIcon ? (
                            <div className="relative">
                                <div className="copy-icon">
                                    <ContentCopyIcon
                                        className="cursor-pointer text-[white]"
                                        onClick={handleCopyRoomId}
                                    />
                                </div>
                                <div className="text-[white] text-[12px] copy-guid absolute top-[10px]">
                                    COPY ID
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <CheckIcon className="text-[white]" />
                                <div className="text-[white] text-[12px] copy-guid !block absolute top-[10px]">
                                    Coped
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Button
                    onClick={() => {
                        createRoom();
                        router.push(`/${roomId}`);
                    }}
                    className="bg-primary w-[70%] text-white  h-[50px] !text-[30px] !rounded-2xl hover:bg-primary shadow-lg hover:shadow-2xl transition-shadow"
                    disabled={name && number.length === 4 ? false : true}
                >
                    Play
                </Button>
            </div>
            <Button
                className="hover:bg-primary shadow-lg hover:shadow-2xl transition-shadow info left-[10px] "
                onClick={handleClickOpen}
            >
                <InfoOutlineIcon />
                <p className="m-0">How to play</p>
            </Button>
            <Info open={open} setOpen={setOpen} />
        </Container>
    );
}

export default CreateGame;
