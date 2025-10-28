"use client";
import "./room.css";
import Container from "@mui/material/Container";
import Link from "next/link";
import { righteous } from "../fonts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Spinner from "react-bootstrap/Spinner";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import Info from "../Components/Info";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

function PlayRoom() {
    const [copyIcon, setCopyIcon] = useState(true);
    const [open, setOpen] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [playerRole, setPlayerRole] = useState("");
    const [roomData, setRoomData] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [otherPlayerName, setOtherPlayerName] = useState("");
    const [secretNumber, setSecretNumber] = useState("");
    const [otherPlayerSecretNumber, setOtherPlayerSecretNumber] = useState("");
    const [playerGuesses, setPlayerGuesses] = useState([]);
    const [guessNumber, setGuseeNumber] = useState("");
    const [playerTurn, setPlayerTurn] = useState("");
    const [guessesState, setGuessesState] = useState(false);
    const [checkNumberArray, setCheckNumberArray] = useState([]);
    const [numberOfCorrects, setNumberOfCorrects] = useState([]);
    const [doubtNumbers, setDoubtNumbers] = useState([]);
    const [winner, setWinner] = useState("");
    const params = useParams();
    const router = useRouter();
    function handleCopyRoomId() {
        setCopyIcon(false);
        setTimeout(() => {
            setCopyIcon(true);
        }, 2000);
        navigator.clipboard.writeText(roomId);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        const correctNumbers = JSON.parse(
            localStorage.getItem("correctNumbers")
        );
        setNumberOfCorrects(correctNumbers);
    }, []);
    function handleGueeses(e) {
        const theNumber = e.target.value.replace(/[^0-9]/g, "");
        setGuseeNumber(theNumber);
    }
    async function submitGuess() {
        setGuessesState(false);
        const roomRef = doc(db, "rooms", roomId);
        if (playerRole === "player1") {
            await updateDoc(roomRef, {
                "players.player1": {
                    name: playerName,
                    secretNumber: secretNumber,
                    guesses: [...playerGuesses, guessNumber],
                },
                turn: "player2",
            });
        } else {
            await updateDoc(roomRef, {
                "players.player2": {
                    name: playerName,
                    secretNumber: secretNumber,
                    guesses: [...playerGuesses, guessNumber],
                },
                turn: "player1",
            });
        }
        setGuessesState(true);
        setGuseeNumber("");
    }
    useEffect(() => {
        async function setTheWinner() {
            const roomRef = doc(db, "rooms", roomId);
            await updateDoc(roomRef, {
                winner: playerRole,
            });
            setWinner(roomData.data().winner);
        }

        const theCorrectNumber = playerGuesses[playerGuesses.length - 1];
        if (
            otherPlayerSecretNumber &&
            theCorrectNumber === otherPlayerSecretNumber
        ) {
            setTheWinner();
        }
    }, [playerGuesses, otherPlayerSecretNumber, roomId, playerRole, roomData]);

    useEffect(() => {
        function checkotherPlayerNumber() {
            if (playerGuesses.length === 0) return;

            const lastGuess = playerGuesses[playerGuesses.length - 1].split("");
            let correctIndexes = [];

            const tempArray = [...checkNumberArray];

            lastGuess.forEach((ele, index) => {
                if (tempArray[index] === ele) {
                    correctIndexes.push(ele);
                }
            });

            setCheckNumberArray(tempArray);
            setNumberOfCorrects((prev) => [...prev, correctIndexes.length]);
        }

        if (guessesState) {
            checkotherPlayerNumber();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerGuesses, guessesState]);

    useEffect(() => {
        if (playerTurn === playerRole) {
            const audio = new Audio("/sound/turn.wav");
            audio.play();
        }
    }, [playerTurn, playerRole]);

    useEffect(() => {
        if (numberOfCorrects) {
            localStorage.setItem(
                "correctNumbers",
                JSON.stringify(numberOfCorrects)
            );
        }
    }, [numberOfCorrects]);
    useEffect(() => {
        setRoomId(params.roomid);
        const playerRole = localStorage.getItem("playerRole");
        setPlayerRole(playerRole);
    }, [params]);

    useEffect(() => {
        if (!roomId) return;
        const roomRef = doc(db, "rooms", roomId);
        onSnapshot(roomRef, (snapshot) => {
            if (snapshot.exists()) {
                setRoomData(snapshot);
            }
        });
    }, [roomId]);

    useEffect(() => {
        if (roomData && roomData.exists()) {
            const theData = roomData.data();
            setPlayerTurn(theData.turn);
            if (playerRole === "player1") {
                setPlayerName(theData.players.player1.name);
                setOtherPlayerName(theData.players.player2.name);
                setSecretNumber(theData.players.player1.secretNumber);
                setOtherPlayerSecretNumber(
                    theData.players.player2.secretNumber
                );
                setPlayerGuesses(theData.players.player1.guesses);
            } else if (playerRole === "player2") {
                setPlayerName(theData.players.player2.name);
                setOtherPlayerName(theData.players.player1.name);
                setSecretNumber(theData.players.player2.secretNumber);
                setOtherPlayerSecretNumber(
                    theData.players.player1.secretNumber
                );
                setPlayerGuesses(theData.players.player2.guesses);
            } else {
                router.push("/");
            }
            const checkNumberArray = [...otherPlayerSecretNumber];
            setCheckNumberArray(checkNumberArray);
            setWinner(theData.winner || "");
        }
    }, [roomData, playerRole, router, otherPlayerSecretNumber]);
    return (
        <Container
            maxWidth="xs"
            className="h-[100%] bg-background bubble-shadow relative p-0"
        >
            <Link href="/" style={{ textDecoration: "none" }}>
                <p
                    className={`${righteous.className} text-6xl relative left-[50%] translate-x-[-50%] w-[100%] text-center text-[black]`}
                >
                    Guess It
                </p>
            </Link>

            <div className="center-element h-[100%] flex-col gap-[15px] ">
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
                <div className="w-[70%]">
                    <p className=" font-bold text-[20px] text-primary text-center m-0">
                        My Number
                    </p>
                    <div className="flex justify-center items-center bg-primary py-2 px-3 rounded-md h-[52px]">
                        <p className="text-3xl m-0 text-[white]">
                            {secretNumber}
                        </p>
                    </div>
                </div>

                <p className=" font-light text-[20px] text-primary m-0">
                    {playerTurn === playerRole ? (
                        <span className="font-bold">My </span>
                    ) : (
                        <span className="font-bold">
                            {otherPlayerName.toUpperCase()}{" "}
                        </span>
                    )}
                    Turn
                </p>

                {!otherPlayerName && (
                    <Spinner
                        animation="border"
                        role="status"
                        style={{ color: "#2196f3" }}
                    />
                )}

                <div className="flex flex-col items-center w-[70%] ">
                    <label
                        htmlFor="guess-number"
                        className=" font-bold text-[20px] text-primary"
                    >
                        My Guess is
                    </label>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Type Guess"
                        maxLength={4}
                        id="guess-number"
                        value={guessNumber}
                        onChange={handleGueeses}
                        className="w-[100%] px-3 py-2 rounded-md bg-[#b16900] text-center text-[white] uppercase focus:outline-2 focus:outline-primary"
                    />
                </div>
                <div className="guess-area w-[70%] bg-[#b16900] h-[300px] rounded-md p-3.5 overflow-y-auto custom-scroll text-center">
                    <div>
                        {playerGuesses.map((ele, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderBottom: "1px solid #372000",
                                    padding: "5px 0px",
                                    gap: "5px",
                                }}
                            >
                                <div style={{ display: "flex", gap: "2px" }}>
                                    {ele.split("").map((digit, i) => (
                                        <p
                                            key={i}
                                            className="font-bold  m-0  bg-primary text-white px-[10px] py-[5px] rounded-[8px]"
                                        >
                                            {digit}
                                        </p>
                                    ))}
                                </div>
                                <input
                                    value={doubtNumbers[index] || ""}
                                    onChange={(e) => {
                                        const newDoubts = [...doubtNumbers];
                                        newDoubts[index] = e.target.value;
                                        setDoubtNumbers(newDoubts);
                                    }}
                                    className="w-[100%] px-1 py-2 rounded-md bg-[white] text-center text-[black] uppercase focus:outline-2 focus:outline-primary mx-[10px]"
                                />
                                <p className="m-0 text-[white]">
                                    {numberOfCorrects[index]} Correct
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    onClick={submitGuess}
                    className="bg-primary text-white  h-[50px] !text-[30px] !rounded-2xl hover:bg-primary shadow-lg hover:shadow-2xl transition-shadow w-[70%]"
                    disabled={
                        guessNumber.length === 4 && playerTurn === playerRole
                            ? false
                            : true
                    }
                >
                    Guess
                </Button>
            </div>
            <div
                className={`${righteous.className} winner-state flex-col`}
                style={{ display: winner ? "flex" : "none" }}
            >
                {winner === playerRole ? (
                    <p className="text-primary">WINNER</p>
                ) : (
                    <p className="text-red-700">LOSER</p>
                )}
                <Button
                    className="bg-primary text-white  h-[50px] !text-[30px] !rounded-2xl hover:bg-primary shadow-lg hover:shadow-2xl transition-shadow w-[70%]"
                    onClick={() => {
                        router.push(`/`);
                    }}
                >
                    Home
                </Button>
            </div>
            <Button
                className="hover:bg-primary shadow-lg hover:shadow-2xl transition-shadow info left-[10px] override-position"
                onClick={handleClickOpen}
            >
                <InfoOutlineIcon />
                <p className="m-0">How to play</p>
            </Button>
            <Info open={open} setOpen={setOpen} />
        </Container>
    );
}

export default PlayRoom;
