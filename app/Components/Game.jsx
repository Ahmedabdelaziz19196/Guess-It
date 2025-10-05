"use client";
import Container from "@mui/material/Container";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { righteous } from "../fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Info from "./Info";
function Game() {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        localStorage.removeItem("playerRole");
    }, []);
    return (
        <Container
            maxWidth="xs"
            className="h-[100vh] bg-background bubble-shadow "
        >
            <div className="w-[60%] h-[100%] mx-auto text-center center-element flex-col gap-[10px]">
                <p className={`${righteous.className} text-6xl`}>Guess It</p>

                <Link href="/creategame" className="w-[100%]">
                    <Button
                        className="bg-primary text-white w-full h-[50px] !text-[30px] !rounded-2xl hover:bg-primary shadow-lg hover:shadow-2xl transition-shadow"
                        onClick={() =>
                            localStorage.setItem("playerRole", "player1")
                        }
                    >
                        Create Room
                    </Button>
                </Link>

                <Link href="/jiongame" className="w-[100%]">
                    <Button
                        onClick={() =>
                            localStorage.setItem("playerRole", "player2")
                        }
                        className="bg-primary text-white w-full h-[50px] !text-[30px] !rounded-2xl hover:bg-primary shadow-lg hover:shadow-2xl transition-shadow"
                    >
                        Join Room
                    </Button>
                </Link>
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

export default Game;
