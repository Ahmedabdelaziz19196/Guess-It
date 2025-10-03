"use client";
import Container from "@mui/material/Container";
import { righteous } from "../fonts";
import { Button } from "@/components/ui/button";
function Game() {
    return (
        <Container
            maxWidth="xs"
            className="h-[100vh] bg-background bubble-shadow "
        >
            <div className="w-[60%] h-[100%] mx-auto text-center center-element flex-col gap-[10px]">
                <p className={`${righteous.className} text-6xl`}>Guess It</p>
                <Button
                    className="bg-[#2196f3] text-white w-full h-[50px] !text-[30px] !rounded-2xl hover:bg-[#197cce] shadow-lg hover:shadow-2xl transition-shadow"
                    onClick={() => console.log("yeees")}
                >
                    Create Room
                </Button>

                <Button
                    className="bg-[#2196f3] text-white w-full h-[50px] !text-[30px] !rounded-2xl hover:bg-[#197cce] shadow-lg hover:shadow-2xl transition-shadow"
                    onClick={() => console.log("Noooo")}
                >
                    Join Room
                </Button>
            </div>
        </Container>
    );
}

export default Game;
