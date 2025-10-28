"use client";
import "./jiongame.css";
import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Button } from "@/components/ui/button";
import { righteous } from "../fonts";
import Link from "next/link";
import { db } from "@/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import Info from "../Components/Info";

function JionGmae() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [roomId, setRoomId] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const handleClickOpen = () => {
        setOpen(true);
    };

    function handdlePlayerNumber(e) {
        const theNumber = e.target.value.replace(/[^0-9]/g, "");
        setNumber(theNumber);
    }

    async function jionRoom() {
        const roomRef = doc(db, "rooms", roomId);
        const roomSnap = await getDoc(roomRef);

        if (!roomSnap.exists()) {
            return setError("Wrong Room ID");
        }
        if (roomSnap.data().status !== "waiting") {
            return setError("Room Is Full");
        }

        await updateDoc(roomRef, {
            "players.player2": {
                name: name,
                secretNumber: number,
                guesses: [],
                correctGuesses: [],
            },
            status: "playing",
            turn: "player1",
        });
        router.push(`/${roomId}`);
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
                <div className="flex flex-col items-center w-[70%] ">
                    <label
                        htmlFor="room-id"
                        className=" font-bold text-[20px] text-primary"
                    >
                        Room ID
                    </label>
                    <input
                        placeholder="Enter Room ID"
                        id="room-id"
                        value={roomId}
                        onChange={(e) => {
                            setRoomId(e.target.value.toUpperCase());
                        }}
                        className="w-[100%] px-3 py-2 rounded-md bg-[#b16900] text-center text-[white] uppercase focus:outline-2 focus:outline-primary"
                    />
                </div>

                <Button
                    onClick={async () => {
                        await jionRoom();
                    }}
                    className="bg-primary text-white  h-[50px] !text-[30px] !rounded-2xl hover:bg-primary shadow-lg hover:shadow-2xl transition-shadow w-[70%]"
                    disabled={
                        name && number.length === 4 && roomId ? false : true
                    }
                >
                    Play
                </Button>
                <p className="m-0 text-[red]">{error}</p>
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

export default JionGmae;
